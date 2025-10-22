import React from 'react';
import { Link } from 'react-router-dom';

interface RoomArchwaySimpleProps {
  href: string;
  title: string;
  description: string;
  icon?: string;
}

/**
 * Version simplifiée de RoomArchway pour test de routing
 * Sans animations Framer Motion qui pourraient bloquer les clics
 */
export const RoomArchwaySimple: React.FC<RoomArchwaySimpleProps> = ({
  href,
  title,
  description,
  icon,
}) => {
  return (
    <Link
      to={href}
      className="block"
      onClick={() => console.log(`Clic sur ${title} -> ${href}`)}
    >
      <div className="relative h-64 bg-black/30 backdrop-blur-sm border-2 border-[#D3B77C] rounded-lg overflow-hidden hover:scale-105 hover:border-[#E8D5C0] transition-all cursor-pointer">
        <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 text-center">
          {icon && (
            <div className="text-6xl mb-4">
              {icon}
            </div>
          )}

          <h3 className="text-2xl font-serif font-bold text-[#D3B77C] mb-2">
            {title}
          </h3>

          <p className="text-sm text-[#B8956A] max-w-xs">
            {description}
          </p>

          <div className="mt-4 text-[#D3B77C]">
            →
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RoomArchwaySimple;
