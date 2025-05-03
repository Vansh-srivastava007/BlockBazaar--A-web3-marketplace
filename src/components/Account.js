import React, { Component } from 'react';

class MyAccount extends Component {
    render() {
        return (
            <div className="text-center">
                <h1 className="mb-5">My Owned Products</h1>

                <table className="table mb-5">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>

                            <th scope="col">Price</th>

                            <th scope="col">Owner</th>

                            <th scope="col"></th>
                        </tr>
                    </thead>

                    
                    <tbody id="productList">
                        { this.props.products
                            .filter(products => products.owner === this.props.account && products.purchased )
                            .map((product, key) => {
                            return (
                                <tr key={key}>
                                    <td>{product.name}</td>

                                    <td><i className="fab fa-ethereum text-warning"></i> {window.web3.utils.fromWei(product.price.toString(), 'Ether')}</td>

                                    <td className="text-muted">{product.owner}</td>

                                    <td>
                                        { !product.purchased && this.props.account !== product.owner ?
                                            <button
                                                name={product.id}
                                                value={product.price}
                                                onClick={(event) => {
                                                    this.props.purchaseProduct(event.target.name, event.target.value)
                                            }}>
                                                Buy
                                            </button> :
                                            null
                                        }
                                    </td>
                                </tr>
                            )
                        }) }
                    </tbody>
                </table>
                
                <h1 className="mb-5">My Listed Products</h1>
                
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>

                            <th scope="col">Price</th>

                            <th scope="col">Owner</th>

                            <th scope="col"></th>
                        </tr>
                    </thead>

                    
                    <tbody id="productList">
                        { this.props.products
                            .filter(products => products.owner === this.props.account && !products.purchased )
                            .map((product, key) => {
                            return (
                                <tr key={key}>
                                    <td>{product.name}</td>

                                    <td><i className="fab fa-ethereum text-warning"></i> {window.web3.utils.fromWei(product.price.toString(), 'Ether')}</td>

                                    <td className="text-muted">{product.owner}</td>

                                    <td>
                                        { !product.purchased && this.props.account !== product.owner ?
                                            <button
                                                name={product.id}
                                                value={product.price}
                                                onClick={(event) => {
                                                    this.props.purchaseProduct(event.target.name, event.target.value)
                                            }}>
                                                Buy
                                            </button> :
                                            null
                                        }
                                    </td>
                                </tr>
                            )
                        }) }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default MyAccount;