import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from '../../styles/Navbar.module.css';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">מערכת מיפוי קשישים</Link>
      </div>
      
      <div className={styles.links}>
        {user ? (
          <>
            <Link to="/map">מפה</Link>
            
            {/* תפריט ניהול */}
            {(user.role === 'admin' || user.role === 'coordinator') && (
              <div className={styles.dropdown}>
                <button className={styles.dropbtn}>ניהול</button>
                <div className={styles.dropdownContent}>
                  <Link to="/volunteers">מתנדבים</Link>
                  <Link to="/elderly">קשישים</Link>
                  <Link to="/visits">ביקורים</Link>
                </div>
              </div>
            )}

            {/* תפריט דוחות */}
            <div className={styles.dropdown}>
              <button className={styles.dropbtn}>דוחות</button>
              <div className={styles.dropdownContent}>
                <Link to="/visits/history">היסטוריית ביקורים</Link>
                <Link to="/dashboard">סטטיסטיקות</Link>
              </div>
            </div>

            {/* תפריט משתמש */}
            <div className={styles.dropdown}>
              <button className={styles.dropbtn}>{user.firstName}</button>
              <div className={styles.dropdownContent}>
                <Link to="/profile">פרופיל</Link>
                {user.role === 'admin' && <Link to="/settings">הגדרות מערכת</Link>}
                <Link to="/help">עזרה</Link>
                <button onClick={logout}>התנתק</button>
              </div>
            </div>
          </>
        ) : (
          <>
            <Link to="/login">התחברות</Link>
            <Link to="/register">הרשמה</Link>
            <Link to="/help">עזרה</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 