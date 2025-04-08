import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/Volunteer.module.css';

const VolunteerList = () => {
  const [volunteers, setVolunteers] = useState([]);

  return (
    <div className={styles.container}>
      <h1>רשימת מתנדבים</h1>
      <Link to="/volunteers/add" className={styles.addButton}>
        הוסף מתנדב חדש
      </Link>
      <div className={styles.grid}>
        {/* רשימת המתנדבים */}
      </div>
    </div>
  );
};

export default VolunteerList; 