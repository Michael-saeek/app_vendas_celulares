import { NavLink} from 'react-router-dom'
import { useState, useEffect } from 'react';
import { db } from '../services/firebase'
import { toast } from 'react-toastify'
import Input from '../components/input';
import '../assets/styles/pageadicionar/adicionar.css'


const Form_adicionar = () => {

    const initialStateCadastrar = {
        model: '',
        price: '',
        brand: '',
        startDate: '',
        endDate: '',
        cor: '',
        isValid: null
    }

    const [ produto, setProduto ] = useState(initialStateCadastrar)

   const [ model, setModel ] = useState({
    campo: '',
    isValid: 'null'
   })

   const [ price, setPrice ] = useState({
    campo: '',
    isValid: 'null'
   })

   const [ brand, setBrand ] = useState({
    campo: '',
    isValid: 'null'
   })

   const [ startDate, setstartDate ] = useState({
    startDate: '',
    isValid: 'null'
   })

   const [ endDate, setendDate ] = useState({
    endDate: '',
    isValid: 'null'
   })

   const [ cor, setCor ] = useState({
    campo: '',
    isValid: 'null'
   })


   const validacaoCor = () => {
       if (cor.campo === "BLACK" || cor.campo === "WHITE" || cor.campo === "GOLD" || cor.campo === "PINK") {
           setCor({...cor, isValid: true})
      
       } else {
           setCor({...cor, isValid: false})
         
       }

   }

    const selectChangeCor = () => {
        if (cor.isValid === 'null') {
            return 'options'
        } else {
            if (cor.isValid === true) {
                return 'options options_valido'
            } else {
                return 'options options_invalido'
            }
        }
    }

    const regexValidacao = {
        model: /[a-zA-Z0-9\S]{2,255}/,
        price: /([0-9\.])[^\-]/,
        brand: /[a-zA-Z0-9\S]{2,255}/
    }

    const handleOptionsChange = (e) => {
        setCor({...cor, campo: e.target.value})
        console.log(e.target.value)
    }



    // Validando os campos Inputs Dates
    const changeInputData = (e, estado, mudarEstado) => {
        const { name, value } = e.target
        mudarEstado({...estado, [name]: value})
        console.log(e.target.value)
      
    }

    const validarDates = () => {
        const restricaoData = new Date('2018-12-25')
        const strDt = new Date(startDate.startDate)
        const endDt = new Date(endDate.endDate)
        
        if (strDt.getTime() > restricaoData.getTime()) {
            setstartDate({...startDate, isValid: true});
            
            if(endDt.getTime() > strDt.getTime()) {
                setendDate({...endDate, isValid: true});
            } else {
                setendDate({...endDate, isValid: false});
            }

        } else {
            setstartDate({...startDate, isValid: false});
        }


    }

    const dateCorChange = (estado) => {
        if (estado.isValid === 'null') {
            return 'input'
        } else {
            if (estado.isValid === true) {
                return 'input input_valido'
            } else {
                return 'input input_invalido'
            }
        }
    }


    // Adicionar Produto    

    const handleSubmit = (e) => {
        e.preventDefault();

        if (model.isValid === true && 
            price.isValid === true && 
            brand.isValid === true && 
            startDate.isValid === true &&
            endDate.isValid === true && 
            cor.isValid === true) 
            {
               setProduto({...produto, 
                model: model.campo,
                price: price.campo,
                brand: brand.campo,
                startDate: startDate.startDate,
                endDate: endDate.endDate,
                cor: cor.campo,
                isValid: true
            })

           

            } 
            
            else {
                toast('Percebemos algum erro nos dados ingresados, valide novamente', {
                    type: 'error'
                })
            }

            

    }

          
    const adicionarCadastro = async () => {

        if(produto.isValid === true ) {
        
        await db.collection('celulares').doc().set(produto)
            toast('Celular cadastrado com successo', {
                type: 'success'
            })

            resetarInputs()
                 
        }
        console.log('Foi executado useEffect')
    }

    useEffect(() => {
        adicionarCadastro();
    }, [produto])

    const resetarInputs = () => {
        setModel({ campo: '', isValid: 'null'})
        setBrand({ campo: '', isValid: 'null'})
        setCor({ campo: '', isValid: 'null'})
        setstartDate({ startDate: '', isValid: 'null'})
        setendDate({ endDate: '', isValid: 'null'})
        setPrice({ campo: '', isValid: 'null'})
        setProduto({...initialStateCadastrar})
    }

    return (
      
        <form action="POST" className="container_adicionar" onSubmit={handleSubmit}>
            <label className="title_detalhesProduto">Detalhes do produto</label>

            <section className="list_columns">

                <div className="column1">

                    <Input 
                    nome="model" 
                    type="text"
                    title="Modelo"
                    estado={model}
                    mudarEstado={setModel}
                    value={model.campo}
                    placeholder="XT2041-1"
                    regex={regexValidacao.model}
                    />

                    <label htmlFor="cor" className="title-input">Cor</label>
                    <select 
                    name="cor" 
                    className={selectChangeCor()} 
                    onChange={handleOptionsChange}
                    onKeyUp={validacaoCor}
                    onBlur={validacaoCor}
                    >
                        <option value={cor.campo}>COR</option> 
                        <option value="BLACK">BLACK</option> 
                        <option value="WHITE">WHITE</option> 
                        <option value="GOLD">GOLD</option> 
                        <option value="PINK">PINK</option> 
                    </select>

                    <div className="container_input">
                        <label 
                        name="startDate"
                        htmlFor="startDate"
                        className="title-input">
                            Inicio das Vendas</label>

                        <input 
                        type="date"
                        className={dateCorChange(startDate)}
                        name="startDate"
                        value={startDate.startDate}
                        onChange={(e) => changeInputData(e, startDate, setstartDate)} 
                        onKeyUp={validarDates}
                        onBlur={validarDates}/> 
                    </div>

                </div>

                <div className="column2">

                <Input 
                    nome="brand" 
                    type="text"
                    title="Marca"
                    estado={brand}
                    mudarEstado={setBrand}
                    value={brand.campo}
                    placeholder="Motorola"
                    regex={regexValidacao.brand}
                    />

                    <Input 
                    nome="price" 
                    type="number"
                    title="Preço"
                    estado={price}
                    mudarEstado={setPrice}
                    value={price.campo}
                    placeholder="1.400,00"
                    regex={regexValidacao.price}
                    />

                    
                    <div className="container_input">
                        <label 
                        name="endDate"
                        htmlFor="endDate"
                        className="title-input">
                            Fin das Vendas</label>

                        <input 
                        type="date"
                        className={dateCorChange(endDate)}
                        name="endDate"
                        value={endDate.endDate}
                        onChange={(e) => changeInputData(e, endDate, setendDate)} 
                        onKeyUp={validarDates}
                        onBlur={validarDates}/> 
                    </div>

                </div>

            </section>

            <div className="list-buttons">
        
                <NavLink exact to="/" className="buttonProduto">
                    VOLTAR
                </NavLink>

                <button type="submit" className="buttonProduto">
                        SALVAR
                </button>
            </div>
        </form>
    )
}

export default Form_adicionar
