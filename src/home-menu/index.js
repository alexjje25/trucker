import React, { useState, useEffect, useRef } from 'react';
import { Container } from './style';
import { Divider } from '@mui/material';
import styled from 'styled-components';
import Icon from '@mui/icons-material/CheckCircle';
import HrWithIcon from '../components/divider';
import Whatsapp from '../../src/assets/imagens/whatsapp.png'
import caminhao from '../../src/assets/imagens/caminhãoLoading.gif'
import imgPhoto from '../../src/assets/imagens/imgPhoto.png'
import imgBottom from '../../src/assets/imagens/iconBottom.png'
import iconeUpload from '../../src/assets/imagens/iconeUpload.png'
import editar from '../../src/assets/imagens/editar.png'
import remove from '../../src/assets/imagens/remove.png'
import Header from '../components/header';
import { useSpring, animated } from 'react-spring';
import ChecklistInicial from '../components/checklistInicial';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer, Slide, Bounce, Flip, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

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
  const navigate = useNavigate();
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
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isOtherOpenWhats, setIsOpenWhats] = useState(false);
  const [isOpenPhoto, setIsOpenPhoto] = useState(false);
  const [isOpenPhotoEsquerdo, setIsOpenPhotoEsquerdo] = useState(false);
  const [isOpenQuestion, setIsOpenQuestion] = useState(false);
  const [isHeader, setisHeader] = useState(
    '');
  const [historyStack, setHistoryStack] = useState([]);
  const [isHeaderShow, setIsHeaderShow] = useState(false);
  const [dnResponsavel, setDnResponsavel] = useState('');
  const [dnRazaoSocial, setRazaoSocial] = useState('');
  const [dnNomeFantasia, setNomeFantasia] = useState('');
  const [dnResponsávelpeloEstalecimento, setResponsávelpeloEstalecimento] = useState('');
  const [Email, setEmail] = useState('');
  const [Cnpj, setCnpj] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [whatsappInput, setWhatsappInput] = useState(null);
  const [dnResponsavelWhats, setDnResponsavelWhats] = useState('');
  const [imgShow, setImgShow] = useState(true);
  const [imgShow2, setImgShow2] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);



  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setImgShow(false);

    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const RemoveImageUpload = (event) => {
    event.preventDefault();
    setImgShow(true);
    setSelectedFile(null);
  };

  const handleFileChange2 = (event) => {
    setSelectedFile2(event.target.files[0]);
    setImgShow2(false);

    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setSelectedImage2(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      console.log('Arquivo selecionado:', selectedFile);
      // Realizar envio do arquivo para o servidor
    } else {
      console.log('Nenhum arquivo selecionado.');
    }
  };
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
        setIsOpenForm(true);
        setIsOpenWhats(false);
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
  const handleOpenWhats = (event) => {
    event.preventDefault();
    if (dnResponsavel === '' || dnRazaoSocial === '' || dnNomeFantasia === '' || dnResponsávelpeloEstalecimento === '' || Email === '' || Cnpj === '') {
      console.log('campo vazio')
      // alert('O campo DN Responsável pelo Caminhão não pode estar vazio!');
      toast.error("Campo Vazio");
    } else {
      setIsOpenWhats(true);
      setIsOtherElementsOpen(false);
      setisHeader('CONTATO')
      setIsHeaderShow(true)
      setHistoryStack([...historyStack, "Whatsapp"]);
    } // Add "Whatsapp" to the historyStack
  };
  const handleOpenPhoto = (event) => {
    event.preventDefault();
    if (dnResponsavelWhats === '') {
      // console.log('campo vazio')
      toast.error("Campo Vazio");
    } else {
      setIsOpenPhoto(true);
      setIsOpenWhats(false);
      setHistoryStack([...historyStack, "Photo"]);
      setisHeader('FOTO EQUIPAMENTO') // Add "Photo" to the historyStack
    }
  };
  const handleOpenPhotoEsquerdo = (event) => {
    event.preventDefault();
    if (selectedFile === null) {
      toast.error("Insira uma imagem para continuar");
    } else {
      setIsOpenPhoto(false);
      setIsOpenPhotoEsquerdo(true);
      setHistoryStack([...historyStack, "PhotoEsquerdo"]);
    } // Add "PhotoEsquerdo" to the historyStack
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
  const handleOpenForm = () => {
    setIsOpenForm(true);
    setIsOtherElementsOpen(false);
    setisHeader('INFORMAÇOES')
    setIsHeaderShow(true)
    setHistoryStack([...historyStack, "Whatsapp"]); // Add "Whatsapp" to the historyStack
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
  const refreshNavigate = () => {
    navigate('/');
  };
  const refreshNavigateQuestion = (event) => {
    event.preventDefault();
    if (selectedFile2 === null) {
      toast.error("Insira uma imagem para continuar");
    } else {
      navigate('/questions');
    }
  };

  useEffect(() => {
    const resizeElement = () => {
      const element = document.getElementById('fullscreen-element');
      if (element) {
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
        element.style.width = `${windowWidth}px`;
        element.style.height = `${windowHeight}px`;
      }
    };

    window.addEventListener('resize', resizeElement);
    resizeElement();

    return () => {
      window.removeEventListener('resize', resizeElement);
    };
  }, []);

  const handleInputChange = (event) => {
    setDnResponsavel(event.target.value);
  };
  const handleInputChange1 = (event) => {
    setRazaoSocial(event.target.value);
  };
  const handleInputChange2 = (event) => {
    setNomeFantasia(event.target.value);
  };
  const handleInputChange3 = (event) => {
    setResponsávelpeloEstalecimento(event.target.value);
  };
  const handleInputChange4 = (event) => {
    setEmail(event.target.value);
  };
  const handleInputCnpj = (event) => {
    setCnpj(event.target.value);
  };
  const handleWhatsapp = (event) => {
    setWhatsappInput(event.target.value);
  };
  const handleDNInputChangeWhats = (event) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/\D/g, ''); // Filtra apenas os caracteres numéricos

    setDnResponsavelWhats(numericValue);
  };



  return (
    <>
      <Container>
        {isHeaderShow &&
          <Header pageTitle={isHeader} onGoBack={handleGoBack} />}
        <div className='WrapperContainer'>

          {isLoading ? (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '170px',
              width: '230px',
              height: '222px',
              border: '5px solid #fcd703',
              borderRadius: '188px', boxShadow: '39px 11px 15px rgba(0, 0, 0, 0.1)'
            }}>
              <img src={caminhao} alt="Carregando..." style={{ width: '104px', height: '89px' }} />
            </div>
          ) : (
            <>

              {/* {<RandomQuestions questions={questions} />} */}
              {isOtherElementsOpen && (
                <>
                  <ToastContainer theme='colored' transition={Zoom} autoClose={200000000000} hideProgressBar={true}></ToastContainer>
                  <img src={imgBottom} alt="Foto capturada" style={{ width: '263px', height: '152px' }} />
                  <form style={{ width: '96%', marginTop: '28px' }}>
                    <h1 syle={{ fontWeight: '600' }}>Para iniciar o questinonário - Identificação do cliente.</h1>
                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                      <label style={{ color: '#002755', fontSize: '18px', fontWeight: 'bold' }}>CNPJ</label>
                      <input type="text" className="linha-input" placeholder='' value={Cnpj} onChange={handleInputCnpj}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                      <label style={{ color: '#002755', fontSize: '18px', fontWeight: 'bold' }}>Nome</label>
                      <input type="text" className="linha-input" placeholder='' value={dnResponsavel} onChange={handleInputChange}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                      <label style={{ color: '#002755', fontSize: '18px', fontWeight: 'bold' }}>Razão Social</label>
                      <input type="text" className="linha-input" placeholder='' value={dnRazaoSocial} onChange={handleInputChange1} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                      <label style={{ color: '#002755', fontSize: '18px', fontWeight: 'bold' }}>Nome Fantasia</label>
                      <input type="text" className="linha-input" placeholder='' value={dnNomeFantasia} onChange={handleInputChange2} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                      <label style={{ color: '#002755', fontSize: '18px', fontWeight: 'bold' }}>Responsável pelo Estalecimento</label>
                      <input type="text" className="linha-input" placeholder='' value={dnResponsávelpeloEstalecimento} onChange={handleInputChange3} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                      <label style={{ color: '#002755', fontSize: '18px', fontWeight: 'bold' }}>Email</label>
                      <input type="text" className="linha-input" placeholder='' value={Email} onChange={handleInputChange4} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <button className="btn" onClick={handleOpenWhats} style={{ marginTop: '19px', height: '53px', width: '46%', cursor: 'pointer', color: 'white', background: '#002755', fontSize: '20px', border: 'none', borderRadius: '5px' }}>
                        CONTINUAR
                      </button>
                    </div>
                  </form>
                  <a onClick={refreshNavigate} style={{ color: '#002755', marginTop: '45px' }}>Voltar para o inicio</a>
                </>
              )}
            </>
          )}
          {isHomeMenuOpen && (
            <>
              <h2>Preenchimento Iniciado</h2>
              <p style={{ width: '68%' }}>As informações serão utilizadas para uso comercial e analítico dentro da plataforma VWCO. Você clicando em "Continuar" estará com consentimento do uso das informações na plataforma VWCO powred by TruckHelp.</p>
              <button className="btn" id="btnclick" onClick={handleOpenWhats}>
                CONTINUAR
              </button>
              <a onClick={refresh}>Voltar para o inicio</a>
            </>
          )}

          {isOtherOpenWhats && (
            <>
              <ToastContainer theme='colored' transition={Zoom} autoClose={200000000000} hideProgressBar={true}></ToastContainer>
              <HrWithIcon icon={''} />
              <img src={Whatsapp} alt="" style={{ width: '78px', height: '75px' }} />
              <p style={{ textAlign: 'center', width: '46%' }}>Contato de telefone por WhatsApp do responsável da empresa.</p>
              <input type="text" className="linha-input" placeholder='(DD) 9 9999-9999' style={{ marginTop: '75px' }}
                value={dnResponsavelWhats} onChange={handleDNInputChangeWhats}
              />
              <button className="btn" id="btnclick" onClick={handleOpenPhoto} style={{ marginTop: '19px', height: '53px', width: '46%', cursor: 'pointer', color: 'white', background: '#002755', fontSize: '20px', border: 'none', borderRadius: '5px', marginTop: '62px' }}>
                CONTINUAR
              </button>
            </>
          )}

          {isOpenPhoto && (
            <>
            <ToastContainer theme='colored' transition={Zoom} autoClose={2000} hideProgressBar={true}></ToastContainer>
              <HrWithIcon icon={''} />
              <img src={imgPhoto} alt="" style={{ width: '78px', height: '75px' }} />
              <p style={{ lineHeight: '26px', marginBottom: '30px', color: '#6c6c6c' }}>Registrar uma foto externa do equipamento Lado Direito.</p>
              <p style={{ color: 'black', fontWeight: 'bold', fontSize: '20px' }}>*TIRE UMA FOTO
                DO VEÍCULO.</p>
              {!photoData ? (
                <div style={{ display: 'flex', width: '69%', flexDirection: 'column', width: '97%' }}>

                  <div style={{ display: 'flex', justifyContent: 'center', }}>
                    {imgShow && <img src={iconeUpload} style={{ width: '131px', height: '124px' }} />}
                    {selectedFile && (
                      <div>
                        <img src={URL.createObjectURL(selectedFile)} alt="Pré-visualização" style={{ width: '131px', height: '124px' }} />
                      </div>
                    )}
                    <div style={{ display: 'flex', width: '69%', flexDirection: 'column', width: '97%' }}>
                      <label htmlFor="fileInput">
                        {selectedImage ? (
                          <img src={editar} alt="Imagem selecionada" style={{ width: '31px', height: '32px' }} />
                        ) : (
                          <img src={editar} alt="Imagem padrão" style={{ width: '31px', height: '32px' }} />
                        )}
                        <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} id="fileInput" />
                      </label>
                      <img src={remove} alt="Imagem padrão" style={{ width: '28px', height: '28px', marginTop: '62px' }} onClick={RemoveImageUpload} />
                      {/* <button onClick={RemoveImageUpload}>remover</button> */}
                    </div>
                  </div>

                  {/* {selectedFile && (
                    <div>
                      <h3>Pré-visualização:</h3>
                      <img src={URL.createObjectURL(selectedFile)} alt="Pré-visualização" style={{ maxWidth: '100%' }} />
                    </div>
                  )} */}
                  <div style={{ marginTop: '19px' }}>


                    <button onClick={handleOpenPhotoEsquerdo} style={{ marginTop: '13px', height: '41px', width: '46%', cursor: 'pointer', color: 'white', background: '#002755', fontSize: '20px', border: 'none', borderRadius: '5px' }}>Enviar</button>
                  </div>
                  <video ref={videoRef} autoPlay></video>
                  <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
                  <div style={{ display: 'flex', gap: '6px', marginTop: '15px' }}>
                    {/* <button onClick={handleStartCamera} style={{ width: '79%', height: '41px', width: '46%', cursor: 'pointer', color: 'white', background: '#002755', fontSize: '17px', border: 'none', borderRadius: '5px' }}>Iniciar Câmera</button>
                    <button onClick={handleCapture} style={{ width: '79%', height: '41px', width: '46%', cursor: 'pointer', color: 'white', background: '#002755', fontSize: '17px', border: 'none', borderRadius: '5px' }}>Capturar Foto</button>
                    <button onClick={handleStopCamera} style={{ width: '79%', height: '41px', width: '46%', cursor: 'pointer', color: 'white', background: '#002755', fontSize: '17px', border: 'none', borderRadius: '5px' }}>Parar Câmera</button> */}
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                  <img src={photoData} alt="Foto capturada" id="ImgRemove" style={{ width: '346px', height: '235px' }} />
                  {/* <video ref={videoRef} autoPlay></video> */}
                  {/* <button onClick={TirarOutraFoto} style={{width:'79%'}}>Tirar Outra Foto</button>
                <button onClick={handleCapture} style={{width:'79%'}}>Capturar Foto</button> */}
                  <button style={{ width: '59%', marginTop: '11px', height: '41px', width: '46%', cursor: 'pointer', color: 'white', background: '#002755', fontSize: '20px', border: 'none', borderRadius: '5px' }} className="btn" id="btnclick" onClick={handleOpenPhotoEsquerdo}>
                    CONTINUAR
                  </button>
                </div>
              )}
            </>
          )}

          {isOpenPhotoEsquerdo && (
            <>
            <ToastContainer theme='colored' transition={Zoom} autoClose={2000} hideProgressBar={true}></ToastContainer>
              <img src={imgPhoto} alt="" style={{ width: '78px', height: '75px' }} />
              <p>Registrar uma foto externa do equipamento Lado Esquerdo.</p>
              <p style={{ color: 'black', fontWeight: 'bold', fontSize: '20px' }}>*TIRE UMA FOTO
                DO VEÍCULO.</p>
              {!photoDataEsquerdo ? (
                <div style={{ display: 'flex', width: '69%', flexDirection: 'column', width: '97%' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', }}>
                    {imgShow2 && <img src={iconeUpload} style={{ width: '131px', height: '124px' }} />}
                    {selectedFile2 && (
                      <div>
                        <img src={URL.createObjectURL(selectedFile2)} alt="Pré-visualização" style={{ width: '131px', height: '124px' }} />
                      </div>
                    )}
                    <div style={{ display: 'flex', width: '69%', flexDirection: 'column', width: '97%' }}>
                      <label htmlFor="fileInput">
                        {selectedImage2 ? (
                          <img src={editar} alt="Imagem selecionada" style={{ width: '31px', height: '32px' }} />
                        ) : (
                          <img src={editar} alt="Imagem padrão" style={{ width: '31px', height: '32px' }} />
                        )}
                        <input type="file" accept="image/*" onChange={handleFileChange2} style={{ display: 'none' }} id="fileInput" />
                      </label>
                      <img src={remove} alt="Imagem padrão" style={{ width: '28px', height: '28px', marginTop: '62px' }} onClick={RemoveImageUpload} />
                      {/* <button onClick={RemoveImageUpload}>remover</button> */}
                    </div>

                    {/* {selectedFile2 && (
                    <div>
                      <h3>Pré-visualização:</h3>
                      <img src={URL.createObjectURL(selectedFile2)} alt="Pré-visualização" style={{ maxWidth: '100%' }} />
                    </div>
                  )} */}

                  </div>

                  <div style={{ marginTop: '19px' }}>
                    <button onClick={refreshNavigateQuestion} style={{ marginTop: '13px', height: '41px', width: '46%', cursor: 'pointer', color: 'white', background: '#002755', fontSize: '20px', border: 'none', borderRadius: '5px' }}>Enviar</button>
                  </div>
                  <video ref={videoRef} autoPlay></video>
                  <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
                  <div style={{ display: 'flex', gap: '6px' }}>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                  <img src={photoDataEsquerdo} alt="Foto capturada" style={{ width: '346px', height: '235px' }} />

                  <button className="btn" id="btnclick" onClick={refresh} style={{ marginTop: '19px', height: '41px', width: '46%', cursor: 'pointer', color: 'white', background: '#002755', fontSize: '17px', border: 'none', borderRadius: '5px' }}>
                    CONTINUAR
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </Container>
    </>
  );
};

export default HomeMenu;
