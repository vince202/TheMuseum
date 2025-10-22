import React from 'react';
import { Vestibule } from '../../components/Vestibule';
import { VestibuleTest } from '../../components/Vestibule/VestibuleTest';

/**
 * Le Vestibule des Initiés - Page wrapper
 * First room of the museum journey
 */
const VestibulePage: React.FC = () => {
  // Temporarily using test component to debug routing
  return <VestibuleTest />;
  // return <Vestibule />;
};

export default VestibulePage;
