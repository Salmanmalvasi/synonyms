function suggestSynonyms(word) {
    // Use the Datamuse API to fetch synonyms for the word
    return fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(response => response.json())  // Parse the response as JSON
        .then(data => {
            // Return an array of synonyms from the API response
            return data.map(item => item.word);
        })
        .catch(error => {
            console.error('Error fetching synonyms:', error);
            return [];  // Return an empty array in case of an error
        });
}


document.addEventListener('DOMContentLoaded', () => {
    const suggestionsDiv = document.getElementById('suggestions');
    const word = "happy"; // Example word

    // Fetch synonyms from the API and update the DOM
    suggestSynonyms(word).then(synonyms => {
        if (synonyms.length > 0) {
            suggestionsDiv.innerHTML = `<p>Synonyms for '${word}': ${synonyms.join(', ')}</p>`;
        } else {
            suggestionsDiv.innerHTML = `<p>No synonyms found for '${word}'</p>`;
        }
    });
});