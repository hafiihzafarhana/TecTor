export async function detectGTMBy() {
  return Array.from(document.querySelectorAll("script[src]")).some(script =>
    script.src.includes("googletagmanager.com/gtm.js")
  );
}
