document.getElementById('scanBtn').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        files: ['content.js']  // Ensure content.js is injected before sending a message
      },
      () => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'scan' }, (response) => {
          const resultsList = document.getElementById('results');
          resultsList.innerHTML = '';  // Clear previous results

          // Check if the response is valid
          if (chrome.runtime.lastError || !response || !response.results) {
            let li = document.createElement('li');
            li.textContent = 'Failed to retrieve accessibility results or content script not injected.';
            resultsList.appendChild(li);
            return;
          }

          // Handle no issues found
          if (response.results.length === 0) {
            let li = document.createElement('li');
            li.textContent = 'No accessibility issues found!';
            resultsList.appendChild(li);
          } else {
            // Handle found issues
            response.results.forEach(result => {
              let li = document.createElement('li');
              li.textContent = result;
              resultsList.appendChild(li);
            });
          }
        });
      }
    );
  });
});

document.querySelector('.close-icon').addEventListener('click', function() {
  document.getElementById('secondaryView').style.display = 'none';
});

document.querySelector('#scanBtn').addEventListener('click', function() {
  document.getElementById('secondaryView').style.display = 'block';
});

