import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import TrendingTopics from './TrendingTopics';
import CoverageSection from './CoverageSection';
import BiasMeter from './BiasMeter';

function NewsRoom({ topics, selectedTopic, onSelect, onAnalyze, data, isLoading, loadingFact }) {
    // --- STATE ---
    const [searchTerm, setSearchTerm] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [viewMode, setViewMode] = useState('default'); // 'default', 'protanopia', 'deuteranopia', 'tritanopia'

    const VIEW_MODES = ['default', 'protanopia', 'deuteranopia', 'tritanopia'];

    // --- THEME DEFINITIONS ---
    const theme = isDarkMode ? {
        mode: 'dark',
        bg: '#121212',
        headerBg: '#1e1e1e',
        text: '#e0e0e0',
        cardBg: '#1e1e1e',
        cardBorder: '#333',
        secondaryText: '#a0a0a0',
        accent: '#ff8a80',
        inputBg: '#2c2c2c',
        inputBorder: '#444',
        divider: '#444',
        pillBg: '#2c2c2c',
        pillBorder: '#444',
        summaryBg: '#1e1e1e',
        shadow: '0 4px 20px rgba(0,0,0,0.5)',
        paperBorder: '1px solid #333'
    } : {
        mode: 'light',
        bg: '#f5f5f0',
        headerBg: '#fff',
        text: '#222',
        cardBg: '#fff',
        cardBorder: '#eee',
        secondaryText: '#666',
        accent: '#cc3333',
        inputBg: '#fff',
        inputBorder: '#e0e0e0',
        divider: '#e0e0e0',
        pillBg: '#fff',
        pillBorder: '#e0e0e0',
        summaryBg: '#fffaf0', // Warm paper tone
        shadow: '0 10px 40px rgba(0,0,0,0.08)',
        paperBorder: '1px solid #e8e4dc'
    };

    // --- DERIVED DATA ---
    const inFavor = data?.articles?.filter(a => a.stance === 'IN_FAVOR') || [];
    const against = data?.articles?.filter(a => a.stance === 'AGAINST') || [];
    const neutral = data?.articles?.filter(a => a.stance === 'NEUTRAL') || [];

    // --- HANDLERS ---
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        onSelect(searchTerm);
        if (searchTerm) onAnalyze(searchTerm);
    };

    const handlePillClick = (topicName) => {
        onSelect(topicName);
        onAnalyze(topicName);
        setSearchTerm(topicName);
    };

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    const toggleViewMode = () => {
        const nextIndex = (VIEW_MODES.indexOf(viewMode) + 1) % VIEW_MODES.length;
        setViewMode(VIEW_MODES[nextIndex]);
    };

    // --- TTS LOGIC ---
    useEffect(() => {
        // cancel speech on unmount
        return () => window.speechSynthesis.cancel();
    }, []);

    const handleSpeak = () => {
        if (!data?.summary) return;

        if (isSpeaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        } else {
            const utterance = new SpeechSynthesisUtterance(data.summary);
            utterance.onend = () => setIsSpeaking(false);
            // Optional: select a better voice if available
            const voices = window.speechSynthesis.getVoices();
            // Try to find a nice English voice
            const preferredVoice = voices.find(v => v.name.includes('Google US English')) || voices.find(v => v.lang === 'en-US');
            if (preferredVoice) utterance.voice = preferredVoice;

            window.speechSynthesis.speak(utterance);
            setIsSpeaking(true);
        }
    };

    return (
        <div style={{ ...styles.pageContainer, backgroundColor: theme.bg, color: theme.text }} data-view-mode={viewMode}>

            {/* --- TOP SECTION --- */}
            <div style={{ ...styles.topSection, backgroundColor: theme.headerBg, borderBottomColor: theme.divider }}>

                {/* View Mode Toggle */}
                <button
                    onClick={toggleViewMode}
                    style={{ ...styles.viewModeToggle, color: theme.text, borderColor: theme.inputBorder }}
                    className="hover-scale"
                    title={`Color Blindness Mode: ${viewMode.charAt(0).toUpperCase() + viewMode.slice(1)} `}
                >
                    👁️
                </button>

                {/* Theme Toggle Absolute Positioned */}
                <button
                    onClick={toggleTheme}
                    style={{ ...styles.themeToggle, color: theme.text, borderColor: theme.inputBorder }}
                    className="hover-scale"
                    title="Toggle Dark Mode"
                >
                    {isDarkMode ? '☀️' : '🌙'}
                </button>

                <SearchBar
                    searchTerm={searchTerm}
                    onSearchChange={(e) => setSearchTerm(e.target.value)}
                    onSearchSubmit={handleSearchSubmit}
                    theme={theme}
                />
                <TrendingTopics
                    topics={topics}
                    onTopicClick={handlePillClick}
                    theme={theme}
                />
            </div>

            {/* --- MIDDLE SECTION (COVERAGE) --- */}
            <div className="fade-in" style={{ flex: 1 }}>
                <CoverageSection
                    neutral={neutral}
                    inFavor={inFavor}
                    against={against}
                    isLoading={isLoading}
                    theme={theme}
                />
            </div>

            {/* Bias Meter - Moved below cards */}
            {(inFavor.length > 0 || against.length > 0 || neutral.length > 0) && (
                <div className="fade-in" style={{ width: '100%', maxWidth: '600px', margin: '40px auto 20px auto', padding: '0 20px' }}>
                    <BiasMeter
                        neutralCount={neutral.length}
                        inFavorCount={inFavor.length}
                        againstCount={against.length}
                        theme={theme}
                    />
                </div>
            )}

            {/* --- BOTTOM SECTION (SUMMARY) --- */}
            <div style={{ ...styles.bottomSection, backgroundColor: theme.bg, borderTopColor: theme.divider }}>
                <div
                    className="fade-in"
                    style={{
                        ...styles.summaryCard,
                        backgroundColor: theme.summaryBg,
                        border: theme.paperBorder,
                        boxShadow: theme.shadow
                    }}
                >
                    <div style={styles.summaryHeader}>
                        <h2 style={{ ...styles.summaryTitle, color: theme.text }}>Our Non-biased Take</h2>
                        <div style={{ ...styles.summaryDivider, backgroundColor: theme.accent }}></div>

                        {/* TTS Button */}
                        {data?.summary && (
                            <button
                                onClick={handleSpeak}
                                className="hover-scale"
                                style={{ ...styles.speakButton, color: theme.accent, borderColor: theme.accent }}
                                title="Read Aloud"
                            >
                                {isSpeaking ? '⏹ Stop' : '🔊 Listen'}
                            </button>
                        )}
                    </div>

                    <div style={{ ...styles.summaryContent, color: theme.text }}>
                        {data?.summary ? (
                            data.summary.split('\n').filter(p => p.trim()).map((para, idx) => (
                                <p key={idx} style={styles.summaryPara}>{para}</p>
                            ))
                        ) : (
                            <p style={{ ...styles.summaryPlaceholder, color: theme.secondaryText }}>Select a topic above to generate a neutral analysis.</p>
                        )}
                    </div>

                    {/* Editorial Footer Decoration */}
                    {data?.summary && (
                        <div style={{ textAlign: 'center', marginTop: '30px', color: theme.secondaryText, fontSize: '20px' }}>
                            ***
                        </div>
                    )}
                </div>
            </div>

            {/* LOADING OVERLAY */}
            {isLoading && (
                <div style={{ ...styles.loadingOverlay, backgroundColor: theme.bg }}>
                    <div className="spinner" style={{ borderColor: theme.text, borderTopColor: 'transparent' }}></div>
                    <h2 style={{ ...styles.loadingTitle, color: theme.text }}>Analyzing Sources...</h2>

                    <div style={styles.factContainer}>
                        <span style={{ ...styles.factLabel, color: theme.accent }}>DID YOU KNOW?</span>
                        <p style={{ ...styles.factText, color: theme.text }}>
                            "{loadingFact}"
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

// --- STYLES ---
const styles = {
    pageContainer: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'Georgia', serif",
        overflowY: 'auto',
        transition: 'background-color 0.3s, color 0.3s'
    },
    topSection: {
        flex: '0 0 auto',
        padding: '10px 20px 15px 20px', // Minimal padding
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        borderBottom: '1px solid',
        position: 'relative',
        transition: 'background-color 0.3s'
    },
    themeToggle: {
        position: 'absolute',
        top: '20px',
        right: '25px',
        background: 'transparent',
        border: 'none', // Cleaner look
        cursor: 'pointer',
        fontSize: '18px',
        opacity: 0.8
    },
    viewModeToggle: {
        position: 'absolute',
        top: '20px',
        right: '70px',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        fontSize: '18px',
        opacity: 0.8
    },
    bottomSection: {
        borderTop: '1px solid',
        padding: '80px 20px', // More breathing room
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: '1 0 auto',
        transition: 'background-color 0.3s'
    },
    summaryCard: {
        maxWidth: '750px', // Slightly narrower for better readability
        width: '100%',
        padding: '60px', // Luxurious padding
        borderRadius: '2px', // Sharper corners for "paper" feel
        transition: 'background-color 0.3s, box-shadow 0.3s',
        position: 'relative'
    },
    summaryHeader: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '40px',
        position: 'relative'
    },
    summaryTitle: {
        fontSize: '32px', // Larger title
        margin: '0 0 20px 0',
        fontFamily: "'Playfair Display', serif",
        fontWeight: '700',
        textAlign: 'center',
        letterSpacing: '-0.5px' // Tighter tracking for elegance
    },
    summaryDivider: {
        width: '40px',
        height: '4px',
        borderRadius: '2px',
        marginBottom: '20px'
    },
    speakButton: {
        marginTop: '10px',
        background: 'transparent',
        border: '1px solid',
        borderRadius: '30px',
        padding: '8px 20px',
        fontSize: '12px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'all 0.2s'
    },
    summaryContent: {
        fontSize: '20px', // Larger body text
        lineHeight: '1.8', // Airy line height
        textAlign: 'justify',
        fontFamily: "'Georgia', serif",
        color: '#333'
    },
    summaryPara: {
        marginBottom: '25px'
    },
    summaryPlaceholder: {
        textAlign: 'center',
        fontStyle: 'italic',
        fontSize: '16px'
    },
    loadingOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 2000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        textAlign: 'center'
    },
    loadingTitle: {
        marginTop: '20px',
        marginBottom: '40px',
        fontFamily: "'Helvetica Neue', sans-serif",
        fontWeight: '300',
        letterSpacing: '1px'
    },
    factContainer: {
        maxWidth: '600px',
        animation: 'fadeIn 1s ease'
    },
    factLabel: {
        display: 'block',
        fontSize: '12px',
        fontWeight: '900',
        letterSpacing: '2px',
        marginBottom: '10px'
    },
    factText: {
        fontSize: '24px',
        fontFamily: "'Playfair Display', serif",
        fontStyle: 'italic',
        lineHeight: '1.4'
    }
};

export default NewsRoom;
