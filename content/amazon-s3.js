export function detectAmazonS3() {
  const urls = Array.from(document.querySelectorAll('[src], [href]'))
    .map(el => el.getAttribute('src') || el.getAttribute('href'))
    .filter(Boolean);

  return urls.some(url =>
    url.includes('.s3.amazonaws.com') ||
    url.includes('s3.') && url.includes('.amazonaws.com')
  );
}
