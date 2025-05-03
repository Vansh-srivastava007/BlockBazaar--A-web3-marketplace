import React, { Component } from 'react';
import Web3 from 'web3';
import Marketplace from '../smart_contracts/Marketplace.json';
import Products from '../components/Products.js';
import Loading from '../components/Loading.js';

class Main extends Component {
    async componentWillMount() {
      await this.loadWeb3();
      await this.loadBlockchainData();
    }
  
    async loadWeb3() {
      // Structure taken from https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.eth_requestAccounts;
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        window.alert('Non Ethereum browser detected, you should consider installing Metamask!');
      }
    }
  
    async loadBlockchainData() {
      // Load the current metamask account
      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
      this.setState({ account: accounts[0] });
  
      // Load the smart contract from the blockchain
      const networkId = await web3.eth.net.getId();
      const networkData = Marketplace.networks[networkId];
  
      if (networkData ) {
        const marketplace = new web3.eth.Contract(Marketplace.abi, networkData.address)
        this.setState({ marketplace })
        const productCount = await marketplace.methods.productCount().call()
        this.setState({ productCount })
        // Load products
        for (let i = 1; i <= productCount; i++) {
          const product = await marketplace.methods.products(i).call()
          this.setState({
            products: [...this.state.products, product]
          })
        }
        this.setState({ loading: false })
      } else {
        window.alert('Marketplace contract not deployed to detected network')
      }
  
      // Reload state on account change
      window.ethereum.on('accountsChanged', function (accounts) {
        this.setState({ account: accounts[0] });
        // TODO: setState on products
        window.location.reload();
      }.bind(this));
    }
  
    constructor(props) {
      super(props);
      this.state = {
        account: '',
        productCount: 0,
        products: [],
        loading: true
      }
  
      this.createProduct = this.createProduct.bind(this)
      this.purchaseProduct = this.purchaseProduct.bind(this)
    }
  
    createProduct(name, price) {
      this.setState({ loading: true })
      this.state.marketplace.methods.createProduct(name, price).send({ from: this.state.account })
      .once('receipt', (receipt) => {
        this.setState({ loading: false })
      })
    }
  
    purchaseProduct(id, price) {
      this.setState({ loading: true })
      this.state.marketplace.methods.purchaseProduct(id).send({ from: this.state.account, value: price })
      .once('receipt', (receipt) => {
        this.setState({ loading: false })
      })
    }
  
    
  
    //ethereum.on('chainChanged', (_chainId) => window.location.reload());

    render() {
        return (
          <div className="container mt-5 pt-5">
              <div className="row">
                  <main role="main" className="col-lg-12 d-flex">
                  {
                      this.state.loading ?
                      <Loading /> :
                      <Products 
                          products={this.state.products}
                          account={this.state.account}
                          createProduct={this.createProduct}
                          purchaseProduct={this.purchaseProduct}
                      />
                  }
                  </main>
              </div>
          </div>
        )
    }
}

export default Main;

