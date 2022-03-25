import {Card,Row,Col,Button} from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { deleteTodo } from '../reducers/deleteTodoReducer'
import {format,parseISO} from 'date-fns'
import {useNavigate} from 'react-router-dom'


const Todo=({todo,priority,due_date,status,category,id})=>{
    const dispatch=useDispatch()
    const navigate=useNavigate()
    return (
            <Col>
                <Card className="rounded mx-5">
                <Card.Body>
                    <Row className='mb-2'>
                        <Col className='mr-auto'>
                            <Card.Title><strong>Todo:</strong> {todo}</Card.Title>
                        </Col>
                        <Col xs={4} md={1}>
                            <Button variant='light' onClick={()=>navigate(`/edit/${id}`)}>
                                <i className="fa-solid fa-pen-to-square"></i>
                            </Button>
                        </Col>
                    </Row>
                    <Row className='mb-2'>
                        <Col>
                            <Card.Subtitle>Priority: {priority}</Card.Subtitle>
                        </Col>
                        
                    </Row>
                    <Row className='mb-2'>
                        <Col>
                            <Card.Subtitle>Due Date: {format(parseISO(due_date),'dd/MM/yyyy')}</Card.Subtitle>
                        </Col>
                        
                    </Row>
                    <Row className='mb-2'>
                        <Col>
                            <Card.Subtitle>Category: {category}</Card.Subtitle>
                        </Col>  
                    </Row>
                    <Row>
                        <Col>
                            <Card.Subtitle>Status: {status}</Card.Subtitle>
                        </Col>
                        <Col xs={4} md={1}>
                            <Button variant="light" onClick={()=>dispatch(deleteTodo(id))}>
                                <i className="fa-solid fa-trash-can"></i>
                            </Button>
                        </Col>
                        
                    </Row>
                </Card.Body>
                </Card>
            </Col>
        
    )
}

export default Todo