import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Userattendance = () => {
  const [arr, setarr] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://summer-internship-hackathon-2026-tech.onrender.com/api/login/sheet");
        
        // FIX HERE: res.data ke andar se 'attendsheet' array ko nikal kar state me save kiya
        if (res.data && res.data.attendsheet) {
          setarr(res.data.attendsheet);
        }
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Attendance Sheet</h2>
        <p style={styles.subtitle}>Track and manage daily attendance records</p>
      </div>

      {loading ? (
        <div style={styles.loaderContainer}>
          <div style={styles.loader}></div>
        </div>
      ) : arr.length === 0 ? (
        <div style={styles.noData}>No records found</div>
      ) : (
        <div style={styles.grid}>
          {arr.map((elem, index) => (
            <div key={elem._id || index} style={styles.card}>
              {/* Status Badge Dynamically Colors Based on Value */}
              <div style={{
                ...styles.cardBadge,
                backgroundColor: elem.status === 'INSIDE' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                color: elem.status === 'INSIDE' ? '#4ade80' : '#f87171'
              }}>
                {elem.status}
              </div>
              
              {/* Displaying Gym Code and Date */}
              <h3 style={styles.cardText}>Gym Code: {elem.gymcode}</h3>
              <p style={{ color: '#a1a1aa', fontSize: '0.9rem', margin: '-15px 0 20px 0' }}>
                Date: {elem.date}
              </p>
              
              <div style={styles.cardFooter}>
                <span>Duration: {elem.duration} mins</span>
                <span style={styles.viewBtn}>Details →</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Premium Glassmorphism & Dark UI Styles
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#0a0a0c',
    color: '#ffffff',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: '40px 20px',
  },
  header: {
    maxWidth: '1200px',
    margin: '0 auto 40px auto',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    paddingBottom: '20px',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    letterSpacing: '-0.05em',
    background: 'linear-gradient(to right, #ffffff, #a3a3a3)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: '0 0 8px 0',
  },
  subtitle: {
    color: '#71717a',
    fontSize: '0.95rem',
    margin: 0,
  },
  grid: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '24px',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '16px',
    padding: '24px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
  },
  cardBadge: {
    position: 'absolute',
    top: '20px',
    right: '24px',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: '600',
    textTransform: 'uppercase'
  },
  cardText: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#f4f4f5',
    margin: '20px 0 20px 0',
    lineHeight: '1.4',
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.85rem',
    color: '#a1a1aa',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
    paddingTop: '16px',
  },
  viewBtn: {
    color: '#3b82f6',
    fontWeight: '500',
  },
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '200px',
  },
  loader: {
    width: '35px',
    height: '35px',
    border: '3px solid rgba(255, 255, 255, 0.1)',
    borderTop: '3px solid #ffffff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  noData: {
    textAlign: 'center',
    color: '#71717a',
    marginTop: '40px',
    fontSize: '1.1rem',
  },
};

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    div[style*="background: rgba(255, 255, 255, 0.03)"]:hover {
      transform: translateY(-5px);
      border-color: rgba(255, 255, 255, 0.2) !important;
      background: rgba(255, 255, 255, 0.05) !important;
    }
  `;
  document.head.appendChild(styleSheet);
}

export default Userattendance;