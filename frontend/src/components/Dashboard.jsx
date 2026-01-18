import React from 'react';

function Dashboard({ data }) {
    if (!data) return null;

    const { topic, articles, summary, prompt_used } = data;

    // Calculate aggregate breakdown
    const inFavor = articles.filter(a => a.stance === 'IN_FAVOR');
    const against = articles.filter(a => a.stance === 'AGAINST');
    const neutral = articles.filter(a => a.stance === 'NEUTRAL');

    return (
        <div style={styles.container}>
            <h2>2. Analysis Result: {topic}</h2>

            {/* Metrics Row */}
            <div style={styles.metricsRow}>
                <MetricCard label="Total Articles" value={articles.length} color="#607d8b" />
                <MetricCard label="Supportive Coverage" value={inFavor.length} color="#4caf50" />
                <MetricCard label="Critical Coverage" value={against.length} color="#f44336" />
                <MetricCard label="Neutral" value={neutral.length} color="#9e9e9e" />
            </div>

            {/* Main Content Area */}
            <div style={styles.contentGrid}>

                {/* Left Col: Neutral Summary */}
                <div style={styles.summaryCard}>
                    <h3 style={styles.cardHeader}>AI Editorial Summary</h3>
                    <div style={styles.summaryText}>
                        {summary.split('\n').map((line, i) => (
                            <p key={i}>{line}</p>
                        ))}
                    </div>
                </div>

                {/* Right Col: Articles */}
                <div style={styles.articlesCard}>
                    <h3 style={styles.cardHeader}>Source Material</h3>
                    <div style={styles.articleList}>
                        {articles.slice(0, 10).map((art, i) => (
                            <div key={i} style={styles.articleItem}>
                                {art.image && (
                                    <img src={art.image} alt="source" style={styles.sourceLogo} />
                                )}
                                <div>
                                    <div style={styles.artTitle}>{art.title}</div>
                                    <div style={styles.artMeta}>
                                        <span style={{
                                            color: art.stance === 'IN_FAVOR' ? 'green' :
                                                art.stance === 'AGAINST' ? 'red' : 'gray'
                                        }}>
                                            [{art.stance}]
                                        </span> • {art.source} • Reliability: {art.scores?.reliability_score}/10
                                    </div>
                                </div>
                            </div>
                        ))}
                        {articles.length > 10 && <div style={{ padding: 10, fontStyle: 'italic' }}>...and {articles.length - 10} more</div>}
                    </div>
                </div>

            </div>

            {/* Bottom: Prompt Inspector */}
            <div style={styles.promptBox}>
                <h4 style={{ margin: '0 0 10px 0' }}>Debug: LLM Prompt Used</h4>
                <pre style={styles.codeBlock}>{prompt_used}</pre>
            </div>

        </div>
    );
}

function MetricCard({ label, value, color }) {
    return (
        <div style={{ ...styles.metric, borderLeft: `5px solid ${color}` }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color }}>{value}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>{label}</div>
        </div>
    );
}

const styles = {
    container: {
        animation: 'fadeIn 0.5s ease-in'
    },
    metricsRow: {
        display: 'flex',
        gap: '20px',
        marginBottom: '30px'
    },
    metric: {
        flex: 1,
        backgroundColor: '#fff',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    },
    contentGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        marginBottom: '30px'
    },
    summaryCard: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        borderTop: '4px solid #673ab7'
    },
    articlesCard: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        height: '600px',
        overflowY: 'auto'
    },
    cardHeader: {
        marginTop: 0,
        borderBottom: '1px solid #eee',
        paddingBottom: '10px'
    },
    summaryText: {
        lineHeight: '1.6',
        color: '#333'
    },
    articleList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
    },
    articleItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px',
        border: '1px solid #f0f0f0',
        borderRadius: '4px'
    },
    sourceLogo: {
        width: '40px',
        height: '40px',
        objectFit: 'contain',
        borderRadius: '4px'
    },
    artTitle: {
        fontSize: '14px',
        fontWeight: '500'
    },
    artMeta: {
        fontSize: '12px',
        color: '#888',
        marginTop: '4px'
    },
    promptBox: {
        backgroundColor: '#282c34',
        color: '#abb2bf',
        padding: '15px',
        borderRadius: '8px',
        overflow: 'hidden'
    },
    codeBlock: {
        margin: 0,
        whiteSpace: 'pre-wrap',
        fontSize: '12px',
        fontFamily: 'monospace',
        maxHeight: '200px',
        overflowY: 'auto'
    }
};

export default Dashboard;
