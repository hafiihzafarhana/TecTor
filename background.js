chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.techStack && sender.tab) {
    chrome.storage.local.set({ techStack: message.techStack });
  }
});
