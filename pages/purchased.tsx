import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import DefaultLayout from '../layouts/default';
import data from '../contents/data.json';

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

const URL =
  process.env.NODE_ENV === 'production'
    ? data.domainURL
    : 'http://localhost:3000';

const Purchased: NextPage = () => {
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
        <div className="mx-auto max-w-sm px-8 py-4 sm:px-6">
          <div className="text-center mb-4">
            <p>ご購入ありがとうございます。</p>
            <p>{product.token_amount} GFTが付与されました！</p>
          </div>
          <img
            src={
              product.image
                ? `${URL}/images/${product.image}`
                : 'http://placehold.jp/300x300.png'
            }
            alt={product.name}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
          <div className="mt-8">
            <div className="flex py-2 border-b border-b-gray-300">
              <p className="w-36 text-gray-500">銘柄</p>
              <p>{token.name}</p>
            </div>
            <div className="flex py-2 border-b border-b-gray-300">
              <p className="w-36 text-gray-500">GHG削減量</p>
              <p>
                {product.token_amount / 100} kgCO<sub>2</sub>
              </p>
            </div>
            <div className="flex py-2 border-b border-b-gray-300">
              <p className="w-36 text-gray-500">購入日</p>
              <p>{token.purchase_date}</p>
            </div>
            <div className="flex py-2 border-b border-b-gray-300">
              <p className="w-36 text-gray-500">生産者</p>
              <p>{token.producer}</p>
            </div>
            <div className="flex py-2 border-b border-b-gray-300">
              <p className="w-36 text-gray-500">生産地</p>
              <p>{token.place}</p>
            </div>
            <div className="flex py-2 border-b border-b-gray-300">
              <p className="w-36 text-gray-500">トークンID</p>
              <p className="text-sky-700 underline underline-offset-auto">
                <a
                  className="mr-2"
                  href={`https://goerli.etherscan.io/token/${
                    data.contractAddress
                  }?a=${token.id - 1}`}
                  target="_blank"
                >
                  {token.id - 1}
                </a>
                (<a href={`${data.domainURL}/gft-${token.id - 1}.json`}>JSON</a>
                )
              </p>
            </div>
          </div>

          <div className="flex mt-8">
            <div className="mx-auto p-2 w-36 text-center rounded bg-sky-700 hover:opacity-75">
              <a href={`/transfer?id=${token.id}`}>
                <p className="text-white">送る</p>
              </a>
            </div>
            <div className="mx-auto p-2 w-36 text-center rounded border border-sky-700 hover:opacity-75">
              <a href="/">
                <p className="text-sky-700">貯める</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Purchased;
