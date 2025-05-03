import React from 'react';
import MyAccount from '../components/Account.js'
import { motion } from 'framer-motion';

const Account = ({ account, products }) => {
  return (
    <motion.div exit={{ opacity: 0 }} animate={{ opacity: 1 }} initial={{ opacity: 0 }} className="row h-100 mt-5">
      <div className="col-12">
        <MyAccount
            products={products}
            account={account}
        />
      </div>
    </motion.div>
  );
};

export default Account;