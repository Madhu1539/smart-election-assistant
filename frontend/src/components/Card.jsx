/**
 * Card.jsx — Reusable card component
 */
import './Card.css';

/**
 * @param {string} className - Additional CSS classes
 * @param {string} variant - 'default' | 'gradient' | 'bordered' | 'elevated'
 * @param {boolean} hoverable - Whether card has hover animation
 * @param {function} onClick - Click handler
 */
function Card({ children, className = '', variant = 'default', hoverable = true, onClick, id }) {
  const classes = [
    'card-component',
    `card-${variant}`,
    hoverable ? 'card-hoverable' : '',
    onClick ? 'card-clickable' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} onClick={onClick} id={id}>
      {children}
    </div>
  );
}

export default Card;
