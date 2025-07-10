export async function detectAnalytic() {
  return Array.from(document.querySelectorAll("script[src]")).some(script =>
    script.src.includes("google-analytics.com/analytics.js")
  );
}
