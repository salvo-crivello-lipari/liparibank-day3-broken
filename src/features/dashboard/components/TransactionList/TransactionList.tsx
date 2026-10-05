import FilterPanel from '../FilterPanel/FilterPanel';
import TransactionItem, { type Transaction } from '../TransactionItem/TransactionItem';
import styles from './TransactionList.module.css';
import TransactionStats from '../transactionsStats/TransactionStats';
import { useFilters } from '../../hooks/useTransactionsFilter';

const creditDescriptions = [
	'Stipendio Novembre',
	'Stipendio Dicembre',
	'Rimborso spese aziendali',
	'Bonifico da Mario Bianchi',
	'Interessi conto deposito',
	'Cashback carta credito',
	'Dividendi azioni Enel',
	'Rimborso assicurazione',
	'Accredito pensione',
	'Bonifico da Luca Ferrari',
];

const debitDescriptions = [
	'Affitto mensile',
	'Supermercato Conad',
	'Bolletta Enel',
	'Bolletta Gas Italgas',
	'Abbonamento Netflix',
	'Farmacia San Marco',
	'Ristorante Al Porto',
	'Rifornimento carburante',
	'Assicurazione auto AXA',
	'Palestra FitLife',
	'Abbonamento Spotify',
	'Visita medica specialistica',
	'Manutenzione auto',
	'Spesa online Amazon',
];

function generateTransactions(count: number): Transaction[] {
	return Array.from({ length: count }, (_, i) => {
		const isCredit = (i * 7 + 3) % 10 > 3;
		const type = isCredit ? ('credit' as const) : ('debit' as const);
		const descList = isCredit ? creditDescriptions : debitDescriptions;
		const desc = descList[i % descList.length];
		const description = i >= descList.length ? `${desc} #${Math.floor(i / descList.length) + 1}` : desc;
		const amount = isCredit
			? Math.round((((i * 137.5) % 2000) + 150) * 100) / 100
			: Math.round((((i * 83.3) % 450) + 20) * 100) / 100;
		const month = Math.floor(i / 5) % 12;
		const day = (i % 28) + 1;
		const date = new Date(2024, month, day).toISOString().split('T')[0];
		return { id: `tx-${String(i + 1).padStart(3, '0')}`, description, amount, date, type };
	});
}

const allTransactions = generateTransactions(50);

// ============================================================================

const TransactionList = () => {
	const {
		filteredTransactions,
		filters,
		handleAmountRangeChange,
		handleDateRangeChange,
		handleResetFilters,
		handleSearchChange,
		handleSortByChange,
		handleSortOrderChange,
		handleTypeChange,
		total,
	} = useFilters(allTransactions);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h3 className={styles.title}>Lista Movimenti</h3>
				<span className={styles.count}>{filteredTransactions.length} movimenti</span>
			</div>

			<FilterPanel
				filters={filters}
				onTypeChange={handleTypeChange}
				onSearchChange={handleSearchChange}
				onDateRangeChange={handleDateRangeChange}
				onAmountRangeChange={handleAmountRangeChange}
				onSortByChange={handleSortByChange}
				onSortOrderChange={handleSortOrderChange}
				onReset={handleResetFilters}
			/>

			<TransactionStats transactions={filteredTransactions} />

			<div className={styles.totalRow}>
				<span className={styles.totalLabel}>Saldo periodo filtrato:</span>
				<span className={`${styles.totalValue} ${total >= 0 ? styles.positive : styles.negative}`}>
					{new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(total)}
				</span>
			</div>

			<ul className={styles.list}>
				{filteredTransactions.map((tx) => (
					<TransactionItem key={tx.id} transaction={tx} />
				))}
			</ul>
		</div>
	);
};

export default TransactionList;
