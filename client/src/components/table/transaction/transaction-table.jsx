import React from 'react';
import { TableRow, TransactionTableContainer } from './transaction-table.style';

const TRANSACTION_DATA = [
  {
    seller: "user1",
    buyer: "user2",
    amount: 100,
    date: "2025-03-25",
  },
  {
    seller: "user1",
    buyer: "user2",
    amount: 100,
    date: "2025-03-25",
  },
  {
    seller: "user1",
    buyer: "user2",
    amount: 100,
    date: "2025-03-25",
  },
];

const TransactionTable = ({data}) => {

  return (
    <TransactionTableContainer>
      <TableRow className="tableHeader">
        <span>Seller</span>
        <span>Buyer</span>
        <span>Amount</span>
        <span>Date</span>
      </TableRow>
      {TRANSACTION_DATA.map((v, i) => (
        <TableRow className="tableBody">
          <span>{v.seller}</span>
          <span>{v.buyer}</span>
          <span>{v.amount}</span>
          <span>{v.date}</span>
        </TableRow>
      ))}
    </TransactionTableContainer>
  );
};

export default TransactionTable;