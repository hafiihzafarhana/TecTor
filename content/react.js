async function detectReactByScriptContent() {
  const scripts = Array.from(document.querySelectorAll("script[src]"))
    .map(script => script.src)
    .filter(src => src.includes(".js"));
  for (const src of scripts) {
    try {
      const res = await fetch(src);
      const content = await res.text();

      // Cek tanda-tanda khas React
      if (
        content.includes("React.createElement") ||
        content.includes("react-dom") ||
        content.includes("useState") ||
        content.includes("react-router") ||
        content.includes("REACT_ELEMENT_TYPE")
      ) {
        return true;
      }
    } catch (e) {
      // Mungkin kena CORS, skip
      continue;
    }
  }

  return false;
}

export async function detectReact() {
  const hasHook = !!window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
  const reactRoot = document.querySelector("[data-reactroot]");
  let winReact = false
  if(!!window.React ||
    !!document.querySelector('[data-reactroot], [data-reactid]') ||
    Array.from(document.querySelectorAll('*')).some(e => e._reactRootContainer !== undefined || Object.keys(e).some(k => k.startsWith('__reactContainer')))
  ) {
    winReact = true
  }
  const containsReactScript = await detectReactByScriptContent();

  return hasHook || reactRoot || containsReactScript || winReact;
}
