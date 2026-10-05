import { useCallback, useMemo, useReducer } from 'react';
import { Transaction } from '../components/TransactionItem/TransactionItem';
import { useDebounce } from '../../../hooks/useDebounce';

export type TDateRange = {
	from: string;
	to: string;
};

export type TAmountRange = {
	min: number | null;
	max: number | null;
};

export type TFilters = {
	searchText: string;
	type: 'all' | Transaction['type'];
	dateRange: TDateRange;
	amountRange: TAmountRange;
	sortBy: 'date' | 'amount';
	sortOrder: 'asc' | 'desc';
};

const defaultFilters: TFilters = {
	type: 'all',
	searchText: '',
	dateRange: {
		from: '',
		to: '',
	},
	amountRange: {
		min: null,
		max: null,
	},
	sortBy: 'date',
	sortOrder: 'desc',
};

type FilterAction =
	| { type: 'SET_TYPE'; payload: TFilters['type'] }
	| { type: 'SET_SEARCH'; payload: TFilters['searchText'] }
	| { type: 'SET_DATE_RANGE'; payload: TFilters['dateRange'] }
	| { type: 'SET_AMOUNT_RANGE'; payload: TFilters['amountRange'] }
	| { type: 'SET_SORT_BY'; payload: TFilters['sortBy'] }
	| { type: 'SET_SORT_ORDER'; payload: TFilters['sortOrder'] }
	| { type: 'RESET' };

const filterReducer = (state: TFilters, action: FilterAction): TFilters => {
	switch (action.type) {
		case 'SET_TYPE':
			return {
				...state,
				type: action.payload,
			};

		case 'SET_SEARCH':
			return {
				...state,
				searchText: action.payload,
			};

		case 'SET_DATE_RANGE':
			return {
				...state,
				dateRange: action.payload,
			};

		case 'SET_AMOUNT_RANGE':
			return {
				...state,
				amountRange: action.payload,
			};

		case 'SET_SORT_BY':
			return {
				...state,
				sortBy: action.payload,
			};

		case 'SET_SORT_ORDER':
			return {
				...state,
				sortOrder: action.payload,
			};

		case 'RESET':
			return {
				...defaultFilters,
			};

		default:
			return state;
	}
};

export function useFilters(transactions: Transaction[]) {
	const [filters, dispatch] = useReducer(filterReducer, defaultFilters);

	const debouncedSearchText = useDebounce(filters.searchText, 300);

	const filteredTransactions = useMemo(() => {
		const filtered = transactions.filter((tx) => {
			const matchesType = filters.type === 'all' || tx.type === filters.type;
			const matchesSearch = tx.description.toLowerCase().includes(debouncedSearchText.toLowerCase());
			const matchesDateFrom = !filters.dateRange.from || tx.date >= filters.dateRange.from;
			const matchesDateTo = !filters.dateRange.to || tx.date <= filters.dateRange.to;
			const matchesMinAmount = filters.amountRange.min === null || tx.amount >= filters.amountRange.min;
			const matchesMaxAmount = filters.amountRange.max === null || tx.amount <= filters.amountRange.max;
			return matchesType && matchesSearch && matchesDateFrom && matchesDateTo && matchesMinAmount && matchesMaxAmount;
		});

		return [...filtered].sort((a, b) => {
			const multiplier = filters.sortOrder === 'asc' ? 1 : -1;

			if (filters.sortBy === 'amount') {
				return (a.amount - b.amount) * multiplier;
			}

			return a.date.localeCompare(b.date) * multiplier;
		});
	}, [
		debouncedSearchText,
		filters.amountRange.max,
		filters.amountRange.min,
		filters.dateRange.from,
		filters.dateRange.to,
		filters.sortBy,
		filters.sortOrder,
		filters.type,
		transactions,
	]);

	const total = useMemo(() => {
		return filteredTransactions.reduce((sum, tx) => sum + (tx.type === 'credit' ? tx.amount : -tx.amount), 0);
	}, [filteredTransactions]);

	const handleTypeChange = useCallback((type: TFilters['type']) => {
		dispatch({ type: 'SET_TYPE', payload: type });
	}, []);

	const handleSearchChange = useCallback((text: TFilters['searchText']) => {
		dispatch({ type: 'SET_SEARCH', payload: text });
	}, []);

	const handleResetFilters = useCallback(() => {
		dispatch({ type: 'RESET' });
	}, []);

	const handleDateRangeChange = useCallback((dateRange: TFilters['dateRange']) => {
		dispatch({
			type: 'SET_DATE_RANGE',
			payload: dateRange,
		});
	}, []);

	const handleAmountRangeChange = useCallback((amountRange: TFilters['amountRange']) => {
		dispatch({
			type: 'SET_AMOUNT_RANGE',
			payload: amountRange,
		});
	}, []);

	const handleSortByChange = useCallback((sortBy: TFilters['sortBy']) => {
		dispatch({
			type: 'SET_SORT_BY',
			payload: sortBy,
		});
	}, []);

	const handleSortOrderChange = useCallback((sortOrder: TFilters['sortOrder']) => {
		dispatch({
			type: 'SET_SORT_ORDER',
			payload: sortOrder,
		});
	}, []);

	return {
		filters,
		total,
		filteredTransactions,
		handleTypeChange,
		handleSearchChange,
		handleDateRangeChange,
		handleAmountRangeChange,
		handleSortByChange,
		handleSortOrderChange,
		handleResetFilters,
	};
}
