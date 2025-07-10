chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.techStack && Array.isArray(message.techStack)) {
    const techStack = message.techStack;
    
    // Simpan techStack ke local storage
    chrome.storage.local.set({ techStack });

    // Set badge di ikon ekstensi jika pesan berasal dari tab (bukan popup)
    if (sender.tab && sender.tab.id !== undefined) {
      chrome.action.setBadgeText({
        text: techStack.length.toString(),
        tabId: sender.tab.id
      });

      chrome.action.setBadgeBackgroundColor({
        color: "#7c3aed",
        tabId: sender.tab.id
      });
    }
  }
});
