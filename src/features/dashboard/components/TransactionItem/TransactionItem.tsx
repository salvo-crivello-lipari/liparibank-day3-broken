import styles from './TransactionItem.module.css';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: 'credit' | 'debit';
}

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('it-IT', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

  const formatAmount = (amount: number) =>
    new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(amount);

  return (
    <li className={styles.item}>
      <div className={styles.left}>
        <span className={`${styles.badge} ${styles[transaction.type]}`}>
          {transaction.type === 'credit' ? 'Accredito' : 'Addebito'}
        </span>
        <span className={styles.description}>{transaction.description}</span>
      </div>
      <div className={styles.right}>
        <span
          className={`${styles.amount} ${
            transaction.type === 'credit' ? styles.amountCredit : styles.amountDebit
          }`}
        >
          {transaction.type === 'credit' ? '+' : '−'} {formatAmount(transaction.amount)}
        </span>
        <span className={styles.date}>{formatDate(transaction.date)}</span>
      </div>
    </li>
  );
};

export default TransactionItem;
