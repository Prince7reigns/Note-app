import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Route, Router, RouterProvider,createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { BrowserRouter } from "react-router-dom";
import Layout from './pages/Layout'
import Home from './pages/Home'
import Note from './pages/Note'
import CreateNote from './pages/CreateNote'
import Editnote from './pages/Editnote'

//  const router = createBrowserRouter([
//     {
//       path:"/",
//       element:<Layout/>,
//       children:[
//         {
//           path:"",
//           element:<Home/>
//         },
//         {
//           path:"note",
//           element:<Note/>
//         },
//         {
//           path:"create-note",
//           element:<CreateNote/>
//         }
//       ]
//     }
//  ])


 const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
       <Route path='' element={<Home/>} />
       <Route path='note/:id' element={<Note/>} />
       <Route path='create-note' element={<CreateNote/>} />
       <Route path='edit-note/:id' element={<Editnote/>} />
    </Route>
  )
 )

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
