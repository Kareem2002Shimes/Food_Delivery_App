import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import Add from '../components/Add';
import AddButton from '../components/AddButton';
import Featured from '../components/Featured';
import PizzaList from '../components/PizzaList';
import styles from '../styles/Home.module.css';
import { dbConnect } from '../util/mongo';
import Product from '../models/Product';
export default function Home({ pizzaList, admin }) {
  const products = JSON.parse(pizzaList);
  const [close, setClose] = useState(true);
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Restaurant in Newyork</title>
        <meta name='description' content='Best pizza shop in town' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Featured />
      {<AddButton setClose={setClose} />}
      <PizzaList pizzaList={products} />
      {!close && <Add setClose={setClose} />}
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || '';
  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }
  dbConnect();
  // const res = await axios.get(
  //   `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/products`
  // );
  const products = await Product.find();
  return {
    props: {
      pizzaList: JSON.stringify(products),
      admin,
    },
  };
};
