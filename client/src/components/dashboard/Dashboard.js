import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from '../../styles/Dashboard.module.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalElderly: 0,
    totalVolunteers: 0,
    activeVisits: 0,
    completedVisits: 0
  });

  useEffect(() => {
    // כאן נוסיף בהמשך קריאה לשרת לקבלת הסטטיסטיקות
    // לבינתיים נשתמש בנתונים לדוגמה
    setStats({
      totalElderly: 25,
      totalVolunteers: 15,
      activeVisits: 8,
      completedVisits: 42
    });
  }, []);

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.welcomeMessage}>ברוך הבא, {user?.firstName}!</h1>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>קשישים רשומים</h3>
          <div className={styles.statValue}>{stats.totalElderly}</div>
        </div>
        <div className={styles.statCard}>
          <h3>מתנדבים פעילים</h3>
          <div className={styles.statValue}>{stats.totalVolunteers}</div>
        </div>
        <div className={styles.statCard}>
          <h3>ביקורים פעילים</h3>
          <div className={styles.statValue}>{stats.activeVisits}</div>
        </div>
        <div className={styles.statCard}>
          <h3>ביקורים שהושלמו</h3>
          <div className={styles.statValue}>{stats.completedVisits}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 