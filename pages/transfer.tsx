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

const accounts: Array<Account> = data.accounts;

const Home: NextPage = () => {
  const router = useRouter();
  const lotId = Number(router.query.id as string);
  if (!lotId) return <div></div>;

  const product: Product = data.products.filter(
    (token) => token.id === lotId
  )[0];
  const token: Token = data.tokens.filter((token) => token.id === lotId)[0];

  return (
    <DefaultLayout>
      <div className="bg-white">
        <div className="mx-auto max-w-sm px-8 py-16 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="text-center mb-12">
            <p>送り先を以下から選んでください</p>
          </div>
          {accounts.map((account) => {
            return (
              <div className='px-4 py-2 my-4 border border-sky-700 text-sky-700 rounded hover:opacity-50' key={account.address}>
                <p>{account.name}</p>
                <p>{account.address}</p>
              </div>
            );
          })}
          <p>送信中...</p>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Home;
