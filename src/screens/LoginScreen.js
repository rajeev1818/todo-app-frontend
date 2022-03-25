import {Form,Button, Container,Row,Col,Spinner} from 'react-bootstrap'
import {Link,useNavigate} from 'react-router-dom'
import { useState,useEffect } from 'react'
import {login,resetUserState} from '../reducers/userReducer'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'


const LoginScreen=()=>{

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [formError,setFormError]=useState('')

    const {loading,user,error,success,message}=useSelector(state=>state.userLogin)

    const dispatch=useDispatch()
    const navigate=useNavigate()

    useEffect(()=>{
        if(error){
            setFormError(message)
        }
        if(success || user){
            navigate('/')
        }

    },[loading,user,error,message,success,navigate])

    const submitHandler=(e)=>{
        e.preventDefault()
        if(!(email && password)){
            
            setFormError("All Fields Are Required")
            setTimeout(()=>{
                setFormError('')
            },1000)
        }
        else{
            setFormError('')
            dispatch(login({email,password}))
        }
        
    }


    return (
            
        
            loading ? (<Container className='d-flex justify-content-center'>
                <Row className=''>
                    <Spinner animation="border" /> 
                </Row>
                </Container>): (<Container className='my-4'>
            
            <Row className='justify-content-md-center'>
            
                <Col xs={12} md={6}>
                    <h1 className='text-center'><i className="fa-solid fa-user-large"></i> Sign In</h1>
                    <Form onSubmit={submitHandler}>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={e=>setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                    <Row className='my-3'>
                        <Col>New User? <Link to='/register' onClick={()=>dispatch(resetUserState())}>Register</Link></Col>
                    </Row>
                </Col>
                
            </Row>
            {
                formError &&
                <Message variant="danger">{formError}</Message>
            }
            
            
        </Container>)
        
        
    )
}


export default LoginScreen