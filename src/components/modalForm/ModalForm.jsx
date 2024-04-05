import styles from './modalForm.module.scss';
import { FiXCircle } from 'react-icons/fi';
import { modalContext } from 'contexts/modalContext';
import { useContext } from 'react';
import { LoginContext } from 'contexts/LoginContext';
export const ModalForm = ({register, handleSubmit, errors,isEdit, userEdit}) => {
  
  const { setIsOpen, setIsModalAlert } = useContext(modalContext)
  const {isUser,setIsUser} = useContext(LoginContext);

  const options = [
    { value: 'Cedula de ciudadania', label: 'Cedula de ciudadania' },
    { value: 'Cedula de extranjeria', label: 'Cedula de extranjeria' },
    { value: 'Tarjeta de identidad', label: 'Tarjeta de identidad' }
  ]
  const inputs = [
    { type: 'number', name: 'numberId', label: 'Numero de identificacion', pattern: { value: /^[0-9]*/, message: 'Solo se permiten números' }},
    { type: 'text', name: 'name', label: 'Nombre', pattern: { value: '', message: '' }},
    { type: 'text', name: 'lastName', label: 'Apellido',pattern: { value: '', message: '' } },
    { type: 'date', name: 'birthdayDate', label: 'Fecha de nacimiento', pattern: { value: '', message: '' } },
    { type: 'number', name: 'age', label: 'Edad', pattern: { value: /^\d{1,3}$/, message: 'Máximo 3 dígitos' }},
    { type: 'email', name: 'email', label: 'Correo electronico', pattern: { value: '', message: '' } },
    { type: 'number', name: 'phoneNumber', label: 'Numero de telefono', pattern: { value: /^\d{10}$/, message: 'Debe insertar 10 dígitos' }}
  ]
  const onSubmit = (data) => {
    data.numberId = parseFloat(data.numberId)
    data.age = parseInt(data.age)
    data.phoneNumber = parseInt(data.phoneNumber)
    if(isEdit){
      const users = JSON.parse(localStorage.getItem('users'))
      const newUser = users.map(user => {
        if(user.numberId === userEdit.numberId){
          if(user.birthdayDate !== data.birthdayDate){
            const date = new Date(data.birthdayDate)
            data.age = new Date().getFullYear() - date.getFullYear()
          }
          return {
            ...user,
            ...data
          }
        }
        return user
      })
      localStorage.setItem('users', JSON.stringify(newUser))
      setIsOpen(false)
      setIsModalAlert({
        isOpen: true,
        title: 'Usuario editado',
        message: 'El usuario ha sido editado exitosamente'
      })
      setIsUser(!isUser)
      return
    }
    const users = JSON.parse(localStorage.getItem('users')) || []
    if(users.find(user => user.numberId === data.numberId)){
      setIsModalAlert({
        isOpen: true,
        title: 'Error',
        message: 'El usuario ya existe'
      })
      return
    }
    const newUser = [
      ...users,
      {
        ...data,
        liquidation:[
          {
            "month": "Enero",
            "administration": 0,
            "parking": 0,
            "statusAdmin": "true",
            "statusParking": "true"
          },
          {
            "month": "Febrero",
            "administration": 0,
            "parking": 0,
            "statusAdmin": "true",
            "statusParking": "true"
          },
          {
            "month": "Marzo",
            "administration": 0,
            "parking": 0,
            "statusAdmin": "true",
            "statusParking": "true"
          }
        ]
      }
    ]
    localStorage.setItem('users', JSON.stringify(newUser))
    setIsOpen(false)
    setIsModalAlert({
      isOpen: true,
      title: 'Usuario creado',
      message: 'El usuario ha sido creado exitosamente'
    })
    setIsUser(!isUser)
  }






  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <FiXCircle onClick={() => setIsOpen(false)} className={styles.close} />
        <form onSubmit={handleSubmit(onSubmit)} className={styles.containerInput}>
          <label htmlFor="typeId">Tipo de documento</label>
          <select {...register('typeId', { required:  {value: true, message: 'Este campo es requerido'} })} name="typeId" id="typeId">
            {options.map((option, index) => (
              <option key={index} value={option.value}>{option.label}</option>
            ))}
          </select>
          {errors.typeId && <p className={styles.errorMessage}>{errors.typeId.message}</p>}
          {inputs.map((input, index) => (
            <div className={styles.containerInput} key={index}>
              <label htmlFor={input.name}>{input.label}</label>
              <input type={input.type} {...register(input.name, {required: {value: true, message: 'Este campo es requerido'}, pattern: {value: input.pattern.value, message: input.pattern.message} })} name={input.name} id={input.name} />
              {errors[input.name] && <p className={styles.errorMessage}>{errors[input.name].message}</p>}
            </div>
          ))}
          <button type="submit">Guardar</button>
        </form>
      </div>
    </div>
  )
}
