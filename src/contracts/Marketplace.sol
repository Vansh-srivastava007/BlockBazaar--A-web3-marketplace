// Declare solidity version
pragma solidity ^0.5.0;

// Write and name the smart contract
contract Marketplace {
    // Declare the string variable
    string public name;

    uint public productCount = 0;
    mapping(uint => Product) public products;

    // Structure object for the product with declared values
    struct Product {
        uint id;
        string name;
        uint price;
        address payable owner;
        bool purchased;
    }

    // Event object to be triggered within the createProduct() function
    event productCreated(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool purchased
    );

    // Event object to be triggered within the purchaseProduct() function
    event productPurchased(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool purchased
    );

    // All smart contracts need a constructor method
    constructor() public {
        // Assign the value "Marketplace" to the previously declared name variable
        name = "Marketplace";
    }

    // *** OPERATIONS ***

    // Create
    function createProduct(string memory _name, uint _price) public {
        // Require a name
        require(bytes(_name).length > 0);
        // Require a valid price
        require(_price > 0);
        // Increment product count
        productCount++;
        // Create the product
        products[productCount] = Product(productCount, _name, _price, msg.sender, false);
        // Trigger the event 
        emit productCreated(productCount, _name, _price, msg.sender, false);
    }

    // Delete

    // *** //

    function purchaseProduct(uint _id) public payable {
        // Fetch the product
        Product memory _product = products[_id];
        // Fetch the owner
        address payable _seller = _product.owner;
        // Make sure the product is valid (it can be purchased)
        require(_product.id > 0 && _product.id <= productCount);
        // Require that there is enough Ether in the transaction
        require(msg.value >= _product.price);
        // Require that the product has not been purchased
        require(!_product.purchased);
        // Require that the buyer is not the seller
        require(_seller != msg.sender);
        // Purchase the product / transfer ownership to the buyer
        _product.owner = msg.sender;
        // Mark as purchased
        _product.purchased = true;
        // Update the product in the mapping
        products[_id] = _product;
        // Pay the seller by sending them Ether
        address(_seller).transfer(msg.value);
        // Trigger an event
        emit productPurchased(productCount, _product.name, _product.price, msg.sender, true);
    }
}