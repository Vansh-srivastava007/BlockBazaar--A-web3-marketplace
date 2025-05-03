const { default: Web3 } = require("web3");

const Marketplace = artifacts.require('./Marketplace.sol');

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Marketplace', ([deployer, seller, buyer]) => {
    let marketplace;

    before(async () => {
        marketplace = await Marketplace.deployed();
    })

    describe('deployment', async () => {
        it('deploys successfully', async () => {
            const address = await marketplace.address;

            assert.notEqual(address, 0x0);
            assert.notEqual(address, '');
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);
        })

        it('has a name', async () => {
            const name = await marketplace.name();

            assert.equal(name, name);
            assert.equal(name, 'Marketplace');
            assert.notEqual(name, '');
            assert.notEqual(name, null);
            assert.notEqual(name, undefined);
        })
    })

    describe('products', async () => {
        let result, productCount;

        before(async () => {
            result = await marketplace.createProduct('product1', web3.utils.toWei('1', 'Ether'), { from: seller });
            productCount = await marketplace.productCount();
        })

        it('creates products', async () => {
            // SUCCESS
            assert.equal(productCount, 1);
            
            const event = result.logs[0].args;

            assert.equal(event.id.toNumber(), productCount.toNumber(), 'id is correct');
            assert.equal(event.name, 'product1', 'name is correct');
            assert.equal(event.price, '1000000000000000000', 'price is correct');
            assert.equal(event.owner, seller, 'owner is correct');
            assert.equal(event.purchased, false, 'purchased is correct');

            // FAILURE: Product must have a name
            await marketplace.createProduct('', web3.utils.toWei('1', 'Ether'), { from: seller }).should.be.rejected;

            // FAILURE: Product must have a price
            await marketplace.createProduct('product1', 0, { from: seller }).should.be.rejected;
        })

        it('lists products', async () => {
            const product = await marketplace.products(productCount);

            assert.equal(product.name, 'product1', 'name is correct');
            assert.equal(product.price, '1000000000000000000', 'price is correct');
            assert.equal(product.owner, seller, 'owner is correct');
            assert.equal(product.purchased, false, 'purchased is correct');
            assert.equal(product.id.toNumber(), productCount.toNumber(), 'id is correct');
        })

        it('sells products', async () => {
            // Track the seller balance before purchase
            let previousSellerBalance;
            previousSellerBalance = await web3.eth.getBalance(seller);
            previousSellerBalance = new web3.utils.BN(previousSellerBalance);

            // SUCCESS: Buyer makes purchase
            result = await marketplace.purchaseProduct(productCount, { from: buyer, value: web3.utils.toWei('1', 'Ether') });
            
            // Check logs
            const event = result.logs[0].args;

            assert.equal(event.id.toNumber(), productCount.toNumber(), 'id is correct');
            assert.equal(event.name, 'product1', 'name is correct');
            assert.equal(event.price, '1000000000000000000', 'price is correct');
            assert.equal(event.owner, buyer, 'owner is correct');
            assert.equal(event.purchased, true, 'purchased is correct');

            // Check that the seller recieved the funds
            let newSellerBalance;
            newSellerBalance = await web3.eth.getBalance(seller);
            newSellerBalance = new web3.utils.BN(newSellerBalance);

            let price;
            price = web3.utils.toWei('1', 'Ether');
            price = new web3.utils.BN(price);

            const expectedBalance = previousSellerBalance.add(price);

            assert.equal(newSellerBalance.toString(), expectedBalance.toString());

            // FAILURE: Tries to buy a product that does not exist / product must have a valid id
            await marketplace.purchaseProduct(99, { from: buyer, value: web3.utils.toWei('1', 'Ether') }).should.be.rejected;

            // FAILURE: Buyer tries to buy without enough Ether
            await marketplace.purchaseProduct(productCount, { from: buyer, value: web3.utils.toWei('0.5', 'Ether') }).should.be.rejected;

            // FAILURE: Deployer tries to buy the product / product can't be purchased twice
            await marketplace.purchaseProduct(productCount, { from: deployer, value: web3.utils.toWei('1', 'Ether') }).should.be.rejected;

            // Buyer tries to buy again / buyer can't be the seller
            await marketplace.purchaseProduct(productCount, { from: seller, value: web3.utils.toWei('0.5', 'Ether') }).should.be.rejected;
        })
    })
})