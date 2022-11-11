import { ethers } from 'ethers';
import type { NextPage } from 'next';
import { NextRouter, useRouter } from 'next/router';
import artifact from '../contracts/build/contracts/GreenFoodToken.json';
import DefaultLayout from '../layouts/default';
import data from '../contents/data.json';

const transfer = (router: NextRouter, tokenId: string, to: string) => {
  const provider = new ethers.providers.JsonRpcProvider(data.RPC);
  const wallet = new ethers.Wallet(
    data.accounts[0].privKey as string,
    provider
  );
  const contract = new ethers.Contract(
    data.contractAddress,
    artifact.abi,
    wallet.provider
  );
  const contractWithSigner = contract.connect(wallet);

  contractWithSigner['safeTransferFrom(address,address,uint256)'](
    data.accounts[0].address,
    to,
    tokenId
  ).then(() => {
    router.push('/');
  });
};

const Transfered: NextPage = () => {
  const router = useRouter();
  const sender = router.query.sender as string;
  const recipient = router.query.recipient as string;
  const tokenId = router.query.token as string;
  const txHash = router.query.tx as string;
  if (!sender || !recipient || !tokenId || !txHash) return <div></div>;

  return (
    <DefaultLayout>
      <div className="bg-white">
        <div className="mx-auto max-w-sm px-8 py-16 sm:py-24 sm:px-6">
          <div className="text-center mb-12">
            <p>送信しました</p>
          </div>
          <p className="text-slate-500">トランザクション</p>
          <p className="truncate text-lg text-sky-700 underline underline-offset-auto truncate">
            <a href={`https://goerli.etherscan.io/tx/${txHash}`} target="_blank">{txHash}</a>
          </p>
          <div className="my-8">
            <p className="text-slate-500">送った人</p>
            <p className="truncate text-lg">{sender}</p>
            <p className="text-center mt-4 mb-0">↓</p>
            <p className="text-slate-500">受け取った人</p>
            <p className="truncate text-lg">{recipient}</p>
          </div>
          <div
            className="mx-auto my-16 p-2 w-36 text-center rounded bg-sky-700 hover:opacity-75"
            onClick={() => {
              transfer(router, tokenId, sender);
            }}
          >
            <p className="text-white">閉じる</p>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Transfered;
