export default async function handler(req, res) {
  const path = req.url.replace('/api/proxy', '');
  const target = 'https://generativelanguage.googleapis.com' + path;
  
  const response = await fetch(target, {
    method: req.method,
    headers: { 'Content-Type': 'application/json' },
    body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
  });
  
  const data = await response.text();
  res.status(response.status).send(data);
}
