import React, { useState } from 'react';
import styles from '../../styles/Visit.module.css';

const AddVisit = () => {
  const [formData, setFormData] = useState({
    elderlyId: '',
    volunteerId: '',
    date: '',
    time: ''
  });

  return (
    <div className={styles.container}>
      <h1>תיאום ביקור חדש</h1>
      <form className={styles.form}>
        {/* טופס תיאום ביקור */}
      </form>
    </div>
  );
};

export default AddVisit; 