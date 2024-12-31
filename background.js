chrome.runtime.onInstalled.addListener(() => {
    console.log("Language Enrichment Tool Installed.");
  });
  
  // Placeholder function to fetch synonyms
  function fetchSynonyms(word) {
    return fetch(`https://api.datamuse.com/words?rel_syn=${word}`)
      .then(response => response.json())
      .then(data => data.map(item => item.word));
  }
  
  // Placeholder function to fetch idioms (could be expanded with a proper API)
  function fetchIdioms(context) {
    // Example: based on context, fetch related idioms
    return ["Break the ice", "Hit the nail on the head", "A piece of cake"];
  }
  
  // Example usage of fetching synonyms and idioms
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getSynonyms') {
      fetchSynonyms(request.word).then(synonyms => sendResponse({ synonyms }));
    }
    if (request.action === 'getIdioms') {
      fetchIdioms(request.context).then(idioms => sendResponse({ idioms }));
    }
    return true;
  });