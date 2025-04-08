import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from '../../styles/Navbar.module.css';

const Navbar = () => {
  const { user, logout } = useAuth();  // שימוש ב-AuthContext

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">מערכת מיפוי קשישים</Link>
      </div>
      <div className={styles.links}>
        {user ? (
          <>
            <Link to="/dashboard">לוח בקרה</Link>
            <Link to="/map">מפה</Link>
            <Link to="/elderly">קשישים</Link>
            <Link to="/visits">ביקורים</Link>
            <button onClick={logout}>התנתק</button>
            <span>שלום, {user.firstName}</span>
          </>
        ) : (
          <>
            <Link to="/login">התחברות</Link>
            <Link to="/register">הרשמה</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 