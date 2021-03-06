import { NavLink } from 'react-router-dom'
import '../assets/styles/button/button.css'

const Button = ({className, value, url, icon1, icon2, type}) => {


    return (
        <button className={className} type={type}>
            <NavLink exact to={url} >
            <i className={icon1}></i> 
            <i className={icon2}></i> 
           
                {value}
            </NavLink>
        </button>
    );
} 

export default Button;