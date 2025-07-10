export async function detectBootstrap() {
  return Array.from(document.querySelectorAll("script[src]")).some(script =>
    script.src.includes("bootstrap")
  );
}
