import React from 'react';

/**
 * Le Vestibule des Initiés - Page wrapper
 * First room of the museum journey
 */
const VestibulePage: React.FC = () => {
  console.log('VestibulePage rendering!');

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0a0a',
      color: '#D4AF37',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: '40px',
      fontSize: '24px'
    }}>
      <h1 style={{ fontSize: '72px', marginBottom: '40px' }}>
        ✅ LE VESTIBULE FONCTIONNE !
      </h1>
      <p>Si vous voyez ce message, le routing est correct.</p>
    </div>
  );
};

export default VestibulePage;
