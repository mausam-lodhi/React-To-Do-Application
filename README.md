# Advanced React Todo Application

A feature-rich Todo application built with React, Redux, and Material-UI. This application demonstrates modern React development practices and includes features like weather integration, task prioritization, and user authentication.

## Features

- User Authentication (Login/Logout)
- Task Management
  - Add, edit, and delete tasks
  - Set task priorities (High, Medium, Low)
  - Mark tasks as complete/incomplete
  - Set due dates for tasks
- Weather Integration
  - Display weather information for location-based tasks
  - Uses OpenWeatherMap API
- Advanced Filtering & Sorting
  - Filter tasks by status (All, Active, Completed)
  - Sort tasks by date or priority
- Responsive Design
  - Mobile-first approach
  - Works seamlessly on all devices
- Data Persistence
  - Uses Redux Persist for local storage
  - Tasks and authentication state persist across sessions

## Tech Stack

- React 18
- Redux Toolkit for state management
- Material-UI for UI components
- Axios for API calls
- Redux Persist for local storage

## Prerequisites

- Node.js 14.0 or later
- npm or yarn
- OpenWeatherMap API key

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd React-To-Do-Application
   ```

2. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Create a `.env` file in the frontend directory with your OpenWeatherMap API key:
   ```
   REACT_APP_WEATHER_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`

## Deployment

The application can be deployed to various platforms. Here are instructions for some popular options:

### Netlify

1. Create a new site on Netlify
2. Connect your GitHub repository
3. Set the build command to `npm run build`
4. Set the publish directory to `build`
5. Add your environment variables in the Netlify dashboard

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts to deploy
4. Add environment variables in the Vercel dashboard

## Demo Credentials

For testing the application, use these credentials:
- Username: demo
- Password: password

## Project Structure

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   └── Login.js
│   │   ├── todo/
│   │   │   ├── TodoApp.js
│   │   │   ├── TodoInput.js
│   │   │   └── TodoList.js
│   │   └── layout/
│   ├── redux/
│   │   ├── reducers/
│   │   │   ├── authSlice.js
│   │   │   ├── todoSlice.js
│   │   │   └── index.js
│   │   └── store.js
│   ├── App.js
│   └── index.js
└── package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
