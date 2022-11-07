import data from '../contents/data.json';

const Footer = () => {
  return (
    <footer>
      <div className="mx-auto max-w-2xl py-16 px-8 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <p className="text-slate-300">
          <a href="/dashboard">Dashboard</a>
        </p>
        <p className="text-slate-300">
          <a
            href={`https://goerli.etherscan.io/address/${data.contractAddress}`}
          >
            Contract - Etherscan
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
