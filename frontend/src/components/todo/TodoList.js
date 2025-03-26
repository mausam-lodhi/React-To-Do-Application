import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Box,
  Typography,
  Paper,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Grid,
  Button
} from '@mui/material';
import { Delete as DeleteIcon, CheckCircle as CheckCircleIcon, RadioButtonUnchecked as UncheckedIcon, WbSunny as WbSunnyIcon } from "@mui/icons-material";
import {
  deleteTask,
  toggleTask,
  setFilter,
  setSortBy,
  clearCompleted,
  selectFilteredTasks
} from '../../redux/reducers/todoSlice';

const priorityColors = {
  low: 'success',
  medium: 'warning',
  high: 'error'
};

const TodoList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectFilteredTasks);
  const filter = useSelector(state => state.todos.filter);
  const sortBy = useSelector(state => state.todos.sortBy);

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleToggle = (id) => {
    dispatch(toggleTask(id));
  };

  const handleFilterChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  const handleSortChange = (event) => {
    dispatch(setSortBy(event.target.value));
  };

  const handleClearCompleted = () => {
    dispatch(clearCompleted());
  };

  const renderWeatherInfo = (weather) => {
    if (!weather) return null;
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
        <WbSunnyIcon fontSize="small" />
        <Typography variant="body2">
          {weather.city}: {Math.round(weather.temp)}°C, {weather.description}
        </Typography>
      </Box>
    );
  };

  if (tasks.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="textSecondary">
          No tasks yet. Add your first task above!
        </Typography>
      </Paper>
    );
  }

  return (
    <>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Filter</InputLabel>
              <Select value={filter} onChange={handleFilterChange}>
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Sort By</InputLabel>
              <Select value={sortBy} onChange={handleSortChange}>
                <MenuItem value="date">Date</MenuItem>
                <MenuItem value="priority">Priority</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleClearCompleted}
              disabled={!tasks.some(task => task.completed)}
            >
              Clear Completed
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <List>
        {tasks.map((task) => (
          <ListItem
            key={task.id}
            sx={{
              mb: 1,
              bgcolor: 'background.paper',
              borderRadius: 1,
              '&:hover': { bgcolor: 'action.hover' }
            }}
          >
            <IconButton onClick={() => handleToggle(task.id)}>
              {task.completed ? <CheckCircleIcon color="primary" /> : <UncheckedIcon />}
            </IconButton>
            <ListItemText
              primary={
                <Typography
                  sx={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                    color: task.completed ? 'text.secondary' : 'text.primary'
                  }}
                >
                  {task.text}
                </Typography>
              }
              secondary={
                <>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                    <Chip
                      label={task.priority}
                      size="small"
                      color={priorityColors[task.priority]}
                    />
                    {task.dueDate && (
                      <Typography variant="body2">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </Typography>
                    )}
                  </Box>
                  {renderWeatherInfo(task.weather)}
                </>
              }
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDelete(task.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default TodoList;
