import { ethers } from 'ethers';
import type { NextPage } from 'next';
import { NextRouter, useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import artifact from '../contracts/build/contracts/GreenFoodToken.json';
import DefaultLayout from '../layouts/default';
import data from '../contents/data.json';

type Account = {
  name: string;
  address: string;
};

const contractAddress = data.contractAddress;
const supplierAddress = data.supplierAddress;
const supplierPrivKey = data.supplierPrivKey;
const rpcURL = data.RPC;
const accounts: Array<Account> = data.accounts;

const transfer = (
  state: any,
  router: NextRouter,
  contract: ethers.Contract,
  productId: number,
  address: string
) => {
  state(true);

  const tokenId = productId - 1;
  console.log('transfer: ', tokenId);

  // transfer NFT
  contract['safeTransferFrom(address,address,uint256)'](
    supplierAddress,
    address,
    tokenId
  ).then((res: any) => {
    console.log(res);
    router.push(
      `/transfered?token=${tokenId}&tx=${res.hash}&sender=${supplierAddress}&recipient=${address}`
    );
  });
};

const Transfer: NextPage = () => {
  const [hasTransfering, setHasTransfering] = useState(false);

  const router = useRouter();
  const productId = Number(router.query.id as string);
  if (!productId) return <div></div>;

  const provider = new ethers.providers.JsonRpcProvider(rpcURL);
  const wallet = new ethers.Wallet(supplierPrivKey, provider);
  const contract = new ethers.Contract(
    contractAddress,
    artifact.abi,
    wallet.provider
  );
  const contractWithSigner = contract.connect(wallet);

  return (
    <DefaultLayout>
      <div className="bg-white">
        <div className="mx-auto max-w-sm px-8 py-16 sm:py-24 sm:px-6">
          {hasTransfering ? (
            <p className="text-center mb-12">送信中...</p>
          ) : (
            <p className="text-center mb-12">送り先を以下から選んでください</p>
          )}
          <div
            className="px-4 py-2 my-4 border border-sky-700 text-sky-700 rounded hover:opacity-50"
            onClick={() =>
              transfer(
                setHasTransfering,
                router,
                contractWithSigner,
                productId,
                accounts[0].address
              )
            }
          >
            <p>{accounts[0].name}</p>
            <p className="truncate">{accounts[0].address}</p>
          </div>
          {accounts.slice(1).map((account) => {
            return (
              <div
                className="px-4 py-2 my-4 border border-sky-700 text-sky-700 rounded hover:opacity-50"
                key={account.address}
              >
                <p>{account.name}</p>
                <p className="truncate">{account.address}</p>
              </div>
            );
          })}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Transfer;
