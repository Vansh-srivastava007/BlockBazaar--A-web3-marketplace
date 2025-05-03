# BlockBazaar

## A blockchain based marketplace decentralised webapp.

![BlockBazaar](/public/images/blockBay.jpg)

***

## Prerequisites

#### Ganache

For local installation, a development blockchain is used which mimics the behaviour of a public blockchain (such as the Ethereum Mainnet).

This project uses [Ganache](https://www.trufflesuite.com/ganache) as the development blockchain.

After download and istallation, create a new workspace and ensure that the RPC server is set to `HTTP://127.0.0.1:7545` and the network ID is set to `5777`.

#### Node.js

Install Node.js to make use of NPM (node package manager) in order to install further dependencies.

To check if you have node already installed, type the following command into your terminal:

`$ node -v`

If node is not installed, visit [Node.js](https://nodejs.org/en/) to download.

#### Truffle Framework

The [Truffle Framework](https://www.trufflesuite.com/) provides a suite of tools tailored towards developing smart contracts using Solidity (lang).

This project runs on truffle version 5.0.5, to install globally using NPM, type the following command into your terminal:

`$ npm install -g truffle@5.0.5`

#### Metamask

In order to connect the app to the blockchain from in the browser, the [Metamask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) Chrome browser extension must be added.

Metamask allows you to connect to the Ganache blockchain where you are then able to import your Ganache accounts to be used within the app.

## Installation

After cloning or downloading blockBay, run:

`$ npm install`

to install the app's dependencies locally.

Next, use Truffle to compile the smart contract ready for use by running:

`$ truffle compile`

With Ganache running and Metamask now set up, run:

`$ npm run start`

to start the local development server.

## Using BlockBazaar


Import at least two accounts from Ganache into Metamask, and use them to list, buy and sell any products with ownership secured entirely on the blockchain.
