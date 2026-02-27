@echo off
echo === Setting up React + Vite Project ===

REM Create directory structure
mkdir src\pages
mkdir src\components
mkdir src\store
mkdir src\store\slices
mkdir src\hooks
mkdir src\services
mkdir src\utils
mkdir src\assets
mkdir public

echo === Creating source files ===

REM src\main.jsx
(
echo import React from 'react'
echo import ReactDOM from 'react-dom/client'
echo import { BrowserRouter } from 'react-router-dom'
echo import { Provider } from 'react-redux'
echo import { store } from './store/store'
echo import { ToastContainer } from 'react-toastify'
echo import 'react-toastify/dist/ReactToastify.css'
echo import App from './App'
echo import './index.css'
echo.
echo ReactDOM.createRoot(document.getElementById('root'^)^).render(
echo   ^<React.StrictMode^>
echo     ^<Provider store={store}^>
echo       ^<BrowserRouter^>
echo         ^<App /^>
echo         ^<ToastContainer position="top-right" autoClose={3000} /^>
echo       ^</BrowserRouter^>
echo     ^</Provider^>
echo   ^</React.StrictMode^>
echo ^)
) > src\main.jsx

REM src\App.jsx
(
echo import { Routes, Route } from 'react-router-dom'
echo import Home from './pages/Home'
echo import './App.css'
echo.
echo function App(^) {
echo   return (
echo     ^<Routes^>
echo       ^<Route path="/" element={^<Home /^>} /^>
echo     ^</Routes^>
echo   ^)
echo }
echo.
echo export default App
) > src\App.jsx

REM src\index.css
(
echo @tailwind base;
echo @tailwind components;
echo @tailwind utilities;
echo.
echo * {
echo   margin: 0;
echo   padding: 0;
echo   box-sizing: border-box;
echo }
echo.
echo body {
echo   font-family: 'Inter', sans-serif;
echo   background-color: #f9fafb;
echo }
) > src\index.css

REM src\App.css
echo. > src\App.css

REM src\pages\Home.jsx
(
echo import React from 'react'
echo.
echo function Home(^) {
echo   return (
echo     ^<div className="min-h-screen flex items-center justify-center"^>
echo       ^<h1 className="text-4xl font-bold text-gray-800"^>Welcome to Food Product^</h1^>
echo     ^</div^>
echo   ^)
echo }
echo.
echo export default Home
) > src\pages\Home.jsx

REM src\store\store.js
(
echo import { configureStore } from '@reduxjs/toolkit'
echo.
echo export const store = configureStore({
echo   reducer: {},
echo }^)
) > src\store\store.js

REM src\services\api.js
(
echo import axios from 'axios'
echo.
echo const api = axios.create({
echo   baseURL: import.meta.env.VITE_API_URL ^|^| 'http://localhost:5000/api',
echo   headers: {
echo     'Content-Type': 'application/json',
echo   },
echo })
echo.
echo api.interceptors.request.use((config^) =^> {
echo   const token = localStorage.getItem('token'^)
echo   if (token^) config.headers.Authorization = `Bearer ${token}`
echo   return config
echo }^)
echo.
echo export default api
) > src\services\api.js

REM .env
(
echo VITE_API_URL=http://localhost:5000/api
) > .env

REM .gitignore
(
echo node_modules
echo dist
echo .env.local
echo .env.production
echo .DS_Store
echo *.log
) > .gitignore

echo.
echo === Installing dependencies ===
call npm install

echo.
echo === Setup Complete! ===
echo Run 'npm run dev' to start the development server.
pause
