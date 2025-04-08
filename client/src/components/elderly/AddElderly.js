import React, { useState } from 'react';
import styles from '../../styles/Elderly.module.css';

const AddElderly = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phone: ''
  });

  return (
    <div className={styles.container}>
      <h1>הוספת קשיש חדש</h1>
      <form className={styles.form}>
        {/* טופס הוספת קשיש */}
      </form>
    </div>
  );
};

export default AddElderly; 