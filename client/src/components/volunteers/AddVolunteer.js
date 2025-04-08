import React, { useState } from 'react';
import styles from '../../styles/Volunteer.module.css';

const AddVolunteer = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  return (
    <div className={styles.container}>
      <h1>הוספת מתנדב חדש</h1>
      <form className={styles.form}>
        {/* טופס הוספת מתנדב */}
      </form>
    </div>
  );
};

export default AddVolunteer; 