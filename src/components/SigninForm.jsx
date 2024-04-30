import { useState } from "react";
import styles from "../pages/Login.module.css";
import Button from "../components/Button";
import { useAuth } from "../contexts/AuthContext";
import { signinWithGoogle, signinWithEmail } from "../utils/firebase";
function SigninForm() {
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const handleSubmit = function (e) {
    e.preventDefault();
    if (!email || !password) return;
    signinWithEmail(email, password);
    // login(email, password);
  };
  const handleGoogleSignin = function (e) {
    e.preventDefault();
    signinWithGoogle();
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="signinemail">Email address</label>
        <input
          type="email"
          id="signinemail"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="signinpassword">Password</label>
        <input
          type="password"
          id="signinpassword"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>

      <div className={styles.loginButtonsContainer}>
        <Button type="primary">Login</Button>
        <Button type="google" onClick={handleGoogleSignin}>
          Sign in with Google
        </Button>
      </div>
    </form>
  );
}

export default SigninForm;
