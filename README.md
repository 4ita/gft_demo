# Demo application for Green Food Token

## Directories

- [components](./components/): UI components for pages
- [contracts](./contracts/): Green Food Token contract
- [pages](./pages/): web application pages
- [public](./public/): images shown in each page, JSON files for GFT

## How to use

Execute this application on localhost.

```console
$ yarn dev
```

Deploy it to the cloud with Microsoft Azure App Service.

## Requirement

Install below packages or softwares.

- Node.js: using Next.js / developing Ethereum DApps
- Yarn: package manangement software for Node.js
- Truffle: development framework for Ethereum DApps
- Ganache: using local testnet of Ethereum

This repository developed for this version.

```console
$ node -v
v16.13.2

$ truffle version
Truffle v5.6.3 (core: 5.6.3)
Ganache v7.4.4
Solidity v0.5.16 (solc-js)
Node v16.13.2
Web3.js v1.7.4

$ yarn list --pattern ethers
yarn list v1.22.15
├─ @ethersproject/abi@5.7.0
├─ （中略）
└─ ethers@5.7.2
```

## Development Environment

- OS: macOS Monterey (Version 12.1)
- Processor: 2 GHz Quad-Core Intel Core i5
