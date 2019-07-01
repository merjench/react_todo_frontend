import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'
import Profile from './containers/Profile'
import Navbar from './components/Navbar'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'

class App extends Component {
	state = {
		currentUser: null
	}

	componentDidMount(){
		const token = localStorage.getItem("token")
		if(token){
			// let's go get some user data
			fetch("http://localhost:3000/api/v1/auto_login", {
				headers: {
					"Authorization": token
				}
			})
			.then(res => res.json())
			.then(response => {
				if (response.errors){
					localStorage.removeItem("user_id")
					alert(response.errors)
				} else {
					this.setState({
						currentUser: response
					})
				}
			})
		}
	}

	setCurrentUser = (user) => {
		this.setState({
			currentUser: user
		})
	}

	logOut = () => {
		this.setState({
			currentUser: null
		})

		this.props.history.push("/")
	}

	render() {
		return (
			<Grid>
				<Navbar currentUser={this.state.currentUser} logOut={this.logOut} />
				<Grid.Row centered>
					<Switch>
						<Route path="/users/:id" component={Profile} />
						<Route path="/login" render={(routerProps) => {
							return <LoginForm setCurrentUser={this.setCurrentUser} {...routerProps}/>
						}} />
						<Route path="/signup" render={(routerProps) => {
							return <SignupForm setCurrentUser={this.setCurrentUser} {...routerProps}/>
						}} />
					</Switch>
				</Grid.Row>
			</Grid>
		);
	}
}

export default App;
