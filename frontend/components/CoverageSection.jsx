import React, { useState } from 'react';

const CoverageSection = ({
    neutral = [],
    inFavor = [],
    against = [],
    isLoading,
    theme
}) => {
    return (
        <div style={styles.container}>
            {isLoading ? (
                <div style={{ ...styles.loading, color: theme.secondaryText }}>Loading Coverage...</div>
            ) : (
                <div style={styles.grid}>
                    <CarouselColumn
                        title="Neutral Coverage"
                        articles={neutral}
                        emptyText="No neutral articles found."
                        headerColor={theme.text}
                        theme={theme}
                    />
                    <CarouselColumn
                        title="Supportive Coverage"
                        articles={inFavor}
                        emptyText="No supporting articles found."
                        headerColor={theme.text}
                        theme={theme}
                    />
                    <CarouselColumn
                        title="Critical Coverage"
                        articles={against}
                        emptyText="No opposing articles found."
                        headerColor={theme.text}
                        theme={theme}
                    />
                </div>
            )}
        </div>
    );
};

const CarouselColumn = ({ title, articles, emptyText, headerColor, theme }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const hasArticles = articles && articles.length > 0;
    const currentArticle = hasArticles ? articles[currentIndex] : null;

    const next = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % articles.length);
    };

    const prev = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length);
    };

    const handleCardClick = () => {
        if (currentArticle?.link) {
            window.open(currentArticle.link, '_blank');
        }
    };

    return (
        <div style={styles.column}>
            <h3 style={{ ...styles.title, borderBottomColor: headerColor, color: theme.text }}>{title}</h3>

            <div style={styles.cardArea}>
                {!hasArticles ? (
                    <div style={{ ...styles.empty, color: theme.secondaryText }}>{emptyText}</div>
                ) : (

                    <div
                        className="hover-scale"
                        style={{
                            ...styles.card,
                            backgroundColor: theme.cardBg,
                            borderColor: theme.cardBorder,
                            boxShadow: theme.shadow || '0 4px 15px rgba(0,0,0,0.08)',
                            position: 'relative' // Added for bias bubble positioning
                        }}
                        onClick={handleCardClick}
                    >
                        {/* BIAS SCORE BUBBLE */}
                        {(() => {
                            const score = currentArticle.scores?.bias_score_1_to_10;
                            if (score) {
                                let biasClass = 'bias-high';
                                if (score < 6) biasClass = 'bias-low';
                                else if (score < 8) biasClass = 'bias-med';

                                return (
                                    <div className={`bias-bubble ${biasClass}`} title="Bias Score (1-10)">
                                        {score}
                                    </div>
                                );
                            }
                            return null;
                        })()}

                        {/* Image Container */}
                        <div style={styles.imageContainer}>
                            {currentArticle.image ? (
                                <img src={currentArticle.image} alt="" style={styles.mainImage} />
                            ) : (
                                <div style={styles.placeholder} />
                            )}

                            {/* Overlay Arrows */}
                            {articles.length > 1 && (
                                <>
                                    <button style={styles.arrowLeft} onClick={prev}>‹</button>
                                    <button style={styles.arrowRight} onClick={next}>›</button>
                                </>
                            )}
                        </div>

                        {/* Content */}
                        <div style={styles.content}>
                            <h4 style={{ ...styles.articleTitle, color: theme.text }}>{currentArticle.title}</h4>
                            <div style={styles.meta}>
                                <span style={{ ...styles.source, color: theme.secondaryText }}>{currentArticle.source}</span>
                                {currentArticle.published && <span style={{ ...styles.date, color: theme.secondaryText }}> • {currentArticle.published}</span>}
                            </div>
                            <p style={{ ...styles.snippet, color: theme.text }}>
                                {currentArticle.content ? currentArticle.content.substring(0, 100) + "..." : "Click to read full article."}
                            </p>
                            <div style={styles.cta}>Click to Read Article</div>
                        </div>

                        {/* Pagination Dots */}
                        {articles.length > 1 && (
                            <div style={{ ...styles.dotsRow, backgroundColor: theme.mode === 'dark' ? '#222' : '#fafafa' }}>
                                {articles.slice(0, 5).map((_, idx) => (
                                    <div
                                        key={idx}
                                        style={{
                                            ...styles.dot,
                                            backgroundColor: idx === (currentIndex % 5) ? (theme.mode === 'dark' ? '#fff' : '#555') : (theme.mode === 'dark' ? '#555' : '#ccc')
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div >
    );
};

const styles = {
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        padding: '20px 40px',
    },
    loading: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '20px',
    },
    grid: {
        display: 'flex',
        justifyContent: 'center',
        gap: '40px',
        height: '100%',
    },
    column: {
        flex: 1,
        maxWidth: '380px',
        display: 'flex',
        flexDirection: 'column',
    },
    title: {
        textAlign: 'center',
        fontSize: '20px',
        borderBottom: '3px solid',
        paddingBottom: '12px',
        marginBottom: '20px',
        marginTop: 0,
        textTransform: 'uppercase',
        letterSpacing: '1px',
        fontFamily: "'Helvetica Neue', sans-serif",
        fontWeight: 'bold',
    },
    cardArea: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    empty: {
        textAlign: 'center',
        fontStyle: 'italic',
        marginTop: '40px'
    },
    card: {
        flex: 1,
        borderRadius: '12px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'transform 0.2s, background-color 0.3s, border-color 0.3s',
        border: '1px solid'
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        height: '160px',
        backgroundColor: '#f0f0f0',
        overflow: 'hidden'
    },
    mainImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    placeholder: {
        width: '100%',
        height: '100%',
        background: 'linear-gradient(45deg, #eee, #ddd)',
    },
    arrowLeft: {
        position: 'absolute',
        left: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        backgroundColor: 'rgba(255,255,255,0.8)',
        border: 'none',
        borderRadius: '50%',
        width: '36px',
        height: '36px',
        fontSize: '24px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
    },
    arrowRight: {
        position: 'absolute',
        right: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        backgroundColor: 'rgba(255,255,255,0.8)',
        border: 'none',
        borderRadius: '50%',
        width: '36px',
        height: '36px',
        fontSize: '24px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
    },
    content: {
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    articleTitle: {
        fontSize: '18px',
        fontWeight: 'bold',
        margin: '0 0 8px 0',
        fontFamily: "'Georgia', serif",
        lineHeight: '1.4',
    },
    meta: {
        fontSize: '12px',
        marginBottom: '12px',
        textTransform: 'uppercase',
        fontWeight: '600'
    },
    snippet: {
        fontSize: '14px',
        lineHeight: '1.6',
        margin: '0 0 15px 0',
        flex: 1,
        overflow: 'hidden'
    },
    cta: {
        textAlign: 'center',
        fontSize: '12px',
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#000',
        padding: '8px',
        borderRadius: '4px',
        marginTop: 'auto',
        textTransform: 'uppercase',
        opacity: 0.8
    },
    dotsRow: {
        display: 'flex',
        justifyContent: 'center',
        gap: '6px',
        padding: '10px',
    },
    dot: {
        width: '6px',
        height: '6px',
        borderRadius: '50%',
    }
};

export default CoverageSection;
