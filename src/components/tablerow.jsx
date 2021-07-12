import { db } from '../services/firebase'
import { toast } from 'react-toastify'
import { NavLink } from 'react-router-dom'

const Tablerow = ({ id, model, price, brand, cor } ) => {

    const apagarRegistro = async (e) => {
        console.log(id)

        if (window.confirm('Tem certeza que você quer apagar esse registro?')) {
            await db.collection('celulares').doc(id).delete();
            toast('Registro removido', {
                type: 'error'
            })
        } else {
            toast('Registro não removido', {
                type: 'info'
            })
        }
    }

   

    return (
        <tr>
            <td>{id}</td>
            <td>{model}</td>
            <td>{price}</td>
            <td>{brand}</td>
            <td>{cor}</td>
            <td>
                <button className="buttom-modificar" > 
                <NavLink  exact to={`/modificar/${id}`}>
                <i className="fas fa-pencil-alt"></i>
                </NavLink>
                </button>
            </td>

            <td>
               <button className="buttom-delete" onClick={() => apagarRegistro(id)}>
                <i className="fas fa-trash-alt"></i>
               </button>
            </td>
        </tr>
    )
}

export default Tablerow
