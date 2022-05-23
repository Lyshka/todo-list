import React, {Component} from "react";
import {connect} from "react-redux";
import {addTast, removeTask, completeTask, changeFilter} from '../../actions/actionCreator'
import Footer from "../../components/footer/Footer";
import ToDoInput from "../../components/todo-input/Todo-input";
import ToDoList from "../../components/todo-list/Todo-list";

import './Todo.css'

class ToDo extends Component {
	state = {
		taskText: ''
	}

	handleInputChange = ({target: {value}}) => {
		this.setState({
			taskText: value
		})
	}

	addTast = ({key}) => {
		const {taskText} = this.state

		if (taskText.length > 3 && key === 'Enter') {
			const {addTast} = this.props

			addTast((new Date()).getTime(), taskText, false)

			this.setState({
				taskText: ''
			})
		}
	}

	filterTasks = (tasks, activeFilter) => {
		switch (activeFilter) {
			case 'completed':
				return tasks.filter(task => task.isCompleted)
			case 'active': 
				return tasks.filter(task => !task.isCompleted)
			default:
				return tasks
		}
	}

	getActiveTasksCounter = tasks => tasks.filter(task => !task.isCompleted).length

	render() {
		const {taskText} = this.state
		const {tasks, removeTask, completeTask, filters, changeFilter} = this.props
		const isTasksExist = tasks && tasks.length > 0
		const filteredTasks = this.filterTasks(tasks, filters)
		const taskCounter = this.getActiveTasksCounter(tasks)

		return (
			<div className="todo-wrapper">
				<ToDoInput onKeyPress={this.addTast} onChange={this.handleInputChange} value={taskText}/>
				{isTasksExist && <ToDoList completeTask={completeTask} tasksList={filteredTasks} removeTask={removeTask}/>}
				{isTasksExist && <Footer changeFilter={changeFilter} amount={taskCounter} activeFilter={filters}/>}
			</div>
		)
	}
}

export default connect(({tasks, filters}) => ({
	tasks,
	filters
}), {addTast, removeTask, completeTask, changeFilter})(ToDo)