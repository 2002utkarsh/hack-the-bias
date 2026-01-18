import React from 'react';

const TrendingTopics = ({ onTopicClick, theme }) => {
    // HARDCODED DEMO TOPICS as per instruction
    const demoTopics = [
        { name: "US attack on Venezuela", id: "venezuela" },
        { name: "Iran Crisis", id: "iran" }
    ];

    return (
        <div style={styles.container}>
            <span style={{ ...styles.label, color: theme.secondaryText }}>TRENDING:</span>

            <div style={styles.scrollArea}>
                {demoTopics.map((topic) => (
                    <button
                        key={topic.id}
                        onClick={() => onTopicClick(topic.name)}
                        className="trending-pill"
                        style={{
                            ...styles.pill,
                            borderColor: theme.pillBorder,
                            color: theme.text,
                        }}
                    >
                        {topic.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '15px',
        width: '100%',
        maxWidth: '800px',
        justifyContent: 'center',
        marginTop: '10px'
    },
    label: {
        fontSize: '11px',
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: '1.5px',
        whiteSpace: 'nowrap'
    },
    scrollArea: {
        display: 'flex',
        gap: '10px',
        padding: '5px'
    },
    pill: {
        padding: '6px 12px',
        fontSize: '13px',
        border: '1px solid', // Explicit border
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'all 0.2s',
        outline: 'none',
        fontWeight: '600',
        whiteSpace: 'nowrap',
        fontFamily: "'Helvetica Neue', sans-serif",
        background: 'transparent' // Let CSS handle hover
    }
};

export default TrendingTopics;
