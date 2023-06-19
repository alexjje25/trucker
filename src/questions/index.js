import React, { useEffect, useState } from 'react';
import data from './perguntas.json';
import imgBottom from '../../src/assets/imagens/iconBottom.png';
import Select from 'react-select';

function MyComponent() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar o loader
  const currentQuestion = data.questions[currentQuestionIndex];

  const handleNextQuestion = () => {
    if (currentQuestionIndex < data.questions.length - 1) {
      setIsLoading(true); // Ativa o loader
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setIsLoading(false); // Desativa o loader após a operação assíncrona
      }, 500);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setIsLoading(true); // Ativa o loader
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        setIsLoading(false); // Desativa o loader após a operação assíncrona
      }, 500);
    }
  };

  useEffect(() => {
    console.log(data);
  }, []);

  const options = currentQuestion
    ? currentQuestion.answers.map(answer => ({
        value: answer.label,
        label: answer.label
      }))
    : [];

  const handleSelectChange = selectedOption => {
    setSelectedAnswers(prevState => ({
      ...prevState,
      [currentQuestionIndex]: selectedOption
    }));
  };

  const getSelectedAnswer = () => {
    return selectedAnswers[currentQuestionIndex] || null;
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
      <img src={imgBottom} alt="Foto capturada" style={{ width: '263px', height: '152px' }} />
      {isLoading ? ( // Renderiza o texto "Carregando..." durante o carregamento
        <div>Carregando...</div>
      ) : (
        <>
          {currentQuestion && (
            <div style={{ width: '94%' }}>
              <p style={{ fontSize: '23px', textAlign: 'center', color: '#002755', fontWeight: 'bold' }}>
                {currentQuestion.pergunta}
              </p>
              <p>Subtítulo: {currentQuestion.subtitle}</p>

              <Select options={options} value={getSelectedAnswer()} onChange={handleSelectChange} />
            </div>
          )}
          <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around', marginTop: '40px' }}>
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              style={{
                height: '51px',
                width: '30%',
                border: '1px solid black',
                cursor: 'pointer',
                background: 'white',
                color: 'black',
                fontSize: '17px',
                borderRadius: '4px'
              }}
            >
              Anterior
            </button>
            <button
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === data.questions.length - 1}
              style={{
                height: '51px',
                width: '30%',
                border: '1px solid black',
                cursor: 'pointer',
                background: 'white',
                color: 'black',
                fontSize: '17px',
                borderRadius: '4px'
              }}
            >
              Próxima
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default MyComponent;
