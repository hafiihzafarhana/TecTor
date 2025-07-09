export async function detectVue() {
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
