import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between ;
  
  width: 100%;

  // div {
  //   display: flex;
  //   justify-content: space-around;
  // }
`;

const Logo = styled.img`
  width: 150px;
  height: auto;
  margin-left: auto;
`;

const Header = ({ targetScreen, pageTitle, onGoBack  }) => {
  
  const handleGoBack = () => {
    if (typeof onGoBack === 'function') {
      onGoBack();
    }
  };

  return (
    <div style={{display:'flex', justifyContent: 'space-between'}}>
      <div>
        <ArrowBackIcon onClick={handleGoBack} />
      </div>
      {pageTitle && <h1 style={{fontSize: '24px',fontWeight: 'bold',color: 'rgb(0, 39, 85)',letterSpacing: '0.2em'}}>{pageTitle}</h1>}
      <p style={{color: 'white'}}>o</p>
    </div>
  );
};

export default Header;
