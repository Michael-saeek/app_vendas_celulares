import '../assets/styles/pageadicionar/adicionar.css'

const input = ({nome, type, title, estado, mudarEstado, placeholder, value, regex }) => {

    const handleInputChange = (e) => {
        mudarEstado({...estado, campo: e.target.value})
        console.log(e.target.value)
    }

    const comprovacaoDeDados = () => {
        if (regex) {
            if (regex.test(estado.campo)) {
                mudarEstado({...estado, isValid: true})
                console.log(estado)
            } else {
                mudarEstado({...estado, isValid: false})
                console.log(estado)
            }
        } else {
            console.log('no tiene regex')
        }
    }

    const inputChangeCor = () => {
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

    return (
        <div className="container_input">
            <label 
            name={nome}
            htmlFor={nome}
            className="title-input">
                {title}</label>

            <input 
            type={type}
            className={inputChangeCor()}
            name={nome}
            placeholder={placeholder}
            value={value}
            onChange={handleInputChange} 
            onKeyUp={comprovacaoDeDados}
            onBlur={comprovacaoDeDados}
            /> 
        </div>
    )
}

export default input
