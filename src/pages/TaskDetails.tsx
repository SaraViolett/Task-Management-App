import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';
import NavBar from '../components/NavBar';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

const TaskDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tasks } = useTaskContext();
  const task = tasks.find(t => t.id === id);

  if (!task) return <div>Task not found</div>;

  return (
    <div>
      <NavBar />
      <div className="d-flex justify-content-center align-items-center">
        <h2>Task Details</h2>
      </div>
      <Container className="my-5 d-flex justify-content-center">
        <Card style={{ minWidth: 400 }}>
          <Card.Body>
            <Card.Title><strong>Title: </strong> {task.title.charAt(0).toUpperCase() + task.title.slice(1)}</Card.Title>
            <Card.Text><strong>Description:</strong> {task.description}</Card.Text>
            <Card.Text>
              <strong>Status:</strong> {task.completed ? 'Completed' : 'Not Completed'}
            </Card.Text>
            {task.dueDate && (
              <Card.Text>
                <strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}
              </Card.Text>
            )}
            <div className="d-flex justify-content-end">
              <Button variant="primary" className="me-2" onClick={() => navigate(`/edit/${task.id}`)} >
                Edit
              </Button>
              <Button variant="secondary" className="ms-2" onClick={() => navigate(`/dashboard`)}>
                Return to Task Dashboard
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default TaskDetail;