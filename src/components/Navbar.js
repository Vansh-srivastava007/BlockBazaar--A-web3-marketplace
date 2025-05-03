import React, { Component } from 'react';
import metamask from '../metamask.svg';

import { NavLink } from 'react-router-dom';

class Navbar extends Component {

    render() {
        return (
            <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-white shadow py-3 px-3">
                <NavLink to="/"
                    className="navbar-brand p-2 text-white bg-warning brand-radius text-center shadow-sm"
                >
                    blockBay
                </NavLink>

                { this.props.account ?
                    <>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <NavLink to="/Products" className="nav-link">
                                        Products
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/Add" className="nav-link">
                                        Add
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/Account" className="nav-link">
                                        Account
                                    </NavLink>
                                </li>
                            </ul>    
                        </div>
                    </> :
                    <div className="collapse navbar-collapse" id="navbarNav"></div> 
                }

                <div>
                    <img src={metamask} className="metamask-logo" alt="logo" />
                    { this.props.account ?
                        <small className="text-white nav-item bg-warning rounded p-2 shadow-sm">
                            <span id="account">{ this.props.account }</span>
                        </small> :
                        null
                    }
                </div>
            </nav>
        )
    }

}

export default Navbar;