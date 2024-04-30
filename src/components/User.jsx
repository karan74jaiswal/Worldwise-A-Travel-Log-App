import styles from "./User.module.css";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { signoutUser } from "../utils/firebase";
function User() {
  const navigate = useNavigate();
  const { userObject: user } = useAuth();

  function handleClick() {
    signoutUser();
    navigate("/");
  }
  if (!user) return;
  return (
    <div className={styles.user}>
      {/* {user.photoURL && <img src={user.photoURL} alt={user.displayName} />} */}
      <span>Welcome, {user.displayName.split(" ")[0]}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;

/*
CHALLENGE

1) Add `AuthProvider` to `App.jsx`
2) In the `Login.jsx` page, call `login()` from context
3) Inside an effect, check whether `isAuthenticated === true`. If so, programatically navigate to `/app`
4) In `User.js`, read and display logged in user from context (`user` object). Then include this component in `AppLayout.js`
5) Handle logout button by calling `logout()` and navigating back to `/`
*/
