import React, { useState, useEffect } from 'react';
import styles from '../../styles/Visit.module.css';

const VisitHistory = () => {
  const [visits, setVisits] = useState([]);

  return (
    <div className={styles.container}>
      <h1>היסטוריית ביקורים</h1>
      <div className={styles.grid}>
        {/* רשימת הביקורים */}
      </div>
    </div>
  );
};

export default VisitHistory; 