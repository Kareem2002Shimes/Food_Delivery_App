import dbConnect from '../../../util/mongo';
import Product from '../../../models/Product';
import NextCors from 'nextjs-cors';

export default async function handler(req, res) {
  const {
    method,
    query: { id },
    cookies,
  } = req;
  const token = cookies.token;

  dbConnect();
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  if (method === 'GET') {
    try {
      const product = await Product.findById(id);
      console.log(product);
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === 'PUT') {
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json('Not authenticated!');
    }
    try {
      const product = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === 'DELETE') {
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json('Not authenticated!');
    }
    try {
      await Product.findByIdAndDelete(id);
      res.status(200).json('The product has been deleted!');
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
