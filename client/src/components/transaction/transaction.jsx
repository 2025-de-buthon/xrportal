import React from "react";
import { TransactionContainer } from "./transaction.style";
import TransactionTable from "../table/transaction/transaction-table";

const TransactionComponent = () => {
  return (
    <TransactionContainer>
      <h2>Transcation</h2>
      <TransactionTable />
    </TransactionContainer>
  );
};

export default TransactionComponent;
