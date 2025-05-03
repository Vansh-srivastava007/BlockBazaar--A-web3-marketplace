import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = props => {
  return (
    <motion.div exit={{ opacity: 0 }} animate={{ opacity: 1 }} initial={{ opacity: 0 }} className="row h-100">
      <div className="col-6 my-auto">
        <h1>
          <strong>
            <span className="text-warning">blockBay</span> is a fully decentralised blockchain marketplace
          </strong>
        </h1>

        <h6 className="text-secondary pt-3">
            List, browse and purchase items in our unique marketplace dApp secured on the Ethereum blockchain
        </h6>

        { props.account ?
          <div className="row pt-3">
            <motion.div exit={{ opacity: 0 }} animate={{ opacity: 1 }} initial={{ opacity: 0 }} className="col-3">
              <Link to="/Add"><button className="btn btn-warning text-white pill shadown-sm">List Product</button></Link>
            </motion.div>

            <motion.div exit={{ opacity: 0 }} animate={{ opacity: 1 }} initial={{ opacity: 0 }} className="col-3">
              <Link to="/Products"><button className="btn bg-white text-warning border pill shadown-sm">Explore</button></Link>
            </motion.div>

            <div className="col-3"></div>
          </div> :
          null
        }
      </div>
      
      <div className="col-6 my-auto">
        <div id="blockBay-home-page"></div>
      </div>
    </motion.div>
  );
};

export default Home;