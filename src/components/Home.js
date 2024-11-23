import React, { useState, useEffect } from 'react';

function Home() {
    const [quote, setQuote] = useState('Loading...');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchQuote = async () => {
        setIsLoading(true); // Set loading state to true before fetching
        setError(null); // Clear any previous errors

        try {
            // Use the relative path '/api/qotd' which will be proxied to https://favqs.com/api/qotd
            const response = await fetch('/api/qotd');
            
            if (!response.ok) {
                throw new Error('Failed to fetch quote');
            }

            const data = await response.json();
            setQuote(data.quote.body); // Set the quote from the response
        } catch (error) {
            setError(error.message); // Handle errors
            setQuote('Failed to fetch quote. Please try again.');
        } finally {
            setIsLoading(false); // Set loading state to false after fetching
        }
    };

    
    
    useEffect(() => {
        fetchQuote(); // Fetch quote when the component mounts
    }, []);

    return (
        <div id="quote-section">
            {isLoading ? (
                <p>Loading...</p> // Show loading text while fetching
            ) : error ? (
                <p>Error: {error}</p> // Show error message if there's an error
            ) : (
                <p id="quote">{quote}</p> // Display the quote when it's loaded
            )}
            <button id="new-quote-btn" onClick={fetchQuote}>New Quote</button>
        </div>
    );
}

export default Home;
