import { ethers } from 'ethers';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import artifact from '../contracts/build/contracts/GreenFoodToken.json';
import data from '../contents/data.json';
import DefaultLayout from '../layouts/default';

type DisplayToken = {
  id: number;
  owner: string;
};

const contractAddress = data.contractAddress;
const supplierAddress = data.supplierAddress;
const URL = data.domainURL;
const rpcURL = data.RPC;

const transfer = (tokenId: number, owner: string) => {
  const provider = new ethers.providers.JsonRpcProvider(rpcURL);
  const wallet = new ethers.Wallet(
    data.accounts[0].privKey as string,
    provider
  );
  const contract = new ethers.Contract(
    contractAddress,
    artifact.abi,
    wallet.provider
  );
  const contractWithSigner = contract.connect(wallet);

  contractWithSigner['safeTransferFrom(address,address,uint256)'](
    owner,
    supplierAddress,
    tokenId
  ).then((res: any) => {
    console.log(res);
  });
};

const mint = (contract: ethers.Contract, tokenId: number) => {
  console.log('mint: ', tokenId);

  // mint NFT
  contract.functions
    .createItem(supplierAddress, `${URL}/gft-${tokenId}.json`)
    .then(console.log);
};

const Dashboard: NextPage = () => {
  const [balance, setBalance] = useState('');
  const [tokens, setTokens] = useState<DisplayToken[]>([]);
  const [alert, setAlert] = useState();
  const [windowEthereum, setWindowEthereum] = useState();

  useEffect(() => {
    const { ethereum } = window as any;

    setWindowEthereum(ethereum);
  }, [setWindowEthereum]);

  const provider = new ethers.providers.JsonRpcProvider(rpcURL);
  const contract = new ethers.Contract(contractAddress, artifact.abi, provider);

  useEffect(() => {
    const getBalance = async () => {
      const res = await contract.functions.balanceOf(supplierAddress);
      setBalance(ethers.utils.formatUnits(res[0], 0));
    };

    getBalance();
  }, []);

  useEffect(() => {
    const getNFT = async () => {
      let res = [];
      for (let i = 0; i < 10; i++) {
        const id = i;
        try {
          const owner = ((await contract.functions.ownerOf(id)) as string[])[0];
          res.push({ id, owner });
        } catch (error) {}
      }
      setTokens(res);
    };

    getNFT();
  }, []);

  if (windowEthereum) {
    const walletProvider = new ethers.providers.Web3Provider(windowEthereum);
    walletProvider.send('eth_requestAccounts', []);
    const walletContract = new ethers.Contract(
      contractAddress,
      artifact.abi,
      walletProvider
    );

    const signer = walletProvider.getSigner();
    const contractWithSigner = walletContract.connect(signer);

    return (
      <DefaultLayout>
        <div className="bg-white">
          <div className="mx-auto max-w-sm px-8 py-8 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <p className="text-xl mb-8">Show GFT</p>
            <p className="truncate">発行者: {supplierAddress}</p>
            <p>発行者が保有するトークン数: {balance}</p>
            {tokens.map((token) => (
              <div className="py-2 my-4 border-b-2" key={token.id}>
                <p>GFT ID: {token.id}</p>
                <p
                  className="text-sky-700 truncate"
                  onClick={() => {
                    transfer(token.id, token.owner);
                  }}
                >
                  owner: {token.owner}
                </p>
              </div>
            ))}
            <p className="text-xl mt-16 mb-8">Mint New GFT</p>
            {[...Array(100).keys()].map((i) => {
              return (
                <div
                  className="py-2 my-4 border-2 border-sky-700 rounded hover:opacity-75"
                  onClick={() => mint(contractWithSigner, i)}
                  key={i}
                >
                  <p className="text-center text-sky-700">GFT ID: {i}</p>
                </div>
              );
            })}
          </div>
        </div>
      </DefaultLayout>
    );
  } else {
    return (
      <DefaultLayout>
        <p>Error: windowEthereum</p>
      </DefaultLayout>
    );
  }
};

export default Dashboard;
