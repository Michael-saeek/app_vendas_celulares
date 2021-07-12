import { Switch, Route, Redirect } from "react-router-dom";
import Lista_celulares from '../pages/Lista_celulares'
import Form_adicionar from '../pages/form_adicionar'
import Form_modificar from '../pages/form_modificar'


const Rotas = () => {

    return (
        <Switch>
            <Route exact path="/" component={Lista_celulares}/>
            <Route path="/adicionar" component={Form_adicionar} />
            <Route path="/modificar/:id" component={Form_modificar} />
            <Route path="/modificar" component={Form_modificar} />

            <Redirect from="*" to="/" />
          
        </Switch>
    );
}

export default Rotas;