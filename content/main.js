import { detectTailwind } from "./tailwind.js";
import { detectNetlify } from "./netlify.js";

chrome.storage.local.set({ techStack: [] }, () => {
  const techStack = [];

  if (detectNetlify()) {
    techStack.push("Netlify");
  }

  if (detectTailwind()) {
    techStack.push("Tailwind CSS");
  }

  chrome.runtime.sendMessage({ techStack });
});
