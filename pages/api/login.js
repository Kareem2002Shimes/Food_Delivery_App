import cookie from 'cookie';
import cors from '../../util/cors';

const handler = async (req, res) => {
  await cors();
  if (req.method === 'POST') {
    const { username, password } = req.body;
    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', process.env.TOKEN, {
          maxAge: 60 * 60,
          sameSite: 'none',
          path: '/',
        })
      );
      res.status(200).json('successful');
    } else {
      res.status(400).json('Wrong Credentials!');
    }
  }
};

export default handler;
