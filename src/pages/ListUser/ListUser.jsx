import { Sidebar } from "components/sidebar/Sidebar"
import styles from './listUser.module.scss'
import { Table } from "components/table/Table"
import { useContext, useEffect, useState } from "react";
import { Pagination } from "components/pagination/Pagination";
import { LoginContext } from "contexts/LoginContext";
import { ModalForm } from "components/modalForm/ModalForm";
import { modalContext } from "contexts/modalContext";
import { useForm } from "react-hook-form";

export const ListUser = () => {
  const { register, setValue, handleSubmit, formState:{errors}, reset } = useForm();
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const [data, setData] = useState([{}])
  const {isUser} = useContext(LoginContext);
  const {isOpen, setIsOpen, setIsModalAlert} = useContext(modalContext)
  const [isEdit, setIsEdit] = useState(false)
  const [userEdit, setUserEdit] = useState([{}])




  useEffect(() => {
    setData(JSON.parse(localStorage.getItem('users')) || [{}])
  }, [isUser])


  const handleDelete = (id) => {
    const users = JSON.parse(localStorage.getItem('users'));
    const newUsers = users.filter(user => user.numberId !== id);
    localStorage.setItem('users', JSON.stringify(newUsers));
    setData(newUsers);
    setIsModalAlert({
      isOpen: true,
      title: 'Usuario eliminado',
      message: 'El usuario ha sido eliminado exitosamente'
    })
  }
  const handleCreate = () => {
    setIsOpen(true)
    setIsEdit(false)
    reset()
  }
  const handleEdit = (id) => {
    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(user => user.numberId === id);
    setUserEdit(user)
    setIsOpen(true)
    setValue('typeId', user.typeId)
    setValue('numberId', user.numberId)
    setValue('name', user.name)
    setValue('lastName', user.lastName)
    setValue('birthdayDate', user.birthdayDate)
    setValue('age', user.age)
    setValue('email', user.email)
    setValue('phoneNumber', user.phoneNumber)
    setIsEdit(true)
  }
  const headerLabels = ["Tipo", 'Numero de identificacion', 'Nombre', 'Apellido', 'Fecha de nacimiento', 'Edad', 'Correo electronico', 'Numero de telefono', '', ''];

  const dataFilter = () => {
    const users = data;
    return users.map(user => {
      return {
        typeId: user.typeId,
        numberId: user.numberId,
        name: user.name,
        lastName: user.lastName,
        birthdayDate: user.birthdayDate,
        age: user.age,
        email: user.email,
        phoneNumber: user.phoneNumber
      }
    })
  }

  const paginatedItems = () => {
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    return dataFilter().slice(indexOfFirstItem, indexOfLastItem)
  }

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.containerInfo}>
        <h1>Bienvenido</h1>
        <h2>Información propietarios edificio IRIS</h2>
        <div className={styles.containerTable}>
          <Table data={paginatedItems()} labels={headerLabels} handleDelete={handleDelete} handleEdit={handleEdit} handleCreate={handleCreate} />
        </div>
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} itemsPerPage={itemsPerPage} data={data} />
      </div>
      {isOpen &&
      <ModalForm
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
      isEdit={isEdit}
      userEdit={userEdit}
      />}
    </div>
  )
}
