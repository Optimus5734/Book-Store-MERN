import React from 'react'
import { Routes,Route } from "react-router-dom";
import CreateBook from "../src/pages/CreateBook";
import EditBook from "../src/pages/EditBook";
import DeleteBook from "../src/pages/DeleteBook";
import Home from "../src/pages/Home";
import ShowBook from "../src/pages/ShowBook";


export const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/books/create' element={<CreateBook/>}/>
      <Route path='/books/delete/:id' element={<DeleteBook/>}/>
      <Route path='/books/details/:id' element={<ShowBook/>}/>
      <Route path='/books/edit/:id' element={<EditBook/>}/>
    </Routes>
  )
}
export default App;