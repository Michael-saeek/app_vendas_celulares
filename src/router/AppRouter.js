import { BrowserRouter as Router } from 'react-router-dom'
import Rotas from '../router/rotas'
import Header from '../components/header'
import Footer from '../components/footer'

const AppRouter = () => {


    return (
        <Router>
            <Header />
                 <Rotas />
            <Footer />
        </Router>
    )
}

export default AppRouter;