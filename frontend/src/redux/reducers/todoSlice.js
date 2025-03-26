import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching weather data
export const fetchWeather = createAsyncThunk("todos/fetchWeather", async (city, { rejectWithValue }) => {
	try {
		const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
		if (!API_KEY) {
			throw new Error("Weather API key not found. Please check your environment configuration.");
		}
		const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
		return response.data;
	} catch (error) {
		if (error.response) {
			// API error response
			return rejectWithValue(`Weather API error: ${error.response.data.message}`);
		}
		// Network or other errors
		return rejectWithValue(error.message);
	}
});

const initialState = {
	tasks: [],
	weatherData: null,
	loading: false,
	error: null,
	filter: "all", // 'all', 'active', 'completed'
	sortBy: "date", // 'date', 'priority'
};

const todoSlice = createSlice({
	name: "todos",
	initialState,
	reducers: {
		addTask: (state, action) => {
			state.tasks.push({
				id: Date.now(),
				text: action.payload.text,
				priority: action.payload.priority,
				completed: false,
				weather: state.weatherData,
				createdAt: new Date().toISOString(),
				dueDate: action.payload.dueDate || null,
			});
		},
		deleteTask: (state, action) => {
			state.tasks = state.tasks.filter((task) => task.id !== action.payload);
		},
		toggleTask: (state, action) => {
			const task = state.tasks.find((task) => task.id === action.payload);
			if (task) {
				task.completed = !task.completed;
			}
		},
		updateTaskPriority: (state, action) => {
			const task = state.tasks.find((task) => task.id === action.payload.id);
			if (task) {
				task.priority = action.payload.priority;
			}
		},
		setFilter: (state, action) => {
			state.filter = action.payload;
		},
		setSortBy: (state, action) => {
			state.sortBy = action.payload;
		},
		updateTask: (state, action) => {
			const { id, ...updates } = action.payload;
			const task = state.tasks.find((task) => task.id === id);
			if (task) {
				Object.assign(task, updates);
			}
		},
		clearCompleted: (state) => {
			state.tasks = state.tasks.filter((task) => !task.completed);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchWeather.pending, (state) => {
			state.loading = true;
			state.error = null;
		})
			.addCase(fetchWeather.fulfilled, (state, action) => {
				state.loading = false;
				state.weatherData = {
					temp: action.payload.main.temp,
					description: action.payload.weather[0].description,
					icon: action.payload.weather[0].icon,
					city: action.payload.name,
				};
			})
			.addCase(fetchWeather.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || action.error.message;
			});
	},
});

export const { addTask, deleteTask, toggleTask, updateTaskPriority, setFilter, setSortBy, updateTask, clearCompleted } = todoSlice.actions;

// Selectors
export const selectFilteredTasks = (state) => {
	const { tasks, filter, sortBy } = state.todos;

	let filteredTasks = tasks;

	// Apply filter
	switch (filter) {
		case "active":
			filteredTasks = tasks.filter((task) => !task.completed);
			break;
		case "completed":
			filteredTasks = tasks.filter((task) => task.completed);
			break;
		default:
			break;
	}

	// Apply sort
	return [...filteredTasks].sort((a, b) => {
		if (sortBy === "priority") {
			const priorityOrder = { high: 0, medium: 1, low: 2 };
			return priorityOrder[a.priority] - priorityOrder[b.priority];
		}
		// Default sort by date
		return new Date(b.createdAt) - new Date(a.createdAt);
	});
};

export default todoSlice.reducer;
