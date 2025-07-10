export async function detectTawkScript() {
  return Array.from(document.querySelectorAll("script[src]")).some(script =>
    script.src.includes("tawk.to")
  );
}
