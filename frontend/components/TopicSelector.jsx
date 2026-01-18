import React from 'react';

function TopicSelector({ topics, selectedTopic, onSelect, onAnalyze, isLoading }) {
    return (
        <div style={styles.container}>
            <h2>1. Choose a Crisis Topic</h2>
            <div style={styles.grid}>
                {topics.map((t) => (
                    <button
                        key={t.id}
                        style={{
                            ...styles.card,
                            backgroundColor: selectedTopic === t.name ? '#e3f2fd' : '#fff',
                            border: selectedTopic === t.name ? '2px solid #2196f3' : '1px solid #ddd',
                        }}
                        onClick={() => onSelect(t.name)}
                    >
                        {t.name}
                    </button>
                ))}
            </div>

            <div style={styles.actions}>
                <button
                    style={styles.analyzeBtn}
                    disabled={!selectedTopic || isLoading}
                    onClick={onAnalyze}
                >
                    {isLoading ? 'Running Intelligent Pipeline...' : 'Analyze Topic'}
                </button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        marginBottom: '20px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '15px',
        marginBottom: '20px'
    },
    card: {
        padding: '15px',
        fontSize: '16px',
        cursor: 'pointer',
        borderRadius: '6px',
        textAlign: 'center',
        transition: 'all 0.2s',
    },
    actions: {
        textAlign: 'center'
    },
    analyzeBtn: {
        padding: '12px 30px',
        fontSize: '18px',
        backgroundColor: '#ff5722',
        color: 'white',
        border: 'none',
        borderRadius: '30px',
        cursor: 'pointer',
        fontWeight: 'bold',
        opacity: (props) => props.disabled ? 0.6 : 1
    }
};

export default TopicSelector;
