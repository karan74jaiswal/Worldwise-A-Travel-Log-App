import { useState } from "react";
import styles from "../pages/Login.module.css";
import Button from "../components/Button";
import { signinWithGoogle, signinWithEmail } from "../utils/firebase";
import { Link } from "react-router-dom";
function SigninForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = function (e) {
    e.preventDefault();
    if (!email || !password) return;
    signinWithEmail(email, password);
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
      <Link className={styles.formSwitch} to="signup">
        Not a User? Signup!
      </Link>
    </form>
  );
}

export default SigninForm;
