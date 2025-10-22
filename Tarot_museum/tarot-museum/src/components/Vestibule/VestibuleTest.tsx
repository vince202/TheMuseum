import React from 'react';

/**
 * Composant de test simple pour vérifier le routing
 */
export const VestibuleTest: React.FC = () => {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0a0a',
      color: '#D4AF37',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: '40px'
    }}>
      <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>
        🕯️ Le Vestibule des Initiés
      </h1>
      <p style={{ fontSize: '20px', textAlign: 'center', maxWidth: '600px' }}>
        Test de routing : Si vous voyez ce message, la route fonctionne correctement.
      </p>
      <p style={{ fontSize: '16px', marginTop: '40px', opacity: 0.7 }}>
        Le composant Vestibule complet sera chargé après validation de ce test.
      </p>
    </div>
  );
};
