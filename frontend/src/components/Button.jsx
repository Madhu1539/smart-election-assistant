/**
 * Button.jsx — Reusable gradient button component
 */
import './Button.css';

/**
 * @param {string} variant - 'primary' | 'secondary' | 'accent' | 'ghost' | 'danger'
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {boolean} loading - Show loading spinner
 * @param {boolean} fullWidth - Take full container width
 * @param {string} icon - Emoji or icon to show before label
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  icon,
  onClick,
  disabled,
  type = 'button',
  className = '',
  id,
}) {
  const classes = [
    'btn-component',
    `btn-variant-${variant}`,
    `btn-size-${size}`,
    fullWidth ? 'btn-full' : '',
    loading ? 'btn-loading' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      id={id}
    >
      {loading ? (
        <>
          <span className="btn-spinner" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {icon && <span className="btn-icon">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
}

export default Button;
