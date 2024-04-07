import styles from "./Button.module.css";
function Button({ children, onClick, type }) {
  const className =
    type === "primary"
      ? styles.primary
      : type === "back"
      ? styles.back
      : styles.position;
  return (
    <button className={`${styles.btn} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
