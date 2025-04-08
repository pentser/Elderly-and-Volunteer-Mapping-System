import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from '../../styles/Visit.module.css';

const VisitList = () => {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/visits', {
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        });
        const data = await response.json();
        setVisits(data);
      } catch (err) {
        setError('שגיאה בטעינת רשימת הביקורים');
      } finally {
        setLoading(false);
      }
    };

    fetchVisits();
  }, []);

  if (loading) return <div>טוען...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.visitList}>
      <h2>רשימת ביקורים</h2>
      <div className={styles.grid}>
        {visits.map((visit) => (
          <div key={visit._id} className={styles.card}>
            <h3>ביקור אצל {visit.elderly?.firstName} {visit.elderly?.lastName}</h3>
            <p>מתנדב: {visit.volunteer?.firstName} {visit.volunteer?.lastName}</p>
            <p>תאריך: {new Date(visit.scheduledTime).toLocaleDateString('he-IL')}</p>
            <p>סטטוס: {visit.status}</p>
            <div className={styles.actions}>
              <button className={styles.updateButton}>עדכן סטטוס</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisitList; 