import React from 'react';

const GlassCard = ({ children, className = '' }) => (
  <div
    className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 ${className}`}
    role="region"
  >
    {children}
  </div>
);

export default GlassCard;
