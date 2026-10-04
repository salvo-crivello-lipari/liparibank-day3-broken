import { useCallback, useMemo, useReducer } from 'react';
import FilterPanel, { type Filters } from '../FilterPanel/FilterPanel';
import TransactionItem, { type Transaction } from '../TransactionItem/TransactionItem';
import styles from './TransactionList.module.css';
import TransactionStats from '../transactionsStats/TransactionStats';

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

const defaultFilters: Filters = { type: 'all', searchText: '' };

// ============================================================================

type FilterAction =
	| { type: 'SET_TYPE'; payload: Filters['type'] }
	| { type: 'SET_SEARCH'; payload: string }
	| { type: 'RESET' };

const filterReducer = (state: Filters, action: FilterAction): Filters => {
	switch (action.type) {
		case 'SET_TYPE':
			return { ...state, type: action.payload };

		case 'SET_SEARCH':
			return { ...state, searchText: action.payload };

		case 'RESET':
			return defaultFilters;

		default:
			return state;
	}
};

// ============================================================================

const TransactionList = () => {
	const [filters, dispatch] = useReducer(filterReducer, defaultFilters);

	const filteredTransactions = useMemo(() => {
		return allTransactions.filter((tx) => {
			const matchesType = filters.type === 'all' || tx.type === filters.type;
			const matchesSearch = tx.description.toLowerCase().includes(filters.searchText.toLowerCase());

			return matchesType && matchesSearch;
		});
	}, [filters]);

	const total = useMemo(() => {
		return filteredTransactions.reduce((sum, tx) => sum + (tx.type === 'credit' ? tx.amount : -tx.amount), 0);
	}, [filteredTransactions]);

	const handleTypeChange = useCallback((type: Filters['type']) => {
		dispatch({ type: 'SET_TYPE', payload: type });
	}, []);

	const handleSearchChange = useCallback((text: string) => {
		dispatch({ type: 'SET_SEARCH', payload: text });
	}, []);

	const handleResetFilters = useCallback(() => {
		dispatch({ type: 'RESET' });
	}, []);

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
