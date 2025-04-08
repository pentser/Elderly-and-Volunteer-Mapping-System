import React from 'react';
import { useParams } from 'react-router-dom';
import styles from '../../styles/Volunteer.module.css';

const VolunteerProfile = () => {
  const { id } = useParams();

  return (
    <div className={styles.container}>
      <h1>פרופיל מתנדב</h1>
      {/* פרטי המתנדב */}
    </div>
  );
};

export default VolunteerProfile; 