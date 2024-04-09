import Sidebar from "../components/Sidebar";
import Map from "../components/Map";
import styles from "./AppLayout.module.css";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function AppLayout() {
  const { isUserAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserAuthenticated) navigate("/");
  }, [isUserAuthenticated, navigate]);

  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  );
}

export default AppLayout;
