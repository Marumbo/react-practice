
import { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route,} from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import About from './components/About';




function App() {
  // state for form 
  const url = 'http://localhost:5000/tasks'
  const [showAddTask,setShowAddTask] = useState(false);

  const [tasks, setTasks] = useState([])

  useEffect(() => {
const getTasks = async() => { 
  const tasksFromServer = await fetchTasks();
  setTasks(tasksFromServer)
}
getTasks();

  }, [])

  const fetchTasks = async () => {
    const res = await fetch(url);
    const data = await res.json();
    //console.log(data);
    return data;
  }

  const fetchTask = async (id) => {
    const res = await fetch(`${url}/${id}`);
    const data = await res.json();
    return data;
  }


  const addTask = async (task) =>{
    console.log(task);

    const res = await fetch(url,{
      method:'POST',
      headers:{
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task) 
    })

    const data = await res.json()
    console.log(data)
    
    setTasks([...tasks,data])

  
    // console.log(task);
  // const id = Math.floor(Math.random()*1000) +1;
   // const newTask = {id,...task};
   // setTasks([...tasks,newTask]);

  }   
  const deleteTask= async (id) =>{
    //console.log(`delete: ${id}`);
    await fetch(`${url}/${id}`,{
      method:'DELETE'
    })

    setTasks(tasks.filter((task)=> task.id !== id));

  }

  const toggleReminder = async (id) => {
   // console.log(`Toggle ${id}`)
    const taskToggle = await fetchTask(id);

    const updatedTask ={...taskToggle,reminder:!taskToggle.reminder}

    const res = await fetch(`${url}/${id}`,{
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updatedTask)
    })

    const data = await res.json()
     
   setTasks(tasks.map((task) => task.id === id ? 
    {...task, reminder: data.reminder} : task))
  }

  const toggleAddTask = ()=> {
    
    setShowAddTask(!showAddTask);

  } 
  return (

    <Router>

    <div className='container'>
      <Header onAdd={toggleAddTask} showAdd={showAddTask}/>
      
     <Route path='/' exact render ={(props)=> (
       <>
       {showAddTask && <AddTask onAdd={addTask}/>}

     {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask}
     onToggle={toggleReminder} />:
     <h2>
       No Tasks to show!
     </h2>
       }
       </> 
      )} />

      <Route path="/about" component={About} />
     
     <Footer />
       
    </div>
    </Router>
     
  );
}

export default App;
