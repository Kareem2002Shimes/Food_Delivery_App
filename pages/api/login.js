import cookie from 'cookie';
import NextCors from 'nextjs-cors';

const handler = async (req, res) => {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  if (req.method === 'POST') {
    const { username, password } = req.body;
    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from all origins
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow specified methods
      res.setHeader('Access-Control-Allow-Headers', '*'); // Allow all headers
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', process.env.TOKEN, {
          maxAge: 60 * 60,
          sameSite: 'none',
          path: '/',
        })
      );
      res.status(200).json({ token: process.env.TOKEN });
    } else {
      res.status(400).json('Wrong Credentials!');
    }
  }
};

export default handler;
