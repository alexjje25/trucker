import styled from "styled-components";


export const Container = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 100px;

  .linha-input {
    border: none;
    border-bottom: 1px solid #c2c5ff;
    outline: none;
    width: 90%;
    margin-top: 82px;
    font-size: 23px;
  }

  h1{
    font-family: 'Poppins',sans-serif;
    letter-spacing: -0.3px;
    font-weight: 500;
    text-align: center;
    font-size: 27px;
  }
  img{
    width: 320px;
    height: 110px;
  }

  .btnWrapper{
    background: #002755;
    color: white;
    width: 80%;
    height: 74px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    margin-top: 76px;
    box-shadow: 0 5px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.08);
    font-size: 19px;
    font-weight: 800;
  }

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

