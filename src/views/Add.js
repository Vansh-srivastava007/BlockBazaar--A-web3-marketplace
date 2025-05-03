import React from 'react';
import AddProductForm from '../components/AddProduct.js'
import { motion } from 'framer-motion';

const Add = ({ createProduct }) => {
  return (
    <motion.div exit={{ opacity: 0 }} animate={{ opacity: 1 }} initial={{ opacity: 0 }} className="row h-100">
      <div className="col-12 my-auto">
        <AddProductForm createProduct={createProduct} />
      </div>
    </motion.div>
  );
};

export default Add;