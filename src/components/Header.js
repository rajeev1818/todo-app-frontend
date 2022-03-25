import {Navbar,Container,Nav} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../reducers/userReducer'
import { reset } from '../reducers/getTodosReducer'



const Header=()=>{
    const {user}=useSelector(state=>state.userLogin)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const logoutHandler=()=>{
        dispatch(logout())
        dispatch(reset())
        navigate('/login')
    }
    

    return (
        <header>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>TODO APP</Navbar.Brand>
                    </LinkContainer>
                    
                <Nav className="me-auto">
                   
                    {
                        user && (<Nav.Link className='header'>{user.name} <i className="fa-solid fa-user"></i></Nav.Link>)
                    }
                    
                    {
                        user && (
                        
                            <Nav.Link onClick={logoutHandler} className="header">Logout <i className="fa-solid fa-arrow-right-from-bracket"></i></Nav.Link>
                        )
                    }
                    
                </Nav>
                </Container>
            </Navbar>
        </header>
    )
}


export default Header