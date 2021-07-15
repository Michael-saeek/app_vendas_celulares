import { BrowserRouter as Router } from 'react-router-dom'
import '../assets/styles/index/index.css'
import Rotas from '../router/rotas'
import Header from '../components/header'
import Footer from '../components/footer'

const AppRouter = () => {


    return (
        <Router>
            <main className="container-grid">
                <Header />
                <Rotas />
                <Footer />
            </main>
        </Router>
    )
}

export default AppRouter;