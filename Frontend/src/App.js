import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavigationBar } from './Component/Navigationbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './Component/Home';
import { ViewLoans } from './Component/applyLoan';
import { SignUp } from './Component/register';
import { Login } from './Component/Login';
import { PayInstallment } from './Component/repayment';
import { MyLoans } from './Component/myLoans';
import { InstallmentList } from './Component/Installments';

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/loans' element={<MyLoans />}></Route>
        <Route path="/installments/:loanId" element={<InstallmentList />} />
        <Route path='/apply' element={<ViewLoans />}></Route>
        <Route path='/register' element={<SignUp />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/payInstall' element={<PayInstallment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
