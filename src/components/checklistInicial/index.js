import React, { useState } from 'react';
import styled from 'styled-components';
import { HomeMenuContainer, InputWrapper, Label, Input } from './style';
import HrWithIcon from '../divider';


const ChecklistInicial = ({ onClose }) => {
    const [showItems, setShowItems] = useState(true);
    const [showItemsForm, setShowItemsForm] = useState(false);

    const handleClick = () => {
        setShowItems(false);
        setShowItemsForm(true); // Define showItems para false após o clique
    };
    const handleClickForm = () => {
        setShowItemsForm(false); // Define showItems para false após o clique
    };

    return (

        <HomeMenuContainer>
            {showItems ? (
                <>
                    <h1>testadwdwadwae</h1>
                    <button onClick={handleClick}>
                        teste
                    </button></>
            ) : null}

            {showItemsForm && (

                <>
                <HrWithIcon icon={''} />
                <h2>Informe os dados:</h2><InputWrapper>
                    <Label>CNPJ:</Label>
                    <Input className="input-linha" type="text" />
                </InputWrapper><InputWrapper>
                        <Label>Razão Social:</Label>
                        <Input className="input-linha" type="text" />
                    </InputWrapper><InputWrapper>
                        <Label>Nome Fantasia:</Label>
                        <Input className="input-linha" type="text" />
                    </InputWrapper><InputWrapper>
                        <Label>Responsável:</Label>
                        <Input className="input-linha" type="text" />
                    </InputWrapper><InputWrapper>
                        <Label>E-mail:</Label>
                        <Input className="input-linha" type="email" />
                    </InputWrapper><button onClick={onClose}>Fechar</button></>

            )}
        </HomeMenuContainer>

    );
};

export default ChecklistInicial;
