export default async function handler(req, res) {
  const url = new URL(req.url, 'https://dummy.com');
  const originalPath = url.searchParams.get('path') || '';
  const target = 'https://generativelanguage.googleapis.com/' + originalPath;

  const headers = {};
  if (req.headers['content-type']) headers['Content-Type'] = req.headers['content-type'];
  if (req.headers['authorization']) headers['Authorization'] = req.headers['authorization'];

  const options = { method: req.method, headers };
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    options.body = JSON.stringify(req.body);
  }

  const response = await fetch(target, options);
  const data = await response.text();
  res.status(response.status).send(data);
}
