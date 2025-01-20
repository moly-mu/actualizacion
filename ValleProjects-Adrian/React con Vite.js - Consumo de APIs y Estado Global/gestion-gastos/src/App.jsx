// src/App.jsx
import React, { useEffect, useState } from 'react';
import { ExpenseProvider } from './context/ExpenseContext';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import axios from 'axios';

const App = () => {
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const [exchangeRate, setExchangeRate] = useState({});

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD'); // Cambia 'TU_API_URL' por la URL de tu API
        setExchangeRate(response.data.rates); // Ajusta según la estructura de la respuesta
      } catch (error) {
        console.error('Error al obtener la tasa de cambio', error);
      }
    };

    fetchExchangeRate();
  }, []);

  return (
    <ExpenseProvider>
      <h1>Gestión de Gastos</h1>
      <TransactionForm 
        currentTransaction={currentTransaction} 
        setCurrentTransaction={setCurrentTransaction} 
        exchangeRate={exchangeRate} // Pasa exchangeRate al formulario
      />
      <TransactionList setCurrentTransaction={setCurrentTransaction} />
    </ExpenseProvider>
  );
};

export default App;
