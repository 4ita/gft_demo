import data from '../contents/data.json';

const Header = () => {
  return (
    <header className="p-4">
      <h1 className="font-bold text-4xl text-green-800">
        <a href="/" className='flex flex-wrap' style={{ fontFamily: 'Yuji Syuku' }}>
          <p>{data.subtitle}</p>
          <p>{data.title}</p>
        </a>
      </h1>
    </header>
  );
};

export default Header;
