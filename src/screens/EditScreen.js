
import {Form,Row,Col,Button,Card, Spinner,Container} from 'react-bootstrap'
import { useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {editTodo,editReducerReset } from '../reducers/editTodoReducer'
import { useParams,useNavigate,Link } from 'react-router-dom'
import authService from '../api/authService'
import {format,parseISO} from 'date-fns'


const EditScreen=()=>{
        const params=useParams()
        const todoId=params.id
        
        const navigate=useNavigate()
        
        const [state,setState]=useState({
            todo:'',
            category:'WORK',
            priority:'LOW',
            status:'TO DO',
            due_date:''
        })

        const {loading,error,success}=useSelector(state=>state.editTodo)

        useEffect(()=>{
            const getTodo=async()=>{

                const todo= await authService.getSingleTodo(todoId)
                setState({
                    todo:todo.todo,
                    priority:todo.priority,
                    due_date:format(parseISO(todo.due_date),'yyyy-MM-dd'),
                    status:todo.status,
                    category:todo.category
                })
            }
            getTodo()
        },[todoId])
        const dispatch=useDispatch()

        useEffect(()=>{
            if(success){
                dispatch(editReducerReset())
                navigate('/')
            }

        },[loading,error,success,dispatch,navigate])
    
        

        const onChangeHandler=(e)=>{
            setState({
                ...state,
                [e.target.name]:e.target.value
            })
        }
    
    
        const submitHandler=(e)=>{
            e.preventDefault()
                
                dispatch(editTodo({todoId,state}))
                setState({
                    todo:'',
                    category:'WORK',
                    priority:'LOW',
                    status:'TO DO',
                    due_date:''
                }) 
        }
    
        return (
        
        
        loading ? (<Container className='d-flex justify-content-center'>
        <Row className=''>
            <Spinner animation="border" /> 
        </Row>
        </Container>):
        (   
            
            <Card className='p-3 shadow rounded my-5'>
                <Link to='/'>
                    <Button variant="primary" >
                        Back
                    </Button>
                </Link>
                <h1 className='text-center mb-3'>Edit Task</h1>
                <Form className="mb-3" onSubmit={submitHandler}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="todo">
                        <Form.Label>Task</Form.Label>
                        <Form.Control type="text" placeholder="Enter Task" value={state.todo} onChange={onChangeHandler} name="todo" />
                    </Form.Group>
                </Row>
    
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Select value={state.category} onChange={onChangeHandler} name="category">
                            <option value="WORK">WORK</option>
                            <option value="HOME">HOME</option>
                            <option value="LEARNING">LEARNING</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} controlId="priority">
                        <Form.Label>Priority</Form.Label>
                        <Form.Select  value={state.priority} onChange={onChangeHandler} name="priority">
                            <option value="LOW">LOW</option>
                            <option value="MEDIUM">MEDIUM</option>
                            <option value="HIGH">HIGH</option>
                        </Form.Select>
                    </Form.Group>
    
                </Row>
    
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="status">
                        <Form.Label>Status</Form.Label>
                        <Form.Select value={state.status} onChange={onChangeHandler} name="status">
                            <option value="TO DO">TO DO</option>
                            <option value="IN PROGRESS">IN PROGRESS</option>
                            <option value="DONE">DONE</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} controlId="date">
                        <Form.Label>Due Date</Form.Label>
                        <Form.Control type='date' value={state.due_date} onChange={onChangeHandler} name="due_date" />
                    </Form.Group>
    
                </Row>
    
                <Button variant="primary" type="submit">
                    Update
                </Button>
                </Form>
            </Card>
        ))
    
}


export default EditScreen