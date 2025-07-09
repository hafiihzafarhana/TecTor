export async function detectNetlify() {
  return window.location.hostname.endsWith("netlify.app");
}
