import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

export default function OrderLoadingClient() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/Animation - 1750681651817.json')
      .then(res => res.json())
      .then(setAnimationData);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(to right, #000000 0%, #0f172a 40%, #05080f 50%, #0f172a 60%, #000000 100%)',
      color: '#ff9800',
      fontWeight: 700,
      fontSize: '1.5rem',
      letterSpacing: '0.02em',
    }}>
      {animationData && (
        <Lottie
          animationData={animationData}
          loop
          autoplay
          style={{ height: '220px', width: '320px' }}
        />
      )}
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        Loading your delicious menu...
      </div>
    </div>
  );
} 