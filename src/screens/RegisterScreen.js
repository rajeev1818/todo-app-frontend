
import Message from '../components/Message'
import {Form,Button, Container,Row,Col,Spinner} from 'react-bootstrap'
import {Link, useNavigate} from 'react-router-dom'
import { useState,useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { register,resetUserState } from '../reducers/userReducer'


const RegisterScreen=()=>{

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [name,setName]=useState('')
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

        if(!(name && email && password)){
            setFormError("All Fields Are Required")
            setTimeout(()=>{
                setFormError('')
            },1000)
        }

        else{
            setFormError('')
            dispatch(register({name,email,password}))
        }
        
    }


    return (


        loading ? (<Container className='d-flex justify-content-center'>
                <Row>
                    <Spinner animation="border" /> 
                </Row>
                </Container>):(
        <Container className='my-4'>
            
            <Row className='justify-content-md-center'>
            
                <Col xs={12} md={6}>
                    <h1 className='text-center'><i className="fa-solid fa-right-to-bracket"></i> Register</h1>
                    <Form onSubmit={submitHandler}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" value={name} onChange={e=>setName(e.target.value)} />
                        </Form.Group>
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
                        <Col>Already Have an Account? <Link to='/login' onClick={()=>dispatch(resetUserState())}>Login</Link></Col>
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


export default RegisterScreen