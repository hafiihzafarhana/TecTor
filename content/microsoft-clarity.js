export async function detectMicrosoftClarity() {
  // Tunggu sedikit waktu agar clarity sempat load jika dinamis
  await new Promise(res => setTimeout(res, 1000));

  const hasClarityScript = Array.from(document.querySelectorAll("script[src]")).some(script =>
    script.src.includes("clarity.ms/tag")
  );

  const hasClarityFunction =
    typeof window.clarity === "function" ||
    (typeof window.clarity === "object" && Array.isArray(window.clarity.q));

  return hasClarityScript || hasClarityFunction;
}
