import React, { useEffect, useState } from 'react';
import NewsRoom from './components/NewsRoom';
import { fetchTopics, analyzeTopic } from './services/api';
import './index.css';
import facts from './assets/facts.json';

// CACHE MAPPING
const CACHE_MAP = {
    "US attack on Venezuela": "/cache/us-attack-on-venezuela.json",
    "Iran Crisis": "/cache/iran-crisis.json",
    "Trump nobel prize": "/cache/trump-nobel-prize.json"
};

function App() {
    const [topics, setTopics] = useState([]);
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingFact, setLoadingFact] = useState("");

    // Keep track of which topic name is active for re-searching optimization
    const [currentTopicName, setCurrentTopicName] = useState('');

    useEffect(() => {
        fetchTopics().then(setTopics);
    }, []);

    const handleSelect = (topicName) => {
        setCurrentTopicName(topicName);
    };

    const handleAnalyze = async (topicName) => {
        // Determine effective topic to search
        const query = topicName || currentTopicName;
        if (!query) return;

        setIsLoading(true);
        setData(null);

        // 1. Pick Random Fact (Weighted by array content)
        const randomFact = facts[Math.floor(Math.random() * facts.length)];
        setLoadingFact(randomFact);

        // 2. Fake Delay (5-8 seconds)
        const delay = Math.floor(Math.random() * (8000 - 5000 + 1) + 5000);
        console.log(`Demo Mode: Creating artificial delay of ${delay}ms`);

        // 3. Execute with Delay
        setTimeout(async () => {
            try {
                // Check Cache
                if (CACHE_MAP[query]) {
                    console.log(`Demo Mode: Loading cached data for "${query}"`);
                    const response = await fetch(CACHE_MAP[query]);
                    if (!response.ok) throw new Error("Cache load failed");
                    const cachedData = await response.json();
                    setData(cachedData);
                } else {
                    // Real API Call
                    console.log(`Demo Mode: Fetching live data for "${query}"`);
                    const result = await analyzeTopic(query);
                    setData(result);
                }
            } catch (error) {
                console.error("Analysis failed:", error);
                // Ideally show error state, but failing silently to "live" or nothing for demo
            } finally {
                setIsLoading(false);
            }
        }, delay);
    };

    return (
        <NewsRoom
            topics={topics}
            selectedTopic={currentTopicName}
            onSelect={handleSelect}
            onAnalyze={handleAnalyze}
            data={data}
            isLoading={isLoading}
            loadingFact={loadingFact}
        />
    );
}

export default App;
