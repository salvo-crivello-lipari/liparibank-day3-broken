import { memo } from 'react';
import styles from './FilterPanel.module.css';

export interface Filters {
  type: 'all' | 'credit' | 'debit';
  searchText: string;
}

interface FilterPanelProps {
  filters: Filters;
  onTypeChange: (type: Filters['type']) => void;
  onSearchChange: (text: string) => void;
  onReset: () => void;
}

const FilterPanel = memo(({ filters, onTypeChange, onSearchChange, onReset }: FilterPanelProps) => {
  console.log('FilterPanel re-rendered');

  return (
    <div className={styles.panel}>
      <div className={styles.typeGroup}>
        {(['all', 'credit', 'debit'] as const).map((t) => (
          <button
            key={t}
            className={`${styles.typeBtn} ${filters.type === t ? styles.active : ''}`}
            onClick={() => onTypeChange(t)}
          >
            {t === 'all' ? 'Tutti' : t === 'credit' ? 'Accrediti' : 'Addebiti'}
          </button>
        ))}
      </div>

      <div className={styles.searchRow}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Cerca per descrizione..."
          value={filters.searchText}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <button className={styles.resetBtn} onClick={onReset}>
          Azzera filtri
        </button>
      </div>
    </div>
  );
});

FilterPanel.displayName = 'FilterPanel';

export default FilterPanel;
