import { FaUserAlt } from "react-icons/fa";
import { useParams } from "react-router-dom"
import styles from './detailsUser.module.scss';
import { Sidebar } from "components/sidebar/Sidebar";
import { Table } from "components/table/Table";
import { Pagination } from "components/pagination/Pagination";
import { useState } from "react";


export const DetailsUser = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const {id} = useParams();
  const userInfo = JSON.parse(localStorage.getItem('users')).find(user => user.numberId == id);
  const headerLabels = ["Mes", 'Valor', 'Estado']
  const dataFilter = () => {
    const administration = userInfo.liquidation.map(liquidation => {
      return {
        month: liquidation.month,
        value: `$ ${liquidation.administration}`,
        status: liquidation.statusAdmin == 'true' ? 'Pagado' : 'Pendiente'
      }
    })
    const parking = userInfo.liquidation.map(liquidation => {
      return {
        month: liquidation.month,
        value: `$ ${liquidation.parking}`,
        status: liquidation.statusParking == 'true' ? 'Pagado' : 'Pendiente'
      }
    })
    return {administration, parking}
  }

  const paginatedItemsAdmin = () => {
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    return dataFilter().administration.slice(indexOfFirstItem, indexOfLastItem)
  }

  const paginatedItemsParking = () => {
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    return dataFilter().parking.slice(indexOfFirstItem, indexOfLastItem)
  }

  return (
    <div className={styles.container}>
      <Sidebar arrowBack={true}/>
      <div className={styles.containerInfo}>
        <h1>Información de {userInfo.name}</h1>
        <div className={styles.info}>
          <FaUserAlt className={styles.imgProfile} />
          <div className={styles.details}>
            <h2>{userInfo.name} {userInfo.lastName}</h2>
            <p><strong>Edad:</strong> {userInfo.age}</p>
            <p><strong>Correo electronico:</strong> {userInfo.email}</p>
            <p><strong>Numero de telefono:</strong> {userInfo.phoneNumber}</p>
          </div>
        </div>
        <div className={styles.containerTables}>
          <div className={styles.containerTable}>
            <h2>Administración de {userInfo.name}</h2>
            <Table data={paginatedItemsAdmin()} labels={headerLabels} isbtnVisible={false} />
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} itemsPerPage={itemsPerPage} data={dataFilter().administration} />
          </div>
          <div className={styles.containerTable}>
            <h2>Parqueadero de {userInfo.name}</h2>
            <Table data={paginatedItemsParking()} labels={headerLabels} isbtnVisible={false} />
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} itemsPerPage={itemsPerPage} data={dataFilter().parking} />
          </div>
        </div>
      </div>
    </div>
  )
}
