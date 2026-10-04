import { memo, useMemo } from 'react';
import type { Transaction } from '../TransactionItem/TransactionItem';
import styles from './TransactionStats.module.css';

type TransactionStatsProps = {
	transactions: Transaction[];
};

const formatCurrency = (value: number) =>
	new Intl.NumberFormat('it-IT', {
		style: 'currency',
		currency: 'EUR',
	}).format(value);

const TransactionStats = ({ transactions }: TransactionStatsProps) => {
	const stats = useMemo(() => {
		const income = transactions.filter((tx) => tx.type === 'credit').reduce((sum, tx) => sum + tx.amount, 0);
		const expenses = transactions.filter((tx) => tx.type === 'debit').reduce((sum, tx) => sum + tx.amount, 0);
		const average =
			transactions.length > 0 ? transactions.reduce((sum, tx) => sum + tx.amount, 0) / transactions.length : 0;

		return {
			count: transactions.length,
			income,
			expenses,
			average,
		};
	}, [transactions]);

	return (
		<div className={styles.stats}>
			<div className={styles.card}>
				<span className={styles.label}>Transazioni</span>
				<span className={styles.value}>{stats.count}</span>
			</div>

			<div className={styles.card}>
				<span className={styles.label}>Entrate</span>
				<span className={styles.value}>{formatCurrency(stats.income)}</span>
			</div>

			<div className={styles.card}>
				<span className={styles.label}>Uscite</span>
				<span className={styles.value}>{formatCurrency(stats.expenses)}</span>
			</div>

			<div className={styles.card}>
				<span className={styles.label}>Importo medio</span>
				<span className={styles.value}>{formatCurrency(stats.average)}</span>
			</div>
		</div>
	);
};

export default memo(TransactionStats);
