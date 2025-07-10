import { detectTailwind } from "./tailwind.js";
import { detectNetlify } from "./netlify.js";
import { detectVue } from "./vue.js";
import { detectReact } from "./react.js";
import { detectTawkScript } from "./tawk.js";
import { detectGTMBy } from "./google-tag-manager.js"
import { detectAnalytic } from "./goolge-analytic.js"
import { detectjQuery } from "./jquery.js"
import { detectNext } from "./next.js"
import { detectSensorAnalytic } from "./sensor-analytic.js"
import { detectPHP } from "./php.js"
import { detectAmazonS3 } from "./amazon-s3.js"
import { detectBootstrap } from "./bootstrap.js"
import { detectMicrosoftClarity } from "./microsoft-clarity.js"

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

  if (await detectTawkScript()) {
    techStack.push("Tawk");
  }

  if (await detectGTMBy()) {
    techStack.push("Google Tag Manager");
  }

  if (await detectAnalytic()) {
    techStack.push("Google Analytic");
  }

  if (await detectjQuery()) {
    techStack.push("JQuery");
  }

  if (detectNext()) {
    techStack.push("Next JS");
  }

  if (detectSensorAnalytic()) {
    techStack.push("Sensor Analytic");
  }

  if (detectPHP()) {
    techStack.push("PHP");
  }

  if (detectAmazonS3()) {
    techStack.push("Amazon S3");
  }

  if (detectBootstrap()) {
    techStack.push("Bootstrap");
  }

  if (await detectMicrosoftClarity()) {
    techStack.push("Microsoft Clarity");
  }

  // NO ACCURATE
  if (await detectReact()) { 
    techStack.push("React JS");
  }
  // NO ACCURATE

  chrome.runtime.sendMessage({ techStack });
}

main();

