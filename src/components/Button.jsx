import styles from "./Button.module.css";
function Button({ children, onClick, type }) {
  const className =
    type === "primary"
      ? styles.primary
      : type === "back"
      ? styles.back
      : type === "google"
      ? styles.google
      : styles.position;
  return (
    <button
      className={`${styles.btn} ${className}`}
      type={type === "google" ? "button" : "submit"}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
