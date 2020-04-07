const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const uuid = require('uuid/v4');

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.id = uuid();
    res.setHeader('Set-Cookie', `cookie-cookies_cart-cookie=${req.body.id}`);
  }
  console.log(res.body);
  next();
});

server.use(router);
server.listen(3001, () => {
  console.log('Listening on port 3001');
});