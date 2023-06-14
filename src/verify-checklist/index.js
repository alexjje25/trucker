import React, { useState } from 'react';
import { Container } from './style';
import { Divider } from '@mui/material';
import Icon from '@mui/icons-material/CheckCircle';
import HrWithIcon from '../components/divider';
// import MeuIcone from '../../src/assets/icon/iconMation.svg'
import IconMeio from '../../src/assets/imagens/screnn.png'
import { useNavigate } from 'react-router-dom';



const HomePage = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/home-menu');
    window.location.href = '/home-menu';
  };

  const [showItems, setShowItems] = useState(true);
  const [showInput, setShowInput] = useState(false);
  const [showInputDN, setShowInputDN] = useState(false);
  const [showInputChassi, setshowInputChassi] = useState(false);


  const handleClick = () => {
    setShowItems(false);
    setShowInput(true);
  };
  const handleClickDN = () => {
    // setShowItems(false);
    // setShowInputDN(false);
    setShowInput(false);
    setshowInputChassi(true)
  }
  const handleClickChassi = () => {
    setShowItems(false);
    setshowInputChassi(true);
    setShowInputDN(false);
  }

  return (
    <Container>
      <img src="LogoTrucker.png" alt="" />

      {showItems && (
        <>
          <HrWithIcon icon={handleClick} />
          <h1>Clique em começar CheckList <br />para iniciar o processo de verificações</h1>
          <button onClick={handleClick}>COMEÇAR CHECKLIST</button>
        </>
      )}
      {showInput && (
        <>
          {/* <HrWithIcon icon={handleClick} /> */}
          <h1>Identificação de DN <br /> Para iniciar o processode <br /> verificações por favor <br /> digite sua DN.</h1>
          <HrWithIcon icon={handleClick} />
          <input type="text" className="linha-input" placeholder='DN Responsável pelo Caminhão' />
          <button onClick={handleClickDN} style={{ marginTop: '63px' }}>COMEÇAR CHECKLIST</button>
        </>
      )}
      {showInputDN && (
        <>
          <HrWithIcon icon={handleClick} />
          <h1>Contato de telefone por WhatsApp do responsável pelo preenchimento para comunicação e acompanhamento com o time de suporte.</h1>
          <input type="text" className="linha-input" placeholder='DN Responsável pelo Caminhão' />
          <button onClick={handleClickDN} style={{ marginTop: '10px' }}>Iniciar Checklist</button>
        </>
      )}
      {showInputChassi && (
        <>
          <HrWithIcon icon={''} />
          <h1>Identificação de Equipamento Digite informações para identificação do Equipamento.</h1>
          <input type="text" className="linha-input" placeholder='Útimos 8 dígitos do CHASSI' />
          <input type="text" className="linha-input" placeholder='Placa do veículo' />
          <button onClick={handleRedirect} style={{ marginTop: '64px' }}>COMEÇAR CHECKLIST</button>
        </>
      )}
    </Container>
  );
};

export default HomePage;
