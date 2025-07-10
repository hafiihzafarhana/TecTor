export async function detectPHP() {
  const cookie = document.cookie.includes("PHPSESSID=");
  const urlContainsPHP = Array.from(document.querySelectorAll('[src], [href], form[action]'))
    .some(el => {
      const attr = el.getAttribute('src') || el.getAttribute('href') || el.getAttribute('action') || '';
      return attr.includes('.php');
    });

  const html = document.documentElement.innerHTML.toLowerCase();
  const hasErrorSignature = html.includes("php warning");

  return cookie || urlContainsPHP || hasErrorSignature;
}
