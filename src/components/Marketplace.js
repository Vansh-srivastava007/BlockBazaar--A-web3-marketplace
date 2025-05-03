import React, { Component } from 'react';

class Marketplace extends Component {
    render() {
        return (
            <div className="row">
                { this.props.products
                    .filter(products => !products.purchased)
                    .map((product, key) => {
                        return (
                            <div className="col-3 mb-3" key={key}>
                                <div className="card pill border-0 bg-warning shadow-sm text-white">
                                    <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>

                                        <h6 className="card-subtitle mb-2"><small>Owner: {product.owner}</small></h6>

                                        <div className="row h-100 mt-5">
                                            <div className="col-6 my-auto">
                                                <p className="card-text my-2"><i className="fab fa-ethereum"></i> {window.web3.utils.fromWei(product.price.toString(), 'Ether')}</p>
                                            </div>
                                            
                                            <div className="col-6 text-right">
                                                { !product.purchased && this.props.account !== product.owner ?
                                                    <button className="btn btn-light pill text-muted"
                                                        name={product.id}
                                                        value={product.price}
                                                        onClick={(event) => {
                                                            this.props.purchaseProduct(event.target.name, event.target.value)
                                                    }}>
                                                        Buy
                                                    </button> :
                                                    null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }) }
            </div>
        )
    }
}

export default Marketplace;