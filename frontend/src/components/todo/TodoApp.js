import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

const TodoApp = () => {
  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        My Tasks
      </Typography>
      <Paper sx={{ p: 3, mb: 3 }}>
        <TodoInput />
      </Paper>
      <TodoList />
    </Box>
  );
};

export default TodoApp;
