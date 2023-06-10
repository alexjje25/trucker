import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  div {
    display: flex;
    justify-content: space-around;
  }
`;

const Logo = styled.img`
  width: 150px;
  height: auto;
  margin-left: auto;
`;

const Header = ({ targetScreen, pageTitle }) => {
  return (
    <HeaderContainer>
      <div>
        <ArrowBackIcon />
        {pageTitle && <h1>{pageTitle}</h1>}
      </div>
    </HeaderContainer>
  );
};

export default Header;
