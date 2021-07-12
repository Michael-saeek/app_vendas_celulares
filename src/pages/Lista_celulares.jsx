import { useState, useEffect } from 'react'
import Tablerow from '../components/tablerow'
import Button from '../components/button'
import { db } from '../services/firebase'

import '../assets/styles/lista_celulares/listacelulares.css'


const Lista_celulares = () => {

const [ data, setData ] = useState([]);  // cada vez que getting traga os dados, o state vai ser atualizado

const gettingData =  async () => {

    db.collection('celulares').onSnapshot((querySnapshot) => {
        const elements = []
            querySnapshot.forEach(doc => {
                elements.push({...doc.data(), id: doc.id})
        });
        setData(elements)
    });
  
}

useEffect(() => {
    gettingData();
}, [])

console.log(data)

    return (
        <div className="container_celulares">

            <div className="table-encabecalho">
            <h2>Produtos</h2>
            <Button className="buttonAdicionar" value='ADICIONAR' url="/adicionar" icon1="fas fa-plus" icon2="fas fa-mobile-alt"/>
                
            </div>
            
            <table>
                <thead>
                    <tr>
                        <td>Codigo</td>
                        <td>Modelo</td>
                        <td>Preço</td>
                        <td>Marca</td>
                        <td>Cor</td>
                        <td></td>
                        <td></td>
                    </tr>
                </thead>

                <tbody>
                     {  data.map(e => {
                             return <Tablerow key={e.id}
                             id={e.id} 
                             model={e.model} 
                             price={e.price} 
                             brand={e.brand}
                             cor={e.cor}
                             />
                         }) 
                     }

                </tbody>

            </table>
        </div>
    )
}

export default Lista_celulares;