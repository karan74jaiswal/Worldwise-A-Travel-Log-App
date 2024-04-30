import styles from "./User.module.css";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { signoutUser } from "../utils/firebase";
function User() {
  const navigate = useNavigate();
  const { userObject: user, userData } = useAuth();
  function handleClick() {
    signoutUser();
    navigate("/");
  }
  if (!user || !userData) return;
  return (
    <div className={styles.user}>
      {user.photoURL && <img src={user.photoURL} alt={user.displayName} />}
      <span>
        Welcome, {(user.displayName || userData.fullName)?.split(" ")?.[0]}
      </span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;
