import {Form,Row,Col,Button,Card} from 'react-bootstrap'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createTodo } from '../reducers/createTodoReducer'
import Message from './Message'

const TodoForm=()=>{

    const [state,setState]=useState({
        todo:'',
        category:'WORK',
        priority:'LOW',
        status:'TO DO',
        due_date:''
    })

    const user=JSON.parse(localStorage.getItem('userLogin'))

    const dispatch=useDispatch()

    const [error,setError]=useState('')




    const onChangeHandler=(e)=>{
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    }


    const submitHandler=(e)=>{
        e.preventDefault()
        
        
        if(!state.todo || !state.due_date){
            setError('All Fields are Required')
        }
        else{
            
            dispatch(createTodo({user,state}))
            setState({
                todo:'',
                category:'WORK',
                priority:'LOW',
                status:'TO DO',
                due_date:''
            })
        }
    }

    return (
        <Card className='p-3 shadow rounded my-5'>
            <h1 className='text-center mb-3'>Create Task</h1>
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
                Submit
            </Button>
            </Form>
            {
                error && <Message variant="danger">{error}</Message>
            }
        </Card>
    )
}

export default TodoForm