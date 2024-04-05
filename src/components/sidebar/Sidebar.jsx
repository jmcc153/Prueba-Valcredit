import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './sidebar.module.scss';
import { FiArrowLeft, FiMenu, FiX  } from "react-icons/fi";
import { LoginContext } from 'contexts/LoginContext';
import { Link } from 'react-router-dom';

export const Sidebar = ({ arrowBack = false}) => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const { setIsLogged } = useContext(LoginContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLogged(false);
    localStorage.removeItem('admin');
    localStorage.removeItem('users');
  }
  return (
    <>
      <div  className={!sidebar ? styles.containerHambIcon : styles.hidden}>
        <FiMenu onClick={showSidebar}  />
        {arrowBack && <FiArrowLeft  onClick={() => navigate('/listUsers')} />}
      </div>
      <div className={sidebar ? `${styles.sidebar} ${styles.active}` : styles.sidebar}>
        <div className={styles.sidebarItems}>
          <FiX onClick={showSidebar} />
          <h1>IRIS</h1>
            <ul className={styles.items}>
              <li>
                <Link to={'/listUsers'}>Propietarios</Link>
              </li>
            </ul>
        </div>
        <div className={styles.logout}>
          <button onClick={handleLogout}>Cerrar sesion</button>
        </div>
      </div>
    </>
  )
}
