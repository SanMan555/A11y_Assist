function checkAccessibility() {
  let results = [];
  let h1Status, titleStatus = false;
  // Check if there is at least one <h1> tag
  let h1Tags = document.getElementsByTagName('h1');
  if (h1Tags.length === 0) {
    results.push("Error: The document must contain at least one <h1> tag.");
  } else {
    h1Status = true
  }

  // Check if there is a <title> tag
  let titleTag = document.getElementsByTagName('title')[0];
  if (!titleTag) {
    results.push("Error: The document must contain a <title> tag.");
  } else {
    titleStatus = true
  }

  if (h1Status && titleStatus) {
    // Check if the <title> tag value contains the <h1> tag value
    let h1Value = h1Tags[0].textContent.trim().toLowerCase();
    let titleValue = titleTag.textContent.trim().toLowerCase();
    if (!titleValue.includes(h1Value)) {
      results.push(`Error: The <title> tag value must contain the <h1> tag value. Expected '${h1Value}' to be in the title.`);
      console.log('three')
    } else {
      results.push("Success: The document meets all conditions.");
      console.log('three')
    }
  } else {
    results.push(`Error: Please resolve the above mentioned error(s) and perform Scan`);
  }

  return results;
}

// Listen for a message from the popup to run the accessibility scan
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === 'scan') {
    let results = checkAccessibility();
    sendResponse({ results });
  }
});
