import styles from './table.module.scss';
import { FiEdit, FiPlusCircle, FiTrash2 } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';


export const Table = ({data, labels, handleDelete = () => {}, handleEdit= () => {}, isbtnVisible=true, handleCreate}) => {
  const navigate = useNavigate();

  return (
    <>
      <table>
        <thead>
          <tr>
            {labels.map((label, index) => (
              <th key={index}>{label}</th>
            ))}
            {isbtnVisible&&<th><FiPlusCircle onClick={() => handleCreate()}/></th>}
          </tr>
        </thead>
        <tbody>
          {
            data.map((user,index) => {
              return <tr key={index}>
                {Object.entries(user).map(([key,value]) => (
                  key == 'status' ? <td className={user.status == 'Pagado' ? styles.paid : styles.pending} key={key}>{value}</td> : <td key={key}>{value}</td>
              ))
            }
          {isbtnVisible&& (<><td><button onClick={() => navigate(`/listusers/${user.numberId}`)}>Ver detalles</button></td>
          <td onClick={() => handleEdit(user.numberId)}><FiEdit /></td>
          <td onClick={() => handleDelete(user.numberId)}><FiTrash2 /></td></>)
          }
              </tr>
            })
          }
        </tbody>
      </table>
    </>
  )
}
