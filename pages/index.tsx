import type { NextPage } from 'next';
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

const products: Array<Product> = data.products;
const tokens: Array<Token> = data.tokens;
const URL =
  process.env.NODE_ENV === 'production'
    ? data.domainURL
    : 'http://localhost:3000';

const Home: NextPage = () => {
  return (
    <DefaultLayout>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-8 px-8 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.id} className="group relative">
                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
                  <img
                    src={
                      product.image
                        ? `${URL}/images/${product.image}`
                        : 'http://placehold.jp/300x300.png'
                    }
                    alt={product.name}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <p className="text-sm mt-4 text-gray-700">
                  {tokens[Number(product.id) - 1].place} -{' '}
                  {tokens[Number(product.id) - 1].producer}
                </p>
                <div className="mt-0 flex justify-between">
                  <h3 className="text-gray-700">{product.name}</h3>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      ¥{product.price}
                    </p>
                    <p className="font-medium text-gray-700">
                      {product.token_amount} GFT
                    </p>
                  </div>
                </div>
                <div className="py-2 my-4 border-2 border-sky-700 rounded hover:opacity-75">
                  <a href={`/purchased?id=${product.id}`}>
                    <p className="text-center text-sky-700">購入</p>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Home;
