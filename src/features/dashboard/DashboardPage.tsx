import { useState, useEffect } from 'react';
import TransactionList from './components/TransactionList/TransactionList';
import styles from './DashboardPage.module.css';

const DashboardPage = () => {
  const [balance, setBalance] = useState(4250.0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBalance((prev) => {
        const delta = Math.round((Math.random() * 200 - 100) * 100) / 100;
        return Math.round((prev + delta) * 100) / 100;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(value);

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <div>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.subtitle}>Panoramica dei tuoi movimenti bancari</p>
        </div>
        <div className={styles.balancePill}>
          <span className={styles.balanceLabel}>Saldo live</span>
          <span className={styles.balanceValue}>{formatCurrency(balance)}</span>
        </div>
      </div>

      <TransactionList />
    </div>
  );
};

export default DashboardPage;
