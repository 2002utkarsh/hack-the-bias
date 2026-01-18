from services.news_gatherer import NewsGatherer
import os
import sys

# Setup Config Path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CONFIG_PATH = os.path.join(BASE_DIR, 'config.json')

def test_query(query):
    print(f"\n--- Testing Query: '{query}' ---")
    gatherer = NewsGatherer(CONFIG_PATH)
    articles = gatherer.gather_articles(query)
    print(f"Found: {len(articles)} articles")
    if len(articles) > 0:
        print("First 3 Titles:")
        for a in articles[:3]:
            print(f"- {a['title']}")

if __name__ == "__main__":
    # Test 1: Broad term
    test_query("Venezuela")
    
    # Test 2: Specific Phrase (User likely clicked this)
    test_query("Venezuelan Crisis")
    
    # Test 3: Another topic
    test_query("Gaza")
