import React from 'react';
import styles from '../../styles/Pages.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <h1>ברוכים הבאים למערכת מיפוי קשישים ומתנדבים</h1>
      <div className={styles.content}>
        <p>המערכת מאפשרת ניהול וארגון של ביקורי מתנדבים אצל קשישים.</p>
        <div className={styles.features}>
          <h2>תכונות עיקריות:</h2>
          <ul>
            <li>מיפוי גיאוגרפי של קשישים ומתנדבים</li>
            <li>ניהול מערך המתנדבים</li>
            <li>תיאום וניהול ביקורים</li>
            <li>מעקבי אחר פעילות המתנדבים</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home; 