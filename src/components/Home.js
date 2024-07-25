import React, { useState, useEffect } from 'react';

function Home() {

    const [quote, setQuote] = useState('Loading...');


    const fetchQuote = async () => {
        try {
            const response = await fetch('https://api.quotable.io/random');
            const data = await response.json();
            setQuote(data.content);
        } catch (error) {
            setQuote('Failed to fetch quote. Please try again.');
        }
    };


    useEffect(() => {
        fetchQuote();
    }, []);

    return (
        <div id="quote-section">
            <p id="quote">{quote}</p>
            <button id="new-quote-btn" onClick={fetchQuote}>New Quote</button>
        </div>
    );
}

export default Home;
