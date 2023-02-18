import { Route, Routes } from 'react-router';
import './App.css';
import Contactus from './Components/ContactUs/Contactus';
import Auth from './Components/Dashboard/Auth';
import Dhome from './Components/Dashboard/Dhome';
import Login from './Components/Dashboard/Login';
import Favourites from './Components/Favourites';
import Home from './Components/Home';
import Moviesdetails from './Components/Moviesdetails';




function App() {
  return (
    <>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contactus' element={<Contactus  />} />
        <Route path='/favourites' element={<Favourites />} />
        <Route path='/moviedetails/:id' element={<Moviesdetails />} />
        <Route path='/login' element={<Login></Login>} />
        <Route element={<Auth></Auth>}>
          <Route path='/dashboard/*' element={<Dhome></Dhome>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
