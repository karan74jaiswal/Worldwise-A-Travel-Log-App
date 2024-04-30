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
  const profilePicture = user.photoURL || userData.photoURL;
  return (
    <div className={styles.user}>
      {profilePicture && (
        <img src={profilePicture} alt={user.displayName || userData.fullName} />
      )}
      <span>
        Welcome, {(user.displayName || userData.fullName)?.split(" ")?.[0]}
      </span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;
