import React from 'react';

const HrWithIcon = ({icon, style}) => {
  const hrContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    ...style, // Mescla os estilos personalizados com os estilos padrão
  };

  const hrLineStyle = {
    flex: 1,
    border: '1px solid #c2c5ff',
  };

  const hrIconStyle = {
    padding: '0 10px',
    color: '#c2c5ff',
    
  };
  return (
    <div style={hrContainerStyle}>
      <hr style={hrLineStyle} />
        <div style={hrIconStyle}>{icon}</div>
      <hr style={hrLineStyle} />
    </div>
  );
};

export default HrWithIcon;
