import React from 'react';
import Marketplace from '../components/Marketplace.js'
import { motion } from 'framer-motion';

const ProductsSale = ({ account, products, purchaseProduct }) => {
  return (
    <motion.div exit={{ opacity: 0 }} animate={{ opacity: 1 }} initial={{ opacity: 0 }} className="row h-100 mt-5">
      <div className="col-12">
        <Marketplace
            products={products}
            account={account}
            purchaseProduct={purchaseProduct}
        />
      </div>
    </motion.div>
  );
};

export default ProductsSale;