// src/components/pages/Contact.js

import React, { useState } from 'react';
import styles from '../../styles/Contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    homeAddress: '',
    workAddress: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // כאן תוכל בעתיד לשלוח את הנתונים לשרת
    console.log('נשלח:', formData);
    alert('הפרטים נשלחו בהצלחה!');
  };

  return (
    <div className={styles.container}>
      <h2>טופס יצירת קשר</h2>
      <form onSubmit={handleSubmit} className={styles.form}>

        <label>שם פרטי:</label>
        <input name="firstName" value={formData.firstName} onChange={handleChange} />

        <label>שם משפחה:</label>
        <input name="lastName" value={formData.lastName} onChange={handleChange} />

        <label>טלפון:</label>
        <input name="phone" value={formData.phone} onChange={handleChange} />

        <label>מייל:</label>
        <input name="email" value={formData.email} onChange={handleChange} />

        <label>כתובת מגורים:</label>
        <input name="homeAddress" value={formData.homeAddress} onChange={handleChange} />

        <label>כתובת עבודה:</label>
        <input name="workAddress" value={formData.workAddress} onChange={handleChange} />

        <button type="submit">שלח</button>
      </form>
    </div>
  );
};

export default Contact;
