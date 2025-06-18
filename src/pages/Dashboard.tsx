import React, { useState, useEffect } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { useNavigate } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import NavBar from '../components/NavBar';
import { Container } from 'react-bootstrap';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();  
  const { tasks, deleteTask } = useTaskContext();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [deleted, setDeleted] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [ifTask, setIfTask] = useState(false);

  const updateIfTask = () => {
    setIfTask(tasks.length > 0);
  };

  useEffect(() => {
    updateIfTask();
  }, [tasks]);

  const handleDeleteButton = (id: string) => {
    setTaskToDelete(id);
    setShowDeleteConfirmation(true);
    setDeleted(false); 
  };
  const handleCloseAlert = () => setShowDeleteConfirmation(false);

  const handleDelete = () => {
    if (taskToDelete) {
      try {
        deleteTask(taskToDelete);
        setDeleted(true);
        setShowDeleteConfirmation(false);
      } catch {
        setDeleteError("Failed to delete task.");
      }
    }
  };

  const taskTitle = tasks.find(t => t.id === taskToDelete)?.title;

  return (
    <div>
        <NavBar/>
        <Container fluid className="d-flex flex-column justify-content-center align-items-center p-5">
                <h1>Task Dashboard</h1>
                <Button variant="success" className='m-4' onClick={() => navigate(`/create`)}>Create New Task</Button>
                {ifTask && (
                        <div className='d-flex justify-content-center border border-2 rounded-1 p-3 bg-light'>
                            <div>
                                <h2 className='text-center'>Task List</h2>
                                {tasks.map(task => (
                                <div key={task.id} className='d-flex justify-content-center align-items-center m-auto p-3 m-2'>
                                    <h3>{task.completed ? '✅' : '❌'}</h3>
                                    <h3>{task.title.charAt(0).toUpperCase() + task.title.slice(1)}</h3>
                                    {task.dueDate && <h5> (Due: {new Date(task.dueDate).toLocaleDateString()})</h5>}
                                    <Button className='mx-1' variant="secondary" onClick={() => navigate(`/task/${task.id}`)}>See Task Details</Button>
                                    <Button variant="danger" onClick={() => handleDeleteButton(task.id)}>Delete</Button>
                                </div>
                                ))}
                            </div> 
                            <div className='mx-1'>
                                {showDeleteConfirmation && (
                                <Alert variant="danger">
                                    <p>Are you sure you want to delete {taskTitle}?</p>
                                    <div className="d-flex justify-content-center align-items-center">
                                    <Button onClick={handleDelete} variant="danger" className="m-2">
                                        Yes
                                    </Button>
                                    <Button onClick={handleCloseAlert} variant="secondary">
                                        No
                                    </Button>
                                    </div>
                                </Alert>
                                )}
                                {deleted && (
                                <Alert variant="success" className="m-2">
                                    <p>Task deleted successfully.</p>
                                    <Button onClick={() => setDeleted(false)} variant="secondary">
                                    Close
                                    </Button>
                                </Alert>
                                )}
                                {deleteError && (
                                <Alert variant="danger" className="m-2">
                                    <p>{deleteError}</p>
                                </Alert>
                                )}
                            </div>
                            </div>
                    )}      
        </Container>  
    </div>
  );
};

export default Dashboard;