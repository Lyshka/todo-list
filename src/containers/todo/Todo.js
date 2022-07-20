import {useState} from "react";
import {connect} from "react-redux";
import {addTast, removeTask, completeTask, changeFilter} from '../../actions/actionCreator'
import Footer from "../../components/footer/Footer";
import ToDoInput from "../../components/todo-input/Todo-input";
import ToDoList from "../../components/todo-list/Todo-list";

import './Todo.css'

const ToDo = ({tasks, removeTask, completeTask, filters, changeFilter, addTast}) => {
	const [taskText, setTaskText] = useState('')

	const handleInputChange = ({target: {value}}) => {
		setTaskText(value)
	}

	const addTask = ({key}) => {
		if (taskText.length > 3 && key === 'Enter') {
			addTast((new Date()).getTime(), taskText, false)
			setTaskText('')
		}
	}

	const filterTasks = (tasks, activeFilter) => {
		switch (activeFilter) {
			case 'completed':
				return tasks.filter(task => task.isCompleted)
			case 'active': 
				return tasks.filter(task => !task.isCompleted)
			default:
				return tasks
		}
	}

	const getActiveTasksCounter = tasks => tasks.filter(task => !task.isCompleted).length
		const isTasksExist = tasks && tasks.length > 0
		const filteredTasks = filterTasks(tasks, filters)
		const taskCounter = getActiveTasksCounter(tasks)

		return (
			<div className="todo-wrapper">
				<ToDoInput onKeyPress={addTask} onChange={handleInputChange} value={taskText}/>
				{isTasksExist && <ToDoList completeTask={completeTask} tasksList={filteredTasks} removeTask={removeTask}/>}
				{isTasksExist && <Footer changeFilter={changeFilter} amount={taskCounter} activeFilter={filters}/>}
			</div>
		)
}

export default connect(({tasks, filters}) => ({
	tasks,
	filters
}), {addTast, removeTask, completeTask, changeFilter})(ToDo)