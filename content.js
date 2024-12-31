document.addEventListener('mouseup', (event) => {
    let selectedText = window.getSelection().toString().trim(); // Get the selected text
    
    if (selectedText.length > 2) {  // Only process selections with more than 2 characters
      // Send the selected word to the background script for fetching synonyms
      chrome.runtime.sendMessage({ action: 'getSynonyms', word: selectedText }, (response) => {
        if (response.synonyms && response.synonyms.length > 0) {
          // If synonyms are found, display them
          showSuggestions(event.pageX, event.pageY, response.synonyms);
        } else {
          // Optionally, show a message if no synonyms are found
          showSuggestions(event.pageX, event.pageY, ['No synonyms found']);
        }
      });
    }
  });
  
  function showSuggestions(x, y, synonyms) {
    // Create a tooltip to display synonyms near the selected text
    let tooltip = document.createElement('div');
    tooltip.style.position = 'absolute';
    tooltip.style.left = `${x + 10}px`;  // Position slightly to the right of the selection
    tooltip.style.top = `${y + 10}px`;  // Position slightly below the selection
    tooltip.style.backgroundColor = '#FFFF00';
    tooltip.style.padding = '5px';
    tooltip.style.border = '1px solid #ccc';
    tooltip.style.borderRadius = '5px';
    tooltip.style.zIndex = '9999';  // Ensure the tooltip is on top of other elements
    tooltip.innerHTML = 'Synonyms: ' + synonyms.join(', ');  // Display the synonyms
    tooltip.style.opacity = 1;
  
    document.body.appendChild(tooltip);
  
    // Remove the tooltip after a few seconds
    setTimeout(() => {
      tooltip.remove();
    }, 3000);
  }