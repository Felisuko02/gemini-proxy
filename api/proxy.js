export default async function handler(req, res) {
  const proxyPath = req.query.path || '';
  
  // Get all query params except 'path' (which is our internal routing param)
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(req.query)) {
    if (key !== 'path') params.set(key, value);
  }
  const queryString = params.toString() ? '?' + params.toString() : '';
  const target = 'https://generativelanguage.googleapis.com/' + proxyPath + queryString;

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
