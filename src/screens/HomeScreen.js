import Todo from '../components/Todos'
import { Container,Row, Spinner } from 'react-bootstrap'
import { useSelector,useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TodoForm from '../components/TodoForm'
import {getTodos} from '../reducers/getTodosReducer'


const HomeScreen=()=>{

    const {user}=useSelector(state=>state.userLogin)
    const {todos}=useSelector(state=>state.userTodos)
    const {loading,error,success,message}=useSelector(state=>state.createTodo)
    const navigate=useNavigate()
    const dispatch=useDispatch()

    useEffect(()=>{
        if(!user){
            navigate('/login')
        }

        dispatch(getTodos(user))
    },[user,navigate,dispatch,loading,error,success,message])

    return(
        <Container>
            
            <TodoForm />
            <h1 className='text-center mb-3'>Tasks</h1>
            {
                loading ?(<Container className='d-flex justify-content-center'>
                <Row className=''>
                    <Spinner animation="border" /> 
                </Row>
                </Container>) :(todos.map((todo)=>{
                    return (

                    <Row className='mb-3' key={todo._id}>
                        <Todo todo={todo.todo} category={todo.category} priority={todo.priority} status={todo.status} due_date={todo.due_date} id={todo._id} />
                    </Row>
                    )
                })
                )
            }
            
        </Container>
    )
}

export default HomeScreen