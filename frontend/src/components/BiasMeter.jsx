import React from 'react';

const BiasMeter = ({ neutralCount, inFavorCount, againstCount, theme }) => {
    const total = neutralCount + inFavorCount + againstCount;

    // Default to balanced if no data
    if (total === 0) return null;

    const leftPct = (inFavorCount / total) * 100;
    const centerPct = (neutralCount / total) * 100;
    const rightPct = (againstCount / total) * 100;

    return (
        <div style={{ ...styles.container, color: theme.text }}>
            <div style={styles.labelRow}>
                <span style={styles.label}>Coverage Balance</span>
                <span style={styles.total}>{total} Articles Analyzed</span>
            </div>

            <div style={styles.barContainer}>
                {/* Visual Bar segments */}
                <div style={{ ...styles.barSegment, width: `${leftPct}%`, backgroundColor: 'var(--bias-low)' }} title={`Supportive Coverage: ${inFavorCount}`} />
                <div style={{ ...styles.barSegment, width: `${centerPct}%`, backgroundColor: '#9e9e9e' }} title={`Neutral: ${neutralCount}`} />
                <div style={{ ...styles.barSegment, width: `${rightPct}%`, backgroundColor: 'var(--bias-high)' }} title={`Critical Coverage: ${againstCount}`} />
            </div>

            <div style={styles.legend}>
                <div style={styles.legendItem}>
                    <div style={{ ...styles.dot, backgroundColor: 'var(--bias-low)' }} />
                    <span>Supportive Coverage</span>
                </div>
                <div style={styles.legendItem}>
                    <div style={{ ...styles.dot, backgroundColor: '#9e9e9e' }} />
                    <span>Neutral</span>
                </div>
                <div style={styles.legendItem}>
                    <div style={{ ...styles.dot, backgroundColor: 'var(--bias-high)' }} />
                    <span>Critical Coverage</span>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        width: '100%',
        maxWidth: '500px',
        margin: '20px auto',
        fontFamily: "'Helvetica Neue', sans-serif",
    },
    labelRow: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '8px',
        fontSize: '12px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
    },
    barContainer: {
        display: 'flex',
        height: '8px',
        borderRadius: '4px',
        overflow: 'hidden',
        backgroundColor: '#eee',
        marginBottom: '8px'
    },
    barSegment: {
        height: '100%',
        transition: 'width 0.5s ease-out'
    },
    legend: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        fontSize: '11px',
    },
    legendItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '5px'
    },
    dot: {
        width: '8px',
        height: '8px',
        borderRadius: '50%'
    }
};

export default BiasMeter;
