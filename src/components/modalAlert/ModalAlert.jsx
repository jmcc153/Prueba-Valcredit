import { useContext } from 'react';
import { modalContext } from 'contexts/modalContext';
import styles from './modalAlert.module.scss'

export const ModalAlert = () => {
  const {isModalAlert,setIsModalAlert} = useContext(modalContext);
  const handleClose = () => {
    setIsModalAlert({
      ...isModalAlert,
      isOpen: false
    });
  }

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <h2>{isModalAlert.title}</h2>
        <p>{isModalAlert.message}</p>
        <button onClick={() => handleClose()}>Ok</button>
      </div>
    </div>
  )
}
