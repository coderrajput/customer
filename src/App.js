import logo from './logo.svg';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import Customers from './components/Customers';
import CustomerDetail from './components/CustomerDetail';
import CustomersProvider from './context/CustomersProvider';

function App() {
  return (
    <div className="App">
      <CustomersProvider>
        <Switch>
          <Route exact path='/customers'>
              <Customers />
          </Route>

          <Route  exact path='/customerDetails'>
              <CustomerDetail />
          </Route>

          <Route path='/'>
              <Customers />
          </Route>
        </Switch>
      </CustomersProvider>
    </div>
  );
}

export default App;
