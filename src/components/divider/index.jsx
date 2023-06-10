import React from 'react';

const HrWithIcon = ({icon}) => {
  const hrContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  };

  const hrLineStyle = {
    flex: 1,
    // border: '1px solid #002755',
  };

  const hrIconStyle = {
    padding: '0 10px',
    color: 'blue',
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
