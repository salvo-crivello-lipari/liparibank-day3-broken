import styles from './Button.module.css';

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
}

const Button = ({ label, onClick, variant = 'primary', disabled = false }: ButtonProps) => (
  <button
    className={`${styles.button} ${styles[variant]}`}
    onClick={onClick}
    type="button"
    disabled={disabled}
  >
    {label}
  </button>
);

export default Button;
