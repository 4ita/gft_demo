import data from '../contents/data.json';

const Header = () => {
  return (
    <header className="p-4">
      <h1 className="font-bold text-2xl text-gray-700">
        <a href="/">{data.title}</a>
      </h1>
    </header>
  );
};

export default Header;
