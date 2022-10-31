import Head from 'next/head';
import Footer from '../components/footer';
import Header from '../components/header';
import data from '../contents/data.json';

type Props = {
  children?: React.ReactNode;
  title?: string;
  description?: string;
};

const DefaultLayout = ({ children, title, description }: Props) => {
  return (
    <>
      <Head>
        <title>{data.title || 'title'}</title>
        <meta
          name="description"
          content={data.description || 'description'}
        />
      </Head>
      <Header />
      <main className="">{children}</main>
      <Footer />
    </>
  );
};

export default DefaultLayout;
