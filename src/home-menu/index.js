import React, { useState, useEffect, useRef } from 'react';
import { Container } from './style';
import { Divider } from '@mui/material';
import styled from 'styled-components';
import Icon from '@mui/icons-material/CheckCircle';
import HrWithIcon from '../components/divider';
import Whatsapp from '../../src/assets/imagens/whatsapp.png'
import caminhao from '../../src/assets/imagens/caminhãoLoading.gif'
import imgPhoto from '../../src/assets/imagens/imgPhoto.png'
import Header from '../components/header';
import { useSpring, animated } from 'react-spring';
import ChecklistInicial from '../components/checklistInicial';


const questions = [
  {
    question: 'Qual é a capital da França?',
    options: ['Paris', 'Londres', 'Roma', 'Madri'],
  },
  {
    question: 'Qual é o maior planeta do sistema solar?',
    options: ['Júpiter', 'Terra', 'Marte', 'Saturno'],
  },
  {
    question: 'Quem pintou a Mona Lisa?',
    options: ['Leonardo da Vinci', 'Pablo Picasso', 'Vincent van Gogh', 'Michelangelo'],
  },
];

const RandomQuestions = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const currentQuestion = questions[currentQuestionIndex];

  const handleNextQuestion = () => {
    if (selectedAnswer) {
      if (currentQuestionIndex === questions.length - 1) {
        console.log('All questions answered!');
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer('');
      }
    }
  };

  return (
    <div>
      <p>{currentQuestion.question}</p>
      <select value={selectedAnswer} onChange={(e) => setSelectedAnswer(e.target.value)}>
        <option value="">Select an answer</option>
        {currentQuestion.options.map((option, optionIndex) => (
          <option key={optionIndex} value={option}>
            {option}
          </option>
        ))}
      </select>
      <button onClick={handleNextQuestion} disabled={!selectedAnswer}>
        Next Question
      </button>
    </div>
  );
};

