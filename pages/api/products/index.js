import dbConnect from '../../../util/mongo';
import Product from '../../../models/Product';
import NextCors from 'nextjs-cors';

export default async function handler(req, res) {
  const { method } = req;

  const token = req.cookies.token;
  dbConnect();

  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  if (method === 'GET') {
    try {
      const products = await Product.find();

      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === 'POST') {
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json('Not authenticated!');
    }
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
