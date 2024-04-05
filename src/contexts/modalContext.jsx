import { createContext, useState } from "react";

export const modalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalAlert, setIsModalAlert] = useState({
    isOpen: false,
    title: "",
    message: "",
  });
  return (
    <modalContext.Provider value={{isOpen, setIsOpen, isModalAlert, setIsModalAlert}}>{children}</modalContext.Provider>
  );
}
