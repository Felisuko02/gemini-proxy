export default async function handler(req, res) {
  const originalUrl = req.headers['x-forwarded-uri'] || req.url;
  const path = originalUrl.replace(/^\/api\/proxy\/?/, '/').replace(/^\//, '');
  const separator = path.includes('?') ? '&' : '?';
  const target = 'https://generativelanguage.googleapis.com/' + path + separator + 'key=' + process.env.GEMINI_API_KEY;

  const headers = {};
  if (req.headers['content-type']) headers['Content-Type'] = req.headers['content-type'];

  const options = { method: req.method, headers };
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    options.body = JSON.stringify(req.body);
  }

  const response = await fetch(target, options);
  const data = await response.text();
  res.status(response.status).send(data);
}
