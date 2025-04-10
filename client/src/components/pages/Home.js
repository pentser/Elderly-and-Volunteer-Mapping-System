import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/Home.module.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    // עטיפת העמוד הראשי כולו (רקע, כותרת, תוכן פנימי)
    <div className={styles.container}>
      
      <h2>מערכת ​לניהול קשרי מתנדבים וקשישים</h2>
      <div className={styles.undermaintytle}>
      {/* תוכן עמוד הבית - כולל טקסט על העמותה, פרטי קשר וכפתור */}
      <div className={styles.content}>
      <h4 className={styles.sectionTitle}>מגפת הבדידות בקרב קשישים</h4>
      {/* פסקה על מגפת הבדידות והסבר כללי על העמותה */}
        <p className={styles.paragraph}>
        בישראל מעל 1.1 מיליון מבוגרים בני 65 ומעלה; כ־30% מהם בודדים, עריריים וללא קרובי משפחה.
          מאות אלפי קשישים סובלים מבדידות קשה, ומאות מהם נפטרים בביתם מבלי שאיש ידע על כך בזמן אמת 
          
          עמותת לב לקשיש הוקמה בשנת 2021 במטרה לתמוך בקשישים בודדים
          ולחבר בין מתנדבים חמים לקשישים עריריים, במטרה לתת להם תחושת משמעות ואכפתיות.
        </p>
      </div>
        {/* בלוק קריאה לפעולה - כותרת, פרטי קשר וכפתור */}
        <div className={styles.features}>
          <h3>בואו להתנדב עם הלב!</h3>

          {/* פרטי קשר של העמותה */}
          <div className={styles.contactInfo}>
            <h4>ליצירת קשר:</h4>
            <p>עמותת לב לקשיש</p>
            <p>רח׳ הדולב 2, רמת גן</p>
            <p>טלפון: 03-7538971</p>
            <p>מייל: valenteer@levlkashis.co.il</p>
        </div>
    </div>
          {/* כפתור שמעביר לטופס יצירת קשר */}
          <button onClick={() => navigate('/contact')} className={styles.contactButton}>
            צרו קשר
          </button>
      </div>
    </div>
  );
};

export default Home;
