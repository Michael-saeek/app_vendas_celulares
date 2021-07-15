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

    function identificacao() {
        const ID = id.substr(0,8)
        return ID
    }


    return (
        <tr>
            <td data-title="Codigo">{identificacao()}</td>
            <td data-title="Modelo">{model}</td>
            <td data-title="Preço">{price}</td>
            <td data-title="Marca">{brand}</td>
            <td data-title="Cor">{cor}</td>
            <td className="acoes-btn">
                <NavLink  exact to={`/modificar/${id}`}>
                    <button className="buttom-modificar" > 
                    <i className="fas fa-pencil-alt"></i>
                    </button>
                </NavLink>

                <button className="buttom-delete" onClick={() => apagarRegistro(id)}>
                <i className="fas fa-trash-alt"></i>
               </button>
            </td>

        </tr>
    )
}

export default Tablerow
