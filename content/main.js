import { detectTailwind } from "./tailwind.js";
import { detectNetlify } from "./netlify.js";
import { detectVue } from "./vue.js";
import { detectReact } from "./react.js";

async function main() {
  await chrome.storage.local.set({ techStack: [] });

  const techStack = [];

  if (await detectNetlify()) {
    techStack.push("Netlify");
  }

  if (await detectTailwind()) {
    techStack.push("Tailwind CSS");
  }

  if (await detectVue()) {
    techStack.push("Vue JS");
  }

  // NO ACCURATE
  if (await detectReact()) { 
    techStack.push("React JS");
  }
  // NO ACCURATE

  chrome.runtime.sendMessage({ techStack });
}

main();

