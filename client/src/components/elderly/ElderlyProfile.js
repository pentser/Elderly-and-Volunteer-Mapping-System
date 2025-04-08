import React from 'react';
import { useParams } from 'react-router-dom';
import styles from '../../styles/Elderly.module.css';

const ElderlyProfile = () => {
  const { id } = useParams();

  return (
    <div className={styles.container}>
      <h1>פרופיל קשיש</h1>
      {/* פרטי הקשיש */}
    </div>
  );
};

export default ElderlyProfile; 