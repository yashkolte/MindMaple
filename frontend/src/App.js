import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AddTodo from './components/AddTodo';
import Navbar from './components/Navbar';
import TodoList from './components/TodoList';
import UpdateTodo from './components/UpdateTodo';
// import { RetroGrid } from "./components/RetroGrid";
import { DotPattern } from "./components/DotPattern";

function App() {
  
  return (
      <BrowserRouter>
       <Navbar />
       {/* <RetroGrid className="fixed inset-0 z-0" /> */}
       <DotPattern className="fixed inset-0 z-0" />
       <Routes>
        <Route index element={<TodoList />} />
        <Route path="/" element={<TodoList />} />
        <Route path="/todoList" element={<TodoList />} />
        <Route path="/addTodo" element={<AddTodo />} />
        <Route path="/editTodo/:id" element={<UpdateTodo /> } />
       </Routes>
      </BrowserRouter>
  );
}

export default App;
