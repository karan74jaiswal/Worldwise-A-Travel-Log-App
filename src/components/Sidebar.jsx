import styles from "../components/Sidebar.module.css";
import Logo from "./Logo";
import AppNav from "./AppNav";
import { Outlet } from "react-router-dom";
function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      {/* <p>👋 Add your first city by clicking on a city on the map</p> */}
      <Outlet />
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          © Copyright {new Date().getFullYear()} by WorldWise Inc.
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;