const HomeMenu = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photoData, setPhotoData] = useState(null);
  const [photoDataEsquerdo, setPhotoDataEsquerdo] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isHomeMenuOpen, setIsHomeMenuOpen] = useState(false);
  // const [isHomeMenuOpen1, setIsHomeMenuOpen1] = useState(false);
  const [isOtherElementsOpen, setIsOtherElementsOpen] = useState(true);
  // const [isOtherElementsOpen1, setIsOtherElementsOpen1] = useState(true);
  const [isOtherOpenWhats, setIsOpenWhats] = useState(false);
  const [isOpenPhoto, setIsOpenPhoto] = useState(false);
  const [isOpenPhotoEsquerdo, setIsOpenPhotoEsquerdo] = useState(false);
  const [isOpenQuestion, setIsOpenQuestion] = useState(false);
  const [isHeader, setisHeader] = useState(
    '');
  const [historyStack, setHistoryStack] = useState([]);
  const [isHeaderShow, setIsHeaderShow] = useState(false);


  // const TirarOutraFoto = async (event) => {
  //   event.preventDefault();
  //   const imageElement = document.getElementById('ImgRemove');
  //   imageElement.style.display = 'none';

  //   try {
  //     const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  //     videoRef.current.srcObject = stream;
  //   } catch (error) {
  //     console.error('Error accessing camera:', error);
  //   }
  // }

  const handleGoBack = () => {
    if (historyStack.length > 1) {
      const previousState = historyStack[historyStack.length - 2];
      setHistoryStack(historyStack.slice(0, -1));

      if (previousState === "Questions") {
        setIsOpenPhotoEsquerdo(false);
        setIsOpenQuestion(true);
      } else if (previousState === "PhotoEsquerdo") {
        setIsOpenQuestion(false);
        setIsOpenPhotoEsquerdo(true);
      } else if (previousState === "Photo") {
        setIsOpenPhoto(true);
        setIsOpenPhotoEsquerdo(false);
      } else if (previousState === "Whatsapp") {
        setIsOpenWhats(true);
        setIsOpenPhoto(false);
        setisHeader('CONTATO');
      } else if (previousState === "HomeMenu") {
        setIsHomeMenuOpen(true);
        setIsOpenWhats(false);
        // setIsOtherElementsOpen(true);
        setisHeader('');
      }
    }
  };

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataURL = canvas.toDataURL('image/jpeg');

    if (isOpenPhoto) {
      setPhotoData(dataURL);
      setIsOpenPhotoEsquerdo(false);
    } else if (isOpenPhotoEsquerdo) {
      setPhotoDataEsquerdo(dataURL);
    }
  };

  const handleStartCamera = async (event) => {
    event.preventDefault();


    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const handleStopCamera = () => {
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach((track) => track.stop());
    videoRef.current.srcObject = null;
  };
  // const handleOpenHome1 = () => {
  //   setIsHomeMenuOpen1(true);
  //   setIsOtherElementsOpen(false);
  //   setHistoryStack([...historyStack, "Home1"]); // Add "Home1" to the historyStack
  // };
  const handleOpenHomeMenu = () => {
    setIsHomeMenuOpen(true);
    setIsOtherElementsOpen(false);
    setHistoryStack([...historyStack, "HomeMenu"]); // Add "HomeMenu" to the historyStack
  };

  const handleOpenWhats = () => {
    setIsOpenWhats(true);
    setIsHomeMenuOpen(false);
    setisHeader('CONTATO')
    setIsHeaderShow(true)
    setHistoryStack([...historyStack, "Whatsapp"]); // Add "Whatsapp" to the historyStack
  };

  const handleOpenPhoto = () => {
    setIsOpenPhoto(true);
    setIsOpenWhats(false);
    setHistoryStack([...historyStack, "Photo"]);
    setisHeader('FOTO EQUIPAMENTO') // Add "Photo" to the historyStack

  };

  const handleOpenPhotoEsquerdo = () => {
    setIsOpenPhoto(false);
    setIsOpenPhotoEsquerdo(true);
    setHistoryStack([...historyStack, "PhotoEsquerdo"]); // Add "PhotoEsquerdo" to the historyStack

  };

  const handleQuestions = () => {
    setIsOpenPhotoEsquerdo(false);
    setIsOpenQuestion(true);
    setHistoryStack([...historyStack, "Questions"]); // Add "Questions" to the historyStack

  };

  const handleCloseHomeMenu = () => {
    setIsHomeMenuOpen(false);
    setIsOtherElementsOpen(true);
  };


  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  const fadeAnimation = useSpring({
    opacity: isOpen ? 1 : 0,
    height: isOpen ? 'auto' : 0,
    overflow: 'hidden',
  });

  const toggleText = () => {
    setIsOpen(!isOpen);
  };

  // useEffect(() => {
  //   Cookies.set('isHomeMenuOpen', isHomeMenuOpen);
  //   Cookies.set('isOtherOpenWhats', isOtherOpenWhats);
  //   Cookies.set('isOpenPhoto', isOpenPhoto);
  // }, [isHomeMenuOpen, isOtherOpenWhats, isOpenPhoto]);

  const refresh = () => {
    window.location.reload();
  };

  return (
    <>
    { isHeaderShow && 
      <Header pageTitle={isHeader} onGoBack={handleGoBack} />}
      <Container>
        {isLoading ? (
          <div style={{    display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '170px',
            width: '230px',
            height: '222px',
            border: '5px solid #fcd703',
            borderRadius: '188px', boxShadow: '39px 11px 15px rgba(0, 0, 0, 0.1)'}}>
            <img src={caminhao} alt="Carregando..." style={{ width: '104px', height: '89px' }} />
          </div>
        ) : (

          <>
            
            {/* {<RandomQuestions questions={questions} />} */}

            {isOtherElementsOpen && (
              <>
                <Container>
                  <h1> <span style={{fontWeight:'800'}}>Clique</span> na opção que representa este CheckList </h1>
                  <HrWithIcon icon={''} />

                  <div className="checkListInicial" onClick={toggleText}>
                    <p>CheckList INICIAL</p>
                    <p>Verificação que antecede a entrega do equipamento</p>
                    <p>para o cliente final.</p>
                  </div>
                  <animated.div style={fadeAnimation}>
                    {isOpen && (
                      <>
                        <p>Aqui está o texto que será exibido quando a div for clicada.</p>
                        <button className="btn" onClick={handleOpenHomeMenu}>
                          Clique Aqui
                        </button>
                      </>
                    )}
                  </animated.div>
                  <div className="checkListFinal" onClick={toggleText} style={{marginTop: '15px'}}>
                    <p>CheckList Final</p>
                    <p>Verificação que antecede a entrega do equipamento</p>
                    <p>para o cliente final.</p>
                  </div>
                  {/* <animated.div style={fadeAnimation}>
                    {isOpen && (
                      <>
                        <p>Aqui está o texto que será exibido quando a div for clicada.</p>
                        <button className="btn" onClick={handleOpenHomeMenu}>
                          Clique Aqui
                        </button>
                      </>
                    )}
                  </animated.div> */}
                  {/* <div className="checkListFinal">
                    <p>CheckList Final</p>
                  </div> */}
                </Container>
              </>
            )}
          </>
        )}
        {/* {isHomeMenuOpen1 && (
          <>
            <h2>Preenchimento Iniciado</h2>
            <p style={{ width: '15%' }}>As informações serão utilizadas para uso comercial e analítico dentro da plataforma VWCO. Você clicando em "Continuar" estará com consentimento do uso das informações na plataforma VWCO powred by TruckHelp.</p>
            <button className="btn" id="btnclick" onClick={handleOpenHomeMenu}>
              Clique Aqui
            </button>
          </>
        )
        } */}
        {isHomeMenuOpen && (
          <>
            <h2>Preenchimento Iniciado</h2>
            <p style={{ width: '68%' }}>As informações serão utilizadas para uso comercial e analítico dentro da plataforma VWCO. Você clicando em "Continuar" estará com consentimento do uso das informações na plataforma VWCO powred by TruckHelp.</p>
            <button className="btn" id="btnclick" onClick={handleOpenWhats}>
              CONTINUAR
            </button>
          </>
        )}

        {isOtherOpenWhats && (
          <>
            <HrWithIcon icon={''} />
            <img src={Whatsapp} alt="" style={{ width: '78px', height: '75px' }} />
            <p style={{ textAlign: 'center', width: '46%' }}>Contato de telefone por WhatsApp do responsável pelo preenchimento para comunicação e acompanhamento com o time de suporte.</p>
            <input style={{marginTop:'49px'}} type="text" className="linha-input" placeholder='Útimos 8 dígitos do CHASSI' />
            <button style={{marginTop:'62px'}} className="btn" id="btnclick" onClick={handleOpenPhoto}>
              CONTINUAR
            </button>
          </>
        )}

        {isOpenPhoto && (
          <>
            <HrWithIcon icon={''}  />
            <img src={imgPhoto} alt="" style={{ width: '78px', height: '75px' }} />
            <p style={{ lineHeight: '26px', marginBottom: '30px', color: '#6c6c6c' }}>Registrar uma foto externa do equipamento Lado Direito.</p>
            <p style={{ color: 'black', fontWeight: 'bold', fontSize: '20px' }}>*TIRE UMA FOTO
              DO VEÍCULO.</p>

            {!photoData ? (
              <div style={{ display: 'flex', width: '69%', flexDirection: 'column' }}>
                <video ref={videoRef} autoPlay></video>
                <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button onClick={handleStartCamera} style={{ width: '79%' }}>Iniciar Câmera</button>
                  <button onClick={handleCapture} style={{ width: '79%' }}>Capturar Foto</button>
                  <button onClick={handleStopCamera} style={{ width: '79%' }}>Parar Câmera</button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <img src={photoData} alt="Foto capturada" id="ImgRemove" style={{width:'346px', height: '235px'}}/>
                {/* <video ref={videoRef} autoPlay></video> */}
                {/* <button onClick={TirarOutraFoto} style={{width:'79%'}}>Tirar Outra Foto</button>
                <button onClick={handleCapture} style={{width:'79%'}}>Capturar Foto</button> */}
                <button style={{ width: '59%', marginTop: '11px' }} className="btn" id="btnclick" onClick={handleOpenPhotoEsquerdo}>
                CONTINUAR
                </button>
              </div>
            )}
          </>
        )}

        {isOpenPhotoEsquerdo && (
          <>
          <img src={imgPhoto} alt="" style={{ width: '78px', height: '75px' }} />
            <p>Registrar uma foto externa do equipamento Lado Esquerdo.</p>
            <p style={{ color: 'black', fontWeight: 'bold', fontSize: '20px' }}>*TIRE UMA FOTO
              DO VEÍCULO.</p>
            {!photoDataEsquerdo ? (
              <div style={{ display: 'flex', width: '69%', flexDirection: 'column' }}>
                <video ref={videoRef} autoPlay></video>
                <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button onClick={handleStartCamera} style={{ width: '79%' }}>Iniciar Câmera</button>
                  <button onClick={handleCapture} style={{ width: '79%' }}>Capturar Foto</button>
                  <button onClick={handleStopCamera} style={{ width: '79%' }}>Parar Câmera</button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <img src={photoDataEsquerdo} alt="Foto capturada" style={{width:'346px', height: '235px'}}/>
                
                <button className="btn" id="btnclick" onClick={refresh} style={{marginTop:'19px'}}>
                  CONTINUAR
                </button>
              </div>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default HomeMenu;
