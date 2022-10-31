import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import DefaultLayout from '../layouts/default';
import data from '../contents/data.json';

type Account = {
  name: string;
  address: string;
};

type Product = {
  id: number;
  name: string;
  price: number;
  token_amount: number;
  image: string;
};

type Token = {
  id: number;
  name: string;
  purchase_date: string;
  producer: string;
  place: string;
};

const Home: NextPage = () => {
  const router = useRouter();
  const sender = router.query.sender as string;
  const recipient = router.query.recipient as string;
  if (!sender || !recipient) return <div></div>;

  // const product: Product = data.products.filter(
  //   (token) => token.id === lotId
  // )[0];
  // const token: Token = data.tokens.filter((token) => token.id === lotId)[0];

  return (
    <DefaultLayout>
      <div className="bg-white">
        <div className="mx-auto max-w-sm px-8 py-16 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="text-center mb-12">
            <p>送信しました</p>
          </div>
          <p>{sender}</p>
          <p className="text-center">↓</p>
          <p>{recipient}</p>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Home;
