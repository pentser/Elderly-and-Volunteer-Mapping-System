import React from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from '../../styles/Profile.module.css';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className={styles.container}>
      <h1>פרופיל משתמש</h1>
      <div className={styles.profileCard}>
        <div className={styles.profileInfo}>
          <h2>{user.firstName} {user.lastName}</h2>
          <p>אימייל: {user.email}</p>
          <p>תפקיד: {user.role}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile; 