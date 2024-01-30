import React, { Component, useState } from 'react';

const TaskList = () => {

    const [taskList, setTaskList] = useState('');
    const [currentTask, setCurrentTask] = useState('')

    const handleAddTask = () => {
        if(currentTask != '') {
            setTaskList([...taskList, currentTask])
            setCurrentTask('')
        } else {
            alert('task can not be empty')
        }
       
    }

    const DeleteTask = (taskTitle,TaskIndex) => {
       const filteredTask = taskList.filter((item,index)=> item !==taskTitle && TaskIndex != index);
       setTaskList(filteredTask)
    }

    const updateTask = (taskTitle, taskIndex) => {
        taskList.map((item,index)=> {
            if (item ==taskTitle && taskIndex == index) {
                taskList[index] = currentTask;
        }})
        setCurrentTask('')// adding this line fixed the glitch...but WHY???
    }
    return(
        <>
        <div>
        <p>
          Add Tasks  
        </p>
        <input onChange={(e)=>setCurrentTask(e.target.value)} type="text" value={currentTask}/>
        <button onClick={handleAddTask}>add</button>
        </div>
        <div className="task-list">
            <ul>{taskList && taskList.map((item, index)=><li key={index}><span>{item}</span> <button onClick={()=>updateTask(item,index)}>update</button> <button onClick={()=>DeleteTask(item,index)}>delete</button></li>)}</ul>
        </div>
        </>
    )
}

export default TaskList;