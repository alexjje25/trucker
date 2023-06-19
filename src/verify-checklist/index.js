import React, { useState } from 'react';
import { Container } from './style';
import { Divider } from '@mui/material';
import Icon from '@mui/icons-material/CheckCircle';
import HrWithIcon from '../components/divider';
// import MeuIcone from '../../src/assets/icon/iconMation.svg'
import IconMeio from '../../src/assets/imagens/screnn.png'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer, Slide, Bounce, Flip, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const HomePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Novo estado para controlar o loader
  const [showItems, setShowItems] = useState(true);
  const [showInput, setShowInput] = useState(false);
  const [showInputDN, setShowInputDN] = useState(false);
  const [showInputChassi, setshowInputChassi] = useState(false);
  const [dnResponsavel, setDnResponsavel] = useState('');
  const [dnResponsavelChassi, setDnResponsavelChassi] = useState('');
  const [dnResponsavelPlaca, setDnResponsavelPlaca] = useState('');

  const handleClickDN = (event) => {
    event.preventDefault();
    if (dnResponsavel === '') {
      // alert('O campo DN Responsável pelo Caminhão não pode estar vazio!');
      toast.error("Campo Vazio");
    } else if (dnResponsavel.length !== 4) {
      toast.error("Precisa ser Prenchido com no minimo 4 numeros");
    }
    else {
      setShowInput(false);
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false); // Desativa o loader após a operação assíncrona
        setshowInputChassi(true) // Ativa o novo estado após o loader ser desativado
      }, 2000);

      
    }

    console.log('Valor digitado no input:', dnResponsavel);
    // Faça o que precisar com o valor digitado...
  };
  const handleRedirect = (event) => {
    event.preventDefault();
    if (dnResponsavelChassi === '' || dnResponsavelPlaca === '') {
      toast.error("Campo Vazio");
      console.log('aea4d')
    }
    if (dnResponsavelChassi.length !== 8) {
      toast.error("Precisa ser Prenchido com no minimo 8 numeros");
    }
    if (dnResponsavelPlaca.length !== 7) {
      toast.error("Precisa ser Prenchido com no minimo 7 numeros");
    } else {
      setIsLoading(true); // Ativa o loader
    // Simulação de uma operação assíncrona
    setTimeout(() => {
      setIsLoading(false); // Desativa o loader após a operação assíncrona
      navigate('/home-menu');
      window.location.href = '/home-menu'; // Ativa o novo estado após o loader ser desativado
    }, 2000);
    }
  };
  const handleClick = () => {
    setShowItems(false);
    setIsLoading(true); // Ativa o loader
    // Simulação de uma operação assíncrona
    setTimeout(() => {
      setIsLoading(false); // Desativa o loader após a operação assíncrona
      setShowInput(true); // Ativa o novo estado após o loader ser desativado
    }, 2000);
  };
  const handleClickChassi = () => {
    setShowItems(false);
    setshowInputChassi(true);
    setShowInputDN(false);
  }
  const handleDNInputChange = (event) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/\D/g, ''); // Filtra apenas os caracteres numéricos

    setDnResponsavel(numericValue);
  };

  const handleDNInputChangeChassi = (event) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/\D/g, ''); // Filtra apenas os caracteres numéricos

    setDnResponsavelChassi(numericValue);
  };
  const handleDNInputChangePlaca = (event) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/\D/g, ''); // Filtra apenas os caracteres numéricos
    setDnResponsavelPlaca(numericValue);
  };

  return (
    <Container>
      <img src="LogoTrucker.png" alt="" />
      {isLoading && <div>Carregando...</div>} {/* Renderiza o texto "Carregando..." durante o carregamento */}
      {showItems && (
        <>
          <HrWithIcon icon={handleClick} />
          <h1>Clique em começar CheckList <br />para iniciar o processo de verificações</h1>
          <button onClick={handleClick} className="btnWrapper">COMEÇAR CHECKLIST</button>
        </>
      )}
      {showInput && (
        <>
          {/* <HrWithIcon icon={handleClick} /> */}
          <ToastContainer theme='colored' transition={Zoom} autoClose={200000000000} hideProgressBar={true}></ToastContainer>
          <h1>Identificação de DN <br /> Para iniciar o processode <br /> verificações por favor <br /> digite sua DN.</h1>
          <HrWithIcon icon={handleClick} />
          <input type="text" className="linha-input" placeholder='DN Responsável pelo Caminhão' value={dnResponsavel}
            onChange={handleDNInputChange} />
          <button onClick={handleClickDN} className="btnWrapper" style={{ marginTop: '63px' }}>COMEÇAR CHECKLIST</button>
        </>
      )}
      {showInputDN && (
        <>
          <HrWithIcon icon={handleClick} />
          <h1>Contato de telefone por WhatsApp do responsável pelo preenchimento para comunicação e acompanhamento com o time de suporte.</h1>
          <input type="text" className="linha-input" placeholder='DN Responsável pelo Caminhão' />
          <button onClick={handleClickDN} style={{ marginTop: '10px' }} className="btnWrapper">COMEÇAR CHECKLIST</button>
        </>
      )}
      {showInputChassi && (
        <>
          <ToastContainer theme='colored' transition={Zoom} autoClose={200000000000} hideProgressBar={true}></ToastContainer>
          <HrWithIcon icon={''} />
          <h1>Identificação de Equipamento Digite informações para identificação do Equipamento.</h1>
          <input type="text" className="linha-input" placeholder='Útimos 8 dígitos do CHASSI' value={dnResponsavelChassi}
            onChange={handleDNInputChangeChassi} />
          <input type="text" className="linha-input" placeholder='Placa do veículo' value={dnResponsavelPlaca}
            onChange={handleDNInputChangePlaca} />
          <button onClick={handleRedirect} style={{ marginTop: '64px' }} className="btnWrapper">COMEÇAR CHECKLIST</button>
        </>
      )}
      
    </Container>
  );
};

export default HomePage;
