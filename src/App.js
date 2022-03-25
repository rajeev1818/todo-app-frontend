import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Header from "./components/Header";
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import EditScreen from './screens/EditScreen';
import {Container} from 'react-bootstrap'


function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/edit/:id' element={<EditScreen />} />
          </Routes>
        </Container>
        
      </main>
    </Router>
  );
}

export default App;
