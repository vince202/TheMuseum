import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface PorteSortieProps {
  nextRoom: string;
  nextRoomTitle: string;
}

export const PorteSortie: React.FC<PorteSortieProps> = ({ nextRoom, nextRoomTitle }) => {
  const [isOpening, setIsOpening] = useState(false);
  const navigate = useNavigate();

  const handleDoorClick = () => {
    setIsOpening(true);
    // Wait for animation to complete before navigating
    setTimeout(() => {
      navigate(nextRoom);
    }, 1500);
  };

  return (
    <div className="porte-sortie-container flex flex-col items-center justify-center py-20">
      <p className="text-museumAmber/60 text-sm tracking-widest uppercase mb-8 font-light">
        Continuer l'exploration
      </p>

      <div
        className={`porte-wrapper cursor-pointer group ${isOpening ? 'opening' : ''}`}
        onClick={handleDoorClick}
      >
        {/* Door Frame */}
        <div className="porte-frame relative" style={{ perspective: '1200px' }}>
          {/* Left Door */}
          <div
            className="porte-battant porte-gauche"
            style={{
              transformOrigin: 'left center',
              transition: 'transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: isOpening ? 'rotateY(-85deg)' : 'rotateY(0deg)'
            }}
          />

          {/* Right Door */}
          <div
            className="porte-battant porte-droite"
            style={{
              transformOrigin: 'right center',
              transition: 'transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: isOpening ? 'rotateY(85deg)' : 'rotateY(0deg)'
            }}
          />

          {/* Door Handle */}
          <div className="poignee absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-3 bg-museumGold/40 rounded-full shadow-vintage-gold group-hover:bg-museumGold/60 transition-colors" />

          {/* Glow behind door when opening */}
          {isOpening && (
            <div className="absolute inset-0 bg-gradient-radial from-museumGold/30 via-transparent to-transparent animate-fade-in -z-10" />
          )}
        </div>
      </div>

      <p className="text-museumGold font-serif text-lg mt-8 group-hover:text-museumGoldLight transition-colors">
        {nextRoomTitle}
      </p>
    </div>
  );
};

// Styles for the door (to be added to Vestibule.css or inline)
const doorStyles = `
.porte-wrapper {
  position: relative;
}

.porte-frame {
  width: 200px;
  height: 300px;
  position: relative;
  background: linear-gradient(to bottom, #1a0f08, #0a0a0a);
  border: 2px solid rgba(212, 175, 55, 0.3);
  border-radius: 4px;
  box-shadow:
    inset 0 0 20px rgba(0, 0, 0, 0.8),
    0 0 30px rgba(212, 175, 55, 0.1);
}

.porte-battant {
  position: absolute;
  top: 0;
  width: 50%;
  height: 100%;
  background:
    linear-gradient(to right, rgba(42, 37, 32, 0.9), rgba(26, 15, 8, 0.95)),
    url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg"%3E%3Cpattern id="wood" width="4" height="4" patternUnits="userSpaceOnUse"%3E%3Cpath d="M0,0 L4,4 M4,0 L0,4" stroke="%23000" stroke-width="0.5" opacity="0.1"/%3E%3C/pattern%3E%3Crect width="100%25" height="100%25" fill="url(%23wood)"/%3E%3C/svg%3E');
  border: 1px solid rgba(212, 175, 55, 0.2);
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
}

.porte-gauche {
  left: 0;
  border-right: 1px solid rgba(212, 175, 55, 0.3);
}

.porte-droite {
  right: 0;
  border-left: 1px solid rgba(212, 175, 55, 0.3);
}
`;
