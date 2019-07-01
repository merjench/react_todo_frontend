import React from 'react'
import ListCollection from '../components/ListCollection'
import DoneListCollection from '../components/DoneListCollection'
import ListForm from '../components/ListForm'
import { Search } from 'semantic-ui-react'


class ListContainer extends React.Component {

	state = {
		todolists: [],
		doneLists: [],
		searchFilter: "",
		sortList: false

	}

/// INITIAL FETCH of all TODOLIST for user

	componentDidMount(){
		// console.log("ListContainer")
		fetch("http://localhost:3000/todolists")
		.then(res => res.json())
		.then(response => {
			// console.log(response, "response")
			this.setState({
				todolists: response
			})
		})
	}

///  ADD new TODO LIST

	addNewList = (todolist) => {
		this.setState({
			todolists: [todolist, ...this.state.todolists]
		})
	}

/// ADD to DONE list

	// handleDone = (doneList) => {
	// 	let allTodos = this.state.todolists.filter(list => list.id !== doneList.id)
	//
	// 	this.setState({
	// 		todolists: allTodos,
	// 		doneList: [...this.state.donelist, doneList]
	// 	})
	// }
	//
	// removeFromDone = (unDoneList) => {
	// 	let allTodos = this.state.todolists.filter(list => list.id !== unDoneList.id)
	//
	// 	this.setState({
	// 		todolists: [...this.state.todolists, unDoneList],
	// 		doneList: allTodos
	// 	})
	// }

/// Filter Search rendered TODOLIST

	handleSearch = (event, { value }) => {
		// debugger
		this.setState({
			searchFilter: value
		}, () => console.log(this.state.searchFilter))
	}

	changeFilter = () => {
		let oldTodo = this.state.todolists
		const filteredTodolists = oldTodo.filter(todolist => todolist.title.toLowerCase().includes(this.state.searchFilter) )
		return filteredTodolists
	}

//// ON CLICK MOVE TO DONE LIST

   doneClickHandle = (todoID) => {
		// console.log(event.target, "hi")
		let array = [...this.state.todolists]
		let doneItem = array.find(todo => todo.id === todoID)
	  let newArray = array.filter(todo => todo.id !==  todoID)

		this.setState({
			doneLists: [...this.state.doneLists, doneItem],
			todolists: newArray
		})
	}

		undoneClickHandle = (todoID) => {
			// console.log(event.target, "Hello")
			let array = [...this.state.doneLists]
			let removeItem = array.find(todo => todo.id === todoID)
			let newList = array.filter(todo => todo.id !== todoID)

			this.setState({
				todolists: [...this.state.doneLists, removeItem],
				doneLists: newList
			})
		}


	render(){
		// const { todolists } = this.
		// debugger
		// console.log(this.state.todolists, "from list container")
			return (
				<div className="app">
				<h1>Search Current List</h1>
				<br />
				<Search
					onSearchChange={this.handleSearch}
					value={this.state.searchFilter}
					showNoResults={false}/>
				<br />
				<ListForm addNewList={this.addNewList}/>
				<ListCollection
					handleClick={this.doneClickHandle}
					todolists={this.changeFilter()}
					addToDone={this.handleDone}
				/>
				<DoneListCollection
					handleClick={this.undoneClickHandle}
				  todolists={this.state.doneLists}
					removeFromDone={this.removeFromDone}
				/>

				</div>
		)
	}
}

export default ListContainer
