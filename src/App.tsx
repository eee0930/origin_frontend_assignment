import React from 'react';
import styled from 'styled-components';
import Modal from './components/Modal';
import Navbar from './components/Navbar';

const BackgroundContainer = styled.div`
  position: relative;
`;
const Title = styled.h3`
  width: 400px;
  position: absolute;
  top: 128px;
  left: 0;
  right: 0;
  margin: 0 auto;
  color: ${(props) => props.theme.$brandColorPrimary};
  font-size: 20px;
  text-align: center;
  padding: 20px;
  font-family: Work Sans;
  span {
    font-weight: 600;
  }
`;

export function App(): JSX.Element {
  return (
    <BackgroundContainer>
      <Navbar />
      <Title>
        Let's plan your <span>saving goal</span>.
      </Title>
      <Modal></Modal>
    </BackgroundContainer>
  );
}
