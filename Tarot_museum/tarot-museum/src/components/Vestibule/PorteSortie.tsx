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
