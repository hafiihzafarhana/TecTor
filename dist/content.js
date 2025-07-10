(() => {
  // content/tailwind.js
  async function detectTailwind() {
    const commonClasses = [
      "flex",
      "grid",
      "block",
      "hidden",
      "text-center",
      "text-left",
      "text-right",
      "bg-",
      "text-",
      "p-",
      "m-",
      "mt-",
      "mb-",
      "rounded",
      "shadow"
    ];
    const elements = document.querySelectorAll("[class]");
    let count = 0;
    elements.forEach((el) => {
      const classAttr = (el.getAttribute("class") || "").toString();
      const classList = classAttr.split(/\s+/);
      classList.forEach((cls) => {
        if (commonClasses.some((cc) => cls.startsWith(cc))) {
          count++;
        }
      });
    });
    return count > 10;
  }

  // content/netlify.js
  async function detectNetlify() {
    return window.location.hostname.endsWith("netlify.app");
  }

  // content/vue.js
  async function detectVue() {
    const elements = document.querySelectorAll("*");
    for (const el of elements) {
      for (const attr of el.attributes) {
        if (attr.name.startsWith("data-v-")) {
          return true;
        }
      }
    }
    if (window.__VUE_DEVTOOLS_GLOBAL_HOOK__) return true;
    return false;
  }

  // content/react.js
  async function detectReactByScriptContent() {
    const scripts = Array.from(document.querySelectorAll("script[src]")).map((script) => script.src).filter((src) => src.includes(".js"));
    for (const src of scripts) {
      try {
        const res = await fetch(src);
        const content = await res.text();
        if (content.includes("React.createElement") || content.includes("react-dom") || content.includes("useState") || content.includes("react-router") || content.includes("REACT_ELEMENT_TYPE")) {
          return true;
        }
      } catch (e) {
        continue;
      }
    }
    return false;
  }
  async function detectReact() {
    const hasHook = !!window.__REACT_DEVTOOLS_GLOBAL_HOOK__;
    const reactRoot = document.querySelector("[data-reactroot]");
    let winReact = false;
    if (!!window.React || !!document.querySelector("[data-reactroot], [data-reactid]") || Array.from(document.querySelectorAll("*")).some((e) => e._reactRootContainer !== void 0 || Object.keys(e).some((k) => k.startsWith("__reactContainer")))) {
      winReact = true;
    }
    const containsReactScript = await detectReactByScriptContent();
    return hasHook || reactRoot || containsReactScript || winReact;
  }

  // content/tawk.js
  async function detectTawkScript() {
    return Array.from(document.querySelectorAll("script[src]")).some(
      (script) => script.src.includes("tawk.to")
    );
  }

  // content/google-tag-manager.js
  async function detectGTMBy() {
    return Array.from(document.querySelectorAll("script[src]")).some(
      (script) => script.src.includes("googletagmanager.com/gtm.js")
    );
  }

  // content/goolge-analytic.js
  async function detectAnalytic() {
    return Array.from(document.querySelectorAll("script[src]")).some(
      (script) => script.src.includes("google-analytics.com/analytics.js")
    );
  }

  // content/jquery.js
  async function detectjQuery() {
    const hasGlobal = typeof window.jQuery !== "undefined" || typeof window.$ !== "undefined";
    const scripts = Array.from(document.querySelectorAll("script[src]")).map((s) => s.src.toLowerCase());
    const hasScript = scripts.some(
      (src) => src.includes("jquery") || src.includes("jquery.validate") || src.includes("jquery.")
      // plugin
    );
    return hasGlobal || hasScript;
  }

  // content/next.js
  function detectNext() {
    return document.getElementById("__next") !== null;
  }

  // content/sensor-analytic.js
  function detectSensorAnalytic() {
    return !!document.querySelector("[data-sensors-click]");
  }

  // content/main.js
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
    if (await detectReact()) {
      techStack.push("React JS");
    }
    chrome.runtime.sendMessage({ techStack });
  }
  main();
})();
