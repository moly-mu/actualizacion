// src/components/TransactionList.jsx
import React from 'react';
import { useExpenseContext } from '../context/ExpenseContext';

const TransactionList = ({ setCurrentTransaction }) => {
  const { state, dispatch } = useExpenseContext();

  return (
    <ul>
      {state.transactions.map(transaction => (
        <li key={transaction.id}>
          {transaction.description}: ${transaction.amount}
          <button onClick={() => setCurrentTransaction(transaction)}>Editar</button>
          <button onClick={() => dispatch({ type: 'DELETE_TRANSACTION', payload: transaction.id })}>Eliminar</button>
        </li>
      ))}
    </ul>
  );
};

export default TransactionList;
