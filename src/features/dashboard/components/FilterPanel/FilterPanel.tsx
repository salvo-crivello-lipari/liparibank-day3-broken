import { memo } from 'react';
import styles from './FilterPanel.module.css';
import { TFilters } from '../../hooks/useTransactionsFilter';

interface FilterPanelProps {
	filters: TFilters;
	onTypeChange: (type: TFilters['type']) => void;
	onSearchChange: (text: TFilters['searchText']) => void;
	onDateRangeChange: (dateRange: TFilters['dateRange']) => void;
	onAmountRangeChange: (amountRange: TFilters['amountRange']) => void;
	onSortByChange: (sortBy: TFilters['sortBy']) => void;
	onSortOrderChange: (sortOrder: TFilters['sortOrder']) => void;
	onReset: () => void;
}

const FilterPanel = memo(
	({
		filters,
		onTypeChange,
		onSearchChange,
		onDateRangeChange,
		onAmountRangeChange,
		onSortByChange,
		onSortOrderChange,
		onReset,
	}: FilterPanelProps) => {
		console.log('FilterPanel re-rendered');

		return (
			<div className={styles.panel}>
				<div className={styles.typeGroup}>
					{(['all', 'credit', 'debit'] as const).map((type) => (
						<button
							key={type}
							type="button"
							className={`${styles.typeBtn} ${filters.type === type ? styles.active : ''}`}
							onClick={() => onTypeChange(type)}
						>
							{type === 'all' ? 'Tutti' : type === 'credit' ? 'Accrediti' : 'Addebiti'}
						</button>
					))}
				</div>

				<div className={styles.searchRow}>
					<input
						id="transaction-search"
						className={styles.searchInput}
						type="search"
						placeholder="Cerca per descrizione..."
						value={filters.searchText}
						onChange={(event) => onSearchChange(event.target.value)}
						aria-label="Cerca transazioni per descrizione"
					/>

					<button type="button" className={styles.resetBtn} onClick={onReset}>
						Azzera filtri
					</button>
				</div>

				<div className={styles.filtersRow}>
					<div className={styles.filterGroup}>
						<span className={styles.filterLabel}>Data</span>

						<div className={styles.dateRange}>
							<div className={styles.filterGroup}>
								<label className={styles.filterLabel} htmlFor="date-from">
									Da
								</label>

								<input
									id="date-from"
									className={styles.filterInput}
									type="date"
									value={filters.dateRange.from}
									onChange={(event) =>
										onDateRangeChange({
											...filters.dateRange,
											from: event.target.value,
										})
									}
								/>
							</div>

							<div className={styles.filterGroup}>
								<label className={styles.filterLabel} htmlFor="date-to">
									A
								</label>

								<input
									id="date-to"
									className={styles.filterInput}
									type="date"
									value={filters.dateRange.to}
									onChange={(event) =>
										onDateRangeChange({
											...filters.dateRange,
											to: event.target.value,
										})
									}
								/>
							</div>
						</div>
					</div>

					<div className={styles.filterGroup}>
						<span className={styles.filterLabel}>Importo</span>

						<div className={styles.amountRange}>
							<div className={styles.filterGroup}>
								<label className={styles.filterLabel} htmlFor="amount-min">
									Minimo
								</label>

								<input
									id="amount-min"
									className={styles.filterInput}
									type="number"
									min="0"
									placeholder="Min"
									value={filters.amountRange.min ?? ''}
									onChange={(event) =>
										onAmountRangeChange({
											...filters.amountRange,
											min: event.target.value === '' ? null : Number(event.target.value),
										})
									}
								/>
							</div>

							<div className={styles.filterGroup}>
								<label className={styles.filterLabel} htmlFor="amount-max">
									Massimo
								</label>

								<input
									id="amount-max"
									className={styles.filterInput}
									type="number"
									min="0"
									placeholder="Max"
									value={filters.amountRange.max ?? ''}
									onChange={(event) =>
										onAmountRangeChange({
											...filters.amountRange,
											max: event.target.value === '' ? null : Number(event.target.value),
										})
									}
								/>
							</div>
						</div>
					</div>
				</div>

				<div className={styles.sortRow}>
					<div className={styles.sortGroup}>
						<label className={styles.filterLabel} htmlFor="sort-by">
							Ordina per
						</label>

						<select
							id="sort-by"
							className={styles.sortSelect}
							value={filters.sortBy}
							onChange={(event) => onSortByChange(event.target.value as TFilters['sortBy'])}
						>
							<option value="date">Data</option>
							<option value="amount">Importo</option>
						</select>
					</div>

					<div className={styles.sortGroup}>
						<label className={styles.filterLabel} htmlFor="sort-order">
							Ordinamento
						</label>

						<select
							id="sort-order"
							className={styles.sortSelect}
							value={filters.sortOrder}
							onChange={(event) => onSortOrderChange(event.target.value as TFilters['sortOrder'])}
						>
							<option value="desc">Decrescente</option>
							<option value="asc">Crescente</option>
						</select>
					</div>
				</div>
			</div>
		);
	},
);

FilterPanel.displayName = 'FilterPanel';

export default FilterPanel;
