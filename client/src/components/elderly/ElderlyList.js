import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from '../../styles/Elderly.module.css';

const ElderlyList = () => {
  const [elderly, setElderly] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchElderly = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/elderly', {
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        });
        const data = await response.json();
        setElderly(data);
      } catch (err) {
        setError('שגיאה בטעינת רשימת הקשישים');
      } finally {
        setLoading(false);
      }
    };

    fetchElderly();
  }, []);

  if (loading) return <div>טוען...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.elderlyList}>
      <h2>רשימת קשישים</h2>
      <div className={styles.grid}>
        {elderly.map((person) => (
          <div key={person._id} className={styles.card}>
            <h3>{person.firstName} {person.lastName}</h3>
            <p>כתובת: {person.address.street}, {person.address.city}</p>
            <p>טלפון: {person.phone}</p>
            <div className={styles.actions}>
              <button className={styles.editButton}>ערוך</button>
              <button className={styles.visitButton}>תאם ביקור</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ElderlyList; 