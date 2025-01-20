// src/components/TransactionForm.jsx
import React, { useState, useEffect } from 'react';
import { useExpenseContext } from '../context/ExpenseContext';

const TransactionForm = ({ currentTransaction, setCurrentTransaction, exchangeRate }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('EUR'); // Moneda por defecto
  const { dispatch } = useExpenseContext();

  useEffect(() => {
    if (currentTransaction) {
      setDescription(currentTransaction.description);
      setAmount(currentTransaction.amount);
      setCurrency('EUR'); // Restablecer a una moneda por defecto al editar
    } else {
      setDescription('');
      setAmount('');
    }
  }, [currentTransaction]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      id: currentTransaction ? currentTransaction.id : Date.now(),
      description,
      amount: parseFloat(amount),
    };

    if (currentTransaction) {
      dispatch({ type: 'EDIT_TRANSACTION', payload: newTransaction });
      setCurrentTransaction(null);
    } else {
      dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });
    }

    setDescription('');
    setAmount('');
  };

  const handleConvert = (amount, currency) => {
    if (exchangeRate[currency]) {
      return (amount * exchangeRate[currency]).toFixed(2); // Devuelve el monto convertido
    }
    return amount; // Retorna el monto original si la tasa no está disponible
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Monto"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        {Object.keys(exchangeRate).map((key) => (
          <option key={key} value={key}>{key}</option>
        ))}
      </select>
      <div>
        Monto convertido ({currency}): ${handleConvert(amount, currency)}
      </div>
      <button type="submit">{currentTransaction ? 'Editar' : 'Agregar'} Transacción</button>
    </form>
  );
};

export default TransactionForm;
