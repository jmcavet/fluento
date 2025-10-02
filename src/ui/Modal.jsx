import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";
import tw from "tailwind-styled-components";

// const StyledModal = styled.div`
//   position: fixed;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   padding: 2rem 1rem;
//   transition: all 0.5s;
// `;

const StyledModal = tw.div`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
         w-11/12 max-w-3xl p-4 transition-all duration-500 bg-white rounded-lg shadow-lg`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 1.8rem;
    height: 1.8rem;
    color: var(--color-grey-500);
  }
`;

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal
        ref={ref}
        className="bg-neutral-100 dark:bg-neutral-900 rounded-xl shadow"
      >
        <Button onClick={close}>
          <CloseIcon />
        </Button>
        {cloneElement(children, { onCloseModal: close })}
      </StyledModal>
    </Overlay>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
