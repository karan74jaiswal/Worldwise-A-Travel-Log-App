import { useState } from "react";
import styles from "../pages/Login.module.css";
import Button from "../components/Button";
import { signUpWithEmail, createNewUserDocument } from "../utils/firebase";
import { useAuth } from "../contexts/AuthContext";
function SignupForm() {
  const { userObject } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = function (e) {
    e.preventDefault();
    if (!fullName || !email || !password) return;
    signUpWithEmail(email, password);
    createNewUserDocument(userObject.uid, fullName);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="fullName">Your Name</label>
        <input
          type="text"
          id="fullName"
          onChange={(e) => setFullName(e.target.value)}
          value={fullName}
        />
      </div>
      <div className={styles.row}>
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>

      <div>
        <Button type="primary">Signup</Button>
      </div>
    </form>
  );
}

export default SignupForm;
