import React, { Component } from 'react';

class AddProductForm extends Component {
    render() {
        return (
            <div className="row text-center">
                <div className="col-3"></div>

                <div className="col-6">
                    <h1 className="mb-5">Add Product</h1>
                    
                    <form onSubmit={(event) => {
                        event.preventDefault()
                        const name = this.productName.value
                        const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
                        this.props.createProduct(name, price)
                    }}>
                        <div className="form-group mr-sm-2">
                            <input
                            id="productName"
                            type="text"
                            ref={(input) => { this.productName = input }}
                            className="form-control"
                            placeholder="Product Name"
                            required />
                        </div>
            
                        <div className="form-group mr-sm-2">
                            <input
                            id="productPrice"
                            type="text"
                            ref={(input) => { this.productPrice = input }}
                            className="form-control"
                            placeholder="Product Price"
                            required />
                        </div>
            
                        <button type="submit" className="text-white btn btn-warning mt-5">Add Product</button>
                    </form>
                </div>

                <div className="col-3"></div>
            </div>
        )
    }
}

export default AddProductForm;