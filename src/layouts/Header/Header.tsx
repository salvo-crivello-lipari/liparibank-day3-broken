import { useState } from 'react';
import styles from './Header.module.css';

const NotificationBell = () => {
  const [count, setCount] = useState(2);
  return (
    <button className={styles.bellButton} onClick={() => setCount(0)} aria-label="Notifiche">
      <span className={styles.bellIcon}>🔔</span>
      {count > 0 && <span className={styles.badge}>{count}</span>}
    </button>
  );
};

const Header = () => (
  <header className={styles.header}>
    <div className={styles.logo}>
      <span className={styles.logoIcon}>🏦</span>
      <span className={styles.logoText}>LipariBank</span>
    </div>
    <div className={styles.actions}>
      <NotificationBell />
      <div className={styles.userInfo}>
        <span className={styles.greeting}>Benvenuto,</span>
        <span className={styles.userName}>Mario Rossi</span>
      </div>
    </div>
  </header>
);

export default Header;
