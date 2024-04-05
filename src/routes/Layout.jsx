import { useContext } from 'react'
import { modalContext } from 'contexts/modalContext';
import { Outlet } from 'react-router-dom';
import { ModalAlert } from 'components/modalAlert/ModalAlert';

export const Layout = () => {

  const {isModalAlert} = useContext(modalContext);
  return (
    <div>
      {isModalAlert.isOpen && <ModalAlert />}
      <Outlet />
    </div>
  )
}
