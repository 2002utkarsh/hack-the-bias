import React, { useState } from 'react';

const SearchBar = ({ searchTerm, onSearchChange, onSearchSubmit, theme }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <form onSubmit={onSearchSubmit} style={styles.form}>
            <div
                style={{
                    ...styles.inputWrapper,
                    transform: isFocused ? 'scale(1.02)' : 'scale(1)',
                    boxShadow: isFocused ? '0 4px 12px rgba(0,0,0,0.1)' : 'none'
                }}
            >
                <span style={styles.icon}>🔍</span>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={onSearchChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Search a topic (e.g., 'Gaza', 'Bitcoin')..."
                    style={{
                        ...styles.input,
                        backgroundColor: theme.inputBg,
                        color: theme.text,
                        borderColor: isFocused ? theme.accent : theme.inputBorder
                    }}
                />
            </div>
        </form>
    );
};

const styles = {
    form: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        marginBottom: '5px',
    },
    inputWrapper: {
        position: 'relative',
        width: '100%', // Full width of container but constrained by SearchBar parent width
        maxWidth: '500px', // Smaller max width
        transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)'
    },
    icon: {
        position: 'absolute',
        left: '16px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#999',
        fontSize: '14px',
    },
    input: {
        width: '100%',
        padding: '10px 14px 10px 45px', // Reduced top/bottom padding
        fontSize: '15px',
        border: '1px solid',
        borderRadius: '8px', // Slightly rounded, not full pill
        outline: 'none',
        transition: 'all 0.3s ease',
        fontWeight: '400',
        fontFamily: "'Helvetica Neue', sans-serif"
    }
};

export default SearchBar;
