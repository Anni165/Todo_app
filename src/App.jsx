import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(false)

  useEffect(() => {
    let todoString=localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  

  const saveToStorage=()=>{
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished=(e)=>{
    setshowFinished(!showFinished)
  }

  const handleAdd=()=>{
    setTodos([...todos, {id:uuidv4() ,todo, isCompleted: false}])
    setTodo("")
    saveToStorage()
  }

  const handleEdit=(e, id)=>{
    let t=todos.filter(i=>i.id===id)
    setTodo(t[0].todo)
    let newTodos=todos.filter(item=>{
      return item.id!==id;
    })
    setTodos(newTodos)
    saveToStorage()
  }

  const handleDelete=(e, id)=>{
    let newTodos=todos.filter(item=>{
      return item.id!==id;
    })
    setTodos(newTodos)
    saveToStorage()
  }

  const handleChange=(e)=>{
    setTodo(e.target.value)
  }

  const handleCheckbox=(e)=>{
    let id = e.target.name;
    let index=todos.findIndex(item=>{
      return item.id===id;
    })
    let newTodos=[...todos];
    newTodos[index].isCompleted=!newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToStorage()
  }

  return (
    <>
      <Navbar />
      <div className="mx-[360px] my-5 rounded-xl p-5 bg-violet-200 min-h-[80vh] w-1/2">
        <div className="addtodo my-5">
          <h2 className="text-lg font-bold">Add a Task</h2>
          <input onChange={handleChange} type="text" className="w-1/2 rounded-lg"/>
          <button onClick={handleAdd} disabled={todo.length>3} className="bg-violet-700 hover:bg-purple-900 disabled:bg-violet-950 text-white text-sm font-bold mx-6 p-3 py-1 rounded-lg">Add</button>
        </div>
        <input onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished
        <h2 className="text-xl font-bold">Your Tasks</h2>
        <div className="todos">
          {todos.length===0 && <div className="m-5">No Tasks to display...😒</div>}
          {todos.map(item=>{
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex w-[30%] my-3 justify-between w-1/2">
              <div className="flex gap-5">
                <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
                <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>{handleEdit(e, item.id)}} className="bg-violet-700 hover:bg-purple-900 text-white text-sm font-bold mx-1 p-3 py-1 rounded-lg"><FaEdit /></button>
                <button onClick={(e)=>{handleDelete(e, item.id)}} className="bg-violet-700 hover:bg-purple-900 text-white text-sm font-bold mx-1 p-3 py-1 rounded-lg"><MdDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  );
}

export default App;
