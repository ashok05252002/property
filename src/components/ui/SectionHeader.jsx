import React from 'react';

const SectionHeader = ({ title, subtitle }) => {
  return (
    <div className="text-center">
      {subtitle && <p className="text-gold font-semibold text-sm uppercase tracking-wider mb-2">{subtitle}</p>}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800">{title}</h2>
    </div>
  );
};

export default SectionHeader;
