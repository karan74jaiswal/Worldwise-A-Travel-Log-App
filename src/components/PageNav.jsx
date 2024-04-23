import styles from "./PageNav.module.css";
import Logo from "./Logo";
import { Link, NavLink } from "react-router-dom";
import { memo } from "react";

const PageNav = memo(function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
});

export default PageNav;
