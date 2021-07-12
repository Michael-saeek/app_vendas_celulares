import '../assets/styles/header/header.css'
import logo from '../assets/img/mobile-solid.svg'


const Header = () => {

    return(
       <div className="header">

           <div className="logo">
                <span className="title-firstpt">Mobile  </span>
                <img src={logo} alt="logo" className="logo-img" />
                <span className="title-secondpt"> Center</span>
           </div>

       </div> 
    );
}

export default Header;