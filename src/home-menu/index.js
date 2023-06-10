import React, { useState, useEffect, useRef } from 'react';
import { Container } from './style';
import { Divider } from '@mui/material';
import styled from 'styled-components';
import Icon from '@mui/icons-material/CheckCircle';
import HrWithIcon from '../components/divider';
import Whatsapp from '../../src/assets/imagens/whatsapp.png'
import Header from '../components/header';
import { useSpring, animated } from 'react-spring';
import ChecklistInicial from '../components/checklistInicial';
import Cookies from 'js-cookie';

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
  const [isOtherElementsOpen, setIsOtherElementsOpen] = useState(true);
  const [isOtherOpenWhats, setIsOpenWhats] = useState(false);
  const [isOpenPhoto, setIsOpenPhoto] = useState(false);
  const [isOpenPhotoEsquerdo, setIsOpenPhotoEsquerdo] = useState(false);
  const [isOpenQuestion, setIsOpenQuestion] = useState(false);
  const [isHeader, setisHeader] = useState('TESTE1');
 
  

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

  const handleOpenHomeMenu = () => {
    setIsHomeMenuOpen(true);
    setIsOtherElementsOpen(false);
  };

  const handleOpenWhats = () => {
    setIsOpenWhats(true);
    setIsHomeMenuOpen(false);
    setisHeader('TESTE2')
  };

  const handleOpenPhoto = () => {
    setIsOpenPhoto(true);
    setIsOpenWhats(false);
  };

  const handleOpenPhotoEsquerdo = () => {
    setIsOpenPhoto(false);
    setIsOpenPhotoEsquerdo(true);
  };

  const handleQuestions = () => {
    setIsOpenPhotoEsquerdo(false);
    setIsOpenQuestion(true);
  };

  const handleCloseHomeMenu = () => {
    setIsHomeMenuOpen(false);
    setIsOtherElementsOpen(true);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

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

  useEffect(() => {
    Cookies.set('isHomeMenuOpen', isHomeMenuOpen);
    Cookies.set('isOtherOpenWhats', isOtherOpenWhats);
    Cookies.set('isOpenPhoto', isOpenPhoto);
  }, [isHomeMenuOpen, isOtherOpenWhats, isOpenPhoto]);
  
  useEffect(() => {
    const savedIsHomeMenuOpen = Cookies.get('isHomeMenuOpen');
    const savedIsOtherOpenWhats = Cookies.get('setIsOpenWhats');
    const savedIsOpenPhoto = Cookies.get('isOpenPhoto');
  
    if (savedIsHomeMenuOpen) {
      setIsHomeMenuOpen(savedIsHomeMenuOpen === 'true');
    }
  
    if (savedIsOtherOpenWhats) {
      setIsOpenWhats(savedIsOtherOpenWhats === 'true');
    }
  
    if (savedIsOpenPhoto) {
      setIsOpenPhoto(savedIsOpenPhoto === 'true');
    }
  }, []);
  

  return (
    <>
      <Header pageTitle={isHeader}/>
      <Container>
        {isLoading ? (
          <div>Carregando...</div>
        ) : (
          <>
            {/* {<RandomQuestions questions={questions} />} */}

            {isOtherElementsOpen && (
              <>
                <Container>
                  <h1> Clique na opção que representa este CheckList </h1>
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
                  <div className="checkListFinal">
                    <p>CheckList Final</p>
                  </div>
                </Container>
              </>
            )}
          </>
        )}
        {isHomeMenuOpen && (
          <>
              {/* <h1>OLA MUNDO</h1> */}
              <div>
                <input type="text" className="linha-input" placeholder='Útimos 8 dígitos do CHASSI' />
                <input type="text" className="linha-input" placeholder='Placa do veículo' />
                <input type="text" className="linha-input" placeholder='Útimos 8 dígitos do CHASSI' />
                <input type="text" className="linha-input" placeholder='Placa do veículo' />
                <button className="btn" id="btnclick"onClick={handleOpenWhats}>
                  Clique Aqui
                </button>
            </div>
          </>
        )}

        {isOtherOpenWhats && (
          <>
            <HrWithIcon icon={''} />
            <img src={Whatsapp} alt="" style={{ width: '78px', height: '75px' }} />
            <p>Contato de telefone por WhatsApp do responsável da empresa.</p>
            <input type="text" className="linha-input" placeholder='Útimos 8 dígitos do CHASSI' />
            <button className="btn" id="btnclick" onClick={handleOpenPhoto}>
              Clique Aqui
            </button>
          </>
        )}

        {isOpenPhoto && (
          <>
            <p>Registrar uma foto externa do equipamento Lado Direito.</p>
            {!photoData ? (
              <div>
                <video ref={videoRef} autoPlay></video>
                <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
                <button onClick={handleStartCamera}>Iniciar Câmera</button>
                <button onClick={handleCapture}>Capturar Foto</button>
                <button onClick={handleStopCamera}>Parar Câmera</button>
              </div>
            ) : (
              <div>
                <img src={photoData} alt="Foto capturada" />
                <button>teste</button>
                <button className="btn" id="btnclick" onClick={handleOpenPhotoEsquerdo}>
                  Continuar
                </button>
              </div>
            )}
          </>
        )}

        {isOpenPhotoEsquerdo && (
          <>
            <p>Registrar uma foto externa do equipamento Lado Esquerdo.</p>
            {!photoDataEsquerdo ? (
              <div>
                <video ref={videoRef} autoPlay></video>
                <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
                <button onClick={handleStartCamera}>Iniciar Câmera</button>
                <button onClick={handleCapture}>Capturar Foto</button>
                <button onClick={handleStopCamera}>Parar Câmera</button>
              </div>
            ) : (
              <div>
                <img src={photoDataEsquerdo} alt="Foto capturada" />
                <button>teste</button>
                <button className="btn" id="btnclick" onClick={handleQuestions}>
                  Continuar
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
