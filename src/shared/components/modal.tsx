import React, { useRef } from 'react';
import styled from '@emotion/styled';

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  text-align: center;
`;

interface ModalProps {
  open: boolean; 
  onClose: () => void; 
  title: string;
  children: React.ReactNode; 
}


const Modal: React.FC<ModalProps> = ({ open, onClose, title, children }) => {
  const modalBackground = useRef<HTMLDivElement>(null);

  if (!open) return null;

  return (
    <ModalContainer
      ref={modalBackground}
      onClick={(e) => {
        if (e.target === modalBackground.current) {
          onClose();
        }
      }}
    >
      <ModalContent>
        <h2>{title}</h2>
        <p>{children}</p>
        <button onClick={onClose}>닫기</button>
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;
