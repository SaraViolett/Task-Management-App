import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import NavBar from '../components/NavBar';

const TaskForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { tasks, addTask, updateTask } = useTaskContext();
  const existingTask = tasks.find(t => t.id === id);

  const [formData, setFormData] = useState({
    title: existingTask?.title || '',
    description: existingTask?.description || '',
    completed: existingTask?.completed || false,
    dueDate: existingTask?.dueDate || ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.title.trim()) {
      newErrors.title = "Title is required.";
    } else if (formData.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters.";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    }
    if (formData.dueDate) {
      const due = new Date(formData.dueDate);
      const now = new Date();
      now.setHours(0,0,0,0);
      due.setHours(0,0,0,0);
      if (due < now) {
        newErrors.dueDate = "Due date cannot be in the past.";
      }
    }
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setErrors(prev => ({ ...prev, [name]: '' })); // Clear error on change
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const newId = Date.now().toString();
    if (existingTask) {
      updateTask({ ...existingTask, ...formData });
    } else {
      addTask({ id: newId, ...formData });
    }
    navigate('/dashboard');
  };

  return (
    <div>
        <NavBar/>
        <Container className="my-5 d-flex justify-content-center">
        <Card style={{ minWidth: 400 }}>
            <Card.Body>
            <Card.Title>{existingTask ? 'Edit Task' : 'Create Task'}</Card.Title>
            <Form onSubmit={handleSubmit} noValidate>
                <Form.Group className="mb-3" controlId="taskTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter task title"
                    isInvalid={!!errors.title}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    {errors.title}
                </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="taskDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter task description"
                    rows={3}
                    isInvalid={!!errors.description}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    {errors.description}
                </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="taskCompleted">
                <Form.Check
                    type="checkbox"
                    name="completed"
                    label="Completed"
                    checked={formData.completed}
                    onChange={handleChange}
                />
                </Form.Group>
                <Form.Group className="mb-3" controlId="taskDueDate">
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    isInvalid={!!errors.dueDate}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.dueDate}
                </Form.Control.Feedback>
                </Form.Group>
                <div className="d-flex justify-content-end">
                <Button variant="primary" type="submit">
                    Save
                </Button>
                </div>
            </Form>
            </Card.Body>
        </Card>
        </Container>
    </div>
  );
};

export default TaskForm;
