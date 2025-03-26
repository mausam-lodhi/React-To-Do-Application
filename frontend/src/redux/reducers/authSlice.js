import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated")) || false,
	user: JSON.parse(localStorage.getItem("user")) || null,
	error: null,
	loading: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		loginStart: (state) => {
			state.loading = true;
			state.error = null;
		},
		loginSuccess: (state, action) => {
			state.isAuthenticated = true;
			state.user = action.payload;
			state.loading = false;
			state.error = null;
		},
		loginFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		logout: (state) => {
			state.isAuthenticated = false;
			state.user = null;
			state.error = null;
		},
	},
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

// Thunk for handling login
export const login = (credentials) => async (dispatch) => {
    try {
        dispatch(loginStart());

        // API call
        const response = await fetch("https://react-to-do-application.onrender.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });

        // Check if response is OK
        if (!response.ok) {
            throw new Error("Authentication failed");
        }

        // Validate if response is JSON
        const contentType = response.headers.get("Content-Type");
        let userData = null;

        if (contentType && contentType.includes("application/json")) {
            userData = await response.json();
        } else {
            throw new Error("Invalid response format");
        }

        // Persist authentication state
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", JSON.stringify(userData));

        dispatch(loginSuccess(userData));
    } catch (error) {
        // Clear localStorage on error
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("user");
        dispatch(loginFailure(error.message));
    }
};

// Add logout thunk
export const logoutUser = () => (dispatch) => {
	localStorage.removeItem("isAuthenticated");
	localStorage.removeItem("user");
	dispatch(logout());
};

export default authSlice.reducer;
