import { NavLink, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { db } from '../services/firebase'
import { toast } from 'react-toastify'
import '../assets/styles/pageadicionar/adicionar.css'


const Form_modificar = () => {

   const initialStateCadastrar = {
        model: '',
        price: '',
        brand: '',
        startDate: '',
        endDate: '',
        cor: ''
    }
    const [ produto, setProduto ] = useState(initialStateCadastrar)
    
    const handleInputChange = (e) => {
       const { name, value } = e.target
       console.log(name, value)
       setProduto({...produto, [name]:value});
       
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(produto)

        if (currentId === '') {
            adicionarCadastro(produto);
        } else {
            modificacaoCelular(produto);
        }
        
    }

    const modificacaoCelular = async (produto) => {
       await db.collection('celulares').doc(currentId).update(produto)
       toast('Produto modificado', {
           type: 'success'
       })

       setProduto(initialStateCadastrar)
    }

    const adicionarCadastro = async (produto) => {
       await db.collection('celulares').doc().set(produto);
       console.log('Novo celular adicionado')
       setProduto({...initialStateCadastrar}) //limpar campos do formulario
       toast('Celular Cadastro com Sucesso', {
           type: 'success'
       })
    }


    /* Vamos obter os dados do objeto salvado na db para atualização */
   const { id } = useParams();
    const currentId = id
   

   useEffect(() => {
    verificacaoId()
   }, []);

    const getInfoById = async (id) => {
       const doc = await db.collection('celulares').doc(id).get();
       console.log(doc.data())
       setProduto(doc.data())
    }

    const verificacaoId = () => {
        if (currentId === '') {
            setProduto(initialStateCadastrar)
        } else {

            toast('Modo edição', {
                type: 'info'
            })
            getInfoById(currentId)  
        }
    }

    return (
      
        <form action="POST" className="container_adicionar" onSubmit={handleSubmit}>
            <label className="title_detalhesProduto">Detalhes do produto</label>

            <section className="list_columns">

                <div className="column1">
                    <label name="model" className="title-input">Modelo</label>
                    <input type="text" name="model" className="input" placeholder="XT2041-1" onChange={handleInputChange} value={produto.model}/>

                    <label className="title-input">Cor</label>
                    <select name="cor" className="options" onChange={handleInputChange}>
                        <option value={produto.cor}>{produto.cor}</option> 
                        <option value="BLACK">BLACK</option> 
                        <option value="WHITE">WHITE</option> 
                        <option value="GOLD">GOLD</option> 
                        <option value="PINK">PINK</option> 
                    </select>
                    <label className="title-input">Inicio das vendas</label>
                    <input type="date" name="startDate" className="input" placeholder="15/03/2020" onChange={handleInputChange} value={produto.startDate}/>
                </div>

                <div className="column2">
                    <label className="title-input">Marca</label>
                    <input 
                    type="text" 
                    name="brand" 
                    className="input"
                    placeholder="Motorola" 
                    onChange={handleInputChange} 
                    value={produto.brand}/>

                    <label className="title-input">Preço</label>
                    <input type="number" name="price" className="input" placeholder="1.400,00" onChange={handleInputChange} value={produto.price}/>

                    <label className="title-input">Fin das vendas</label>
                    <input type="date" name="endDate" className="input" placeholder="14/06/2020" onChange={handleInputChange} value={produto.endDate}/>
                </div>

            </section>

            <div className="list-buttons">
        
                <NavLink exact to="/" className="buttonProduto">
                    VOLTAR
                </NavLink>

                <button type="submit" className="buttonProduto">
                    MODIFICAR
                </button>
            </div>
        </form>
    )
}

export default Form_modificar
