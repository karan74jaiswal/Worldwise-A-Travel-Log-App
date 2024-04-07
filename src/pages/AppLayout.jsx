// import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Map from "../components/Map";
import styles from "./AppLayout.module.css";

function AppLayout() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   navigate("cities");
  // }, []);
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  );
}

export default AppLayout;
