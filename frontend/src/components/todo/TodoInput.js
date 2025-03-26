import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  CircularProgress,
  Alert
} from '@mui/material';
import { addTask, fetchWeather } from '../../redux/reducers/todoSlice';

const TodoInput = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.todos.loading);
  const error = useSelector(state => state.todos.error);
  
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('medium');
  const [city, setCity] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task.trim()) {
      try {
        if (city.trim()) {
          await dispatch(fetchWeather(city.trim())).unwrap();
        }
        dispatch(addTask({
          text: task.trim(),
          priority,
          dueDate: dueDate || null
        }));
        setTask('');
        setCity('');
        setDueDate('');
      } catch (err) {
        // Error will be handled by the Redux state
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="New Task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            required
            disabled={loading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="City (for weather)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Optional"
            disabled={loading}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              label="Priority"
              disabled={loading}
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            type="date"
            label="Due Date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            disabled={loading}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading || !task.trim()}
            sx={{ height: '100%' }}
          >
            {loading ? <CircularProgress size={24} /> : 'Add Task'}
          </Button>
        </Grid>
      </Grid>
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default TodoInput;
