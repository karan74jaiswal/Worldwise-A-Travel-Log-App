import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import SigninForm from "../components/SigninForm";
import SignupForm from "../components/SignupForm";
export default function Login() {
  const navigate = useNavigate();
  const { userObject: user } = useAuth();

  useEffect(() => {
    if (user) navigate("/app", { replace: true });
  }, [user, navigate]);

  return (
    <main className={styles.login}>
      <PageNav />
      <section className={styles.formSection}>
        <SigninForm />
        <SignupForm />
      </section>
    </main>
  );
}
