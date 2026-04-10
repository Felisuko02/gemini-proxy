export default async function handler(req, res) {
  const path = req.url.replace('/api/proxy', '');
  const target = 'https://generativelanguage.googleapis.com' + path;

  const headers = {};
  if (req.headers['content-type']) headers['Content-Type'] = req.headers['content-type'];
  if (req.headers['authorization']) headers['Authorization'] = req.headers['authorization'];

  const options = {
    method: req.method,
    headers,
  };

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    options.body = JSON.stringify(req.body);
  }

  const response = await fetch(target, options);
  const data = await response.text();
  res.status(response.status).send(data);
}
