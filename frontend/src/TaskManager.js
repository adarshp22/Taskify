import React, { useEffect, useState } from 'react';
import { FaCheck, FaPencilAlt, FaPlus, FaSearch, FaTrash } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import { CreateTask, DeleteTaskById, GetAllTasks, UpdateTaskById } from './api';
import { notify } from './utils';
function TaskManager() {
    const [input, setInput] = useState('');
    const [tasks, setTasks] = useState([]);
    const [copyTasks, setCopyTasks] = useState([]);
    const [updateTask, setUpdateTask] = useState(null);

    const handleTask = () => {
        if (updateTask && input) {
            //upadte api call
            console.log('update api call');
            const obj = {
                taskName: input,
                isDone: updateTask.isDone,
                _id: updateTask._id
            }
            handleUpdateItem(obj);
        } else if (updateTask === null && input) {
            console.log('create api call')
            //create api call
            handleAddTask();
        }
        setInput('')
    }

    useEffect(() => {
        if (updateTask) {
            setInput(updateTask.taskName);
        }
    }, [updateTask])

    const handleAddTask = async () => {
        const obj = {
            taskName: input,
            isDone: false
        }
        try {
            const { success, message } =
                await CreateTask(obj);
            if (success) {
                //show success toast
                notify(message, 'success')
            } else {
                //show error toast
                notify(message, 'error')
            }
            fetchAllTasks()
        } catch (err) {
            console.error(err);
            notify('Failed to create task', 'error')
        }
    }

 const fetchAllTasks = async () => {
  try {
    const result = await GetAllTasks(); // { success, message, data }
    console.log("fetchAllTasks result:", result);

    if (result.success) {
      setTasks(result.data || []);
      setCopyTasks(result.data || []);
    } else {
      setTasks([]);
      setCopyTasks([]);
      notify(result.message, "error");
    }
  } catch (err) {
    console.error(err);
    notify("Failed to fetch tasks", "error");
    setTasks([]);  // avoid crash
    setCopyTasks([]);
  }
};

    useEffect(() => {
        fetchAllTasks()
    }, [])


    const handleDeleteTask = async (id) => {
        try {
            const { success, message } = await DeleteTaskById(id);
            if (success) {
                //show success toast
                notify(message, 'success')
            } else {
                //show error toast
                notify(message, 'error')
            }
            fetchAllTasks()
        } catch (err) {
            console.error(err);
            notify('Failed to create task', 'error')
        }
    }

    const handleCheckAndUncheck = async (item) => {
        const { _id, isDone, taskName } = item;
        const obj = {
            taskName,
            isDone: !isDone
        }
        try {
            const { success, message } = await UpdateTaskById(_id, obj);
            if (success) {
                //show success toast
                notify(message, 'success')
            } else {
                //show error toast
                notify(message, 'error')
            }
            fetchAllTasks()
        } catch (err) {
            console.error(err);
            notify('Failed to create task', 'error')
        }
    }

    const handleUpdateItem = async (item) => {
        const { _id, isDone, taskName } = item;
        const obj = {
            taskName,
            isDone: isDone
        }
        try {
            const { success, message } = await UpdateTaskById(_id, obj);
            if (success) {
                //show success toast
                notify(message, 'success')
            } else {
                //show error toast
                notify(message, 'error')
            }
            fetchAllTasks()
        } catch (err) {
            console.error(err);
            notify('Failed to create task', 'error')
        }
    }

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        const oldTasks = [...copyTasks];
        const results = oldTasks.filter((item) => item.taskName.toLowerCase().includes(term));
        setTasks(results);
    }
    return (
  <div className="container mt-5" style={{ maxWidth: "700px" }}>
    <h1 className="text-center fw-bold mb-4 text-primary">✨ Taskify</h1>

    {/* Input + Search */}
    <div className="d-flex flex-column flex-md-row mb-4 gap-3">
      <div className="input-group">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="form-control"
          placeholder="Add a new task..."
        />
        <button onClick={handleTask} className="btn btn-success">
          <FaPlus />
        </button>
      </div>

      <div className="input-group">
        <span className="input-group-text">
          <FaSearch />
        </span>
        <input
          onChange={handleSearch}
          className="form-control"
          type="text"
          placeholder="Search tasks..."
        />
      </div>
    </div>

    {/* Task List */}
    <div className="list-group">
      {tasks.length === 0 ? (
        <div className="text-center text-muted p-5 border rounded">
          No tasks yet. 🎉 Add one above!
        </div>
      ) : (
        tasks.map((item) => (
          <div
            key={item._id}
            className={`list-group-item d-flex justify-content-between align-items-center shadow-sm mb-2 rounded-3 
              ${item.isDone ? "bg-light text-muted" : "bg-white"}`}
            style={{ transition: "0.3s" }}
          >
            <span
              className={item.isDone ? "text-decoration-line-through" : ""}
              style={{ fontSize: "1.1rem" }}
            >
              {item.taskName}
            </span>

            <div className="d-flex gap-2">
              <button
                onClick={() => handleCheckAndUncheck(item)}
                className="btn btn-outline-success btn-sm"
                title={item.isDone ? "Mark as Pending" : "Mark as Done"}
              >
                <FaCheck />
              </button>
              <button
                onClick={() => setUpdateTask(item)}
                className="btn btn-outline-primary btn-sm"
                title="Edit Task"
              >
                <FaPencilAlt />
              </button>
              <button
                onClick={() => handleDeleteTask(item._id)}
                className="btn btn-outline-danger btn-sm"
                title="Delete Task"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))
      )}
    </div>

    {/* Toastify */}
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
  </div>
);

}

export default TaskManager