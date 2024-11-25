import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import {Login, Signup} from './pages'
import { AuthLayout } from './components/index.js'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="login" element={
        <AuthLayout authentication={false}>
          <Login />
        </AuthLayout>
      } />
      <Route path="signup" element={
        <AuthLayout authentication={false}>
          <Signup />
        </AuthLayout>
      } />
      <Route path="all-posts" element={
        <AuthLayout authentication>
          <div className='text-white'>All Posts</div>
        </AuthLayout>
      } />
      <Route path="add-post" element={
        <AuthLayout authentication>
          <div className='text-white'>Add Post</div>
        </AuthLayout>
      } />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </StrictMode>,
)
