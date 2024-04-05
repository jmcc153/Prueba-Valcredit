import { useForm } from "react-hook-form";
import styles from "./login.module.scss";
import { LoginContext } from "contexts/LoginContext";
import { modalContext } from "contexts/modalContext";
import { useContext } from "react";
import CryptoJS from 'crypto-js';
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { register, handleSubmit, formState:{errors}  } = useForm();
  const {setIsLogged} = useContext(LoginContext);
  const {setIsModalAlert} = useContext(modalContext);
  const navigate = useNavigate();


  const onSubmit = (data) => {
    if (data.user === 'admin' && data.password === 'admin') {
      setIsLogged(true);
      let hash = CryptoJS.SHA256(data.password).toString();
      data.password = hash;
      localStorage.setItem('admin', JSON.stringify(data));
      navigate('/listusers');
    }
    else{
      setIsModalAlert({
        isOpen: true,
        title: 'Error',
        message: 'Usuario o contraseña incorrectos'
      })
    }
  }

  return (
    <div className={styles.container}>
      <h1>IRIS LOGIN</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.containerInput}>
          <input type="text" placeholder="Username" {...register('user', {required: {value: true, message: 'Este campo es requerido'}})} />
          {errors.user && <p className={styles.errorMessage}>{errors.user.message}</p>}
        </div>
        <div className={styles.containerInput}>
          <input type="password" placeholder="Password" {...register('password', {required: {value: true, message: 'Este campo es requerido'}})} />
          {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
