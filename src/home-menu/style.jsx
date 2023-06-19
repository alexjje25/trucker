import styled from "styled-components";


export const Container = styled.form`
  width: 100%;
  height: 100vh;

.WrapperContainer{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}  
  .wrapperMenuOpen{
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100vh; /* Use 100vh para ocupar a altura total da tela */
    background: white;
    position: absolute;
    top: 0;
    left: 0;
  }

  .checkListInicial {
    position: relative;
    width: 98%;
    height: 113px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-top: 62px;

    p{
      z-index: 999;
      font-weight: 700;
      font-size: 15px;
      line-height: 0;
      color: white;
    }
  }
  
  .checkListInicial::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://truckhelp.com.br/checklist/appseguro/images/pictures/28.jpg') center/cover no-repeat;
  }
  
  .checkListFinal {
    position: relative;
    width: 98%;
    height: 113px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    

    p{
      z-index: 999;
      font-weight: 700;
      font-size: 15px;
      line-height: 0;
      color: white;
    }
  }
  
  .checkListFinal::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://truckhelp.com.br/checklist/appseguro/images/pictures/25.jpg') center/cover no-repeat;
  }

  btn{
      background: #002755;
      color: white;
      width: 32%;
      height: 40px;
      border-radius: 4px;
      border: none;

  }

  .linha-input {
    border: none;
    border-left: none;
    border-bottom: 1px solid #c2c5ff;
    outline: none;
    width: 92%;
    border-radius: 0px;
    font-size: 20px;
    margin-top:15px;
  }

  h1{
    font-family: 'Poppins',sans-serif;
    letter-spacing: -0.3px;
    font-weight: 500;
    text-align: center;
    font-size: 24px;
    margin-top: 2px;

  }
  img{
    width: 320px;
    height: 110px;
  }

  // button{
  //   background: #002755;
  //   color: white;
  //   width: 53%;
  //   height: 67px;
  //   border-radius: 4px;
  //   border: none;
  //   cursor: pointer;
  //   font-size: 21px;
  // }

  hr {
    border: none;
    border-top: 1px solid #002755;
    width: 50%;
  }

  .divider {
    position: relative;
    height: 1px;
    background-color: #000;
    margin: 20px 0;
  }

  .divider::before {
    content: "\f058"; /* Código unicode do ícone */
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    background-color: #fff;
    border: 1px solid #000;
    border-radius: 50%;
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    font-size: 12px;
    color: #000;
  }

  



  `;

  export const MenuOpen = styled.div`


  .wrapperMenuOpen{
    display: flex;
    justifyContent: center;
    width: 100%;
    background: black;
    position: absolute;
  }
  `;
