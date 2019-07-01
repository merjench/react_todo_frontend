import React from 'react'
import ListContainer from './ListContainer'
import { Loader } from 'semantic-ui-react'

class Profile extends React.Component {

	state = {
		user: null,
	}


	componentDidMount(){
		const userId = this.props.match.params.id
		// fetch("http://localhost:3000/todolists")
		fetch(`http://localhost:3000/api/v1/users/${userId}`)
		.then(res => res.json())
		.then(response => {
			this.setState({
				user: response
			})
		})
	}

	render(){

		const { user } = this.state

		if(user){
			return (
				<div className="ListContainer">
					<ListContainer user={this.state.user}/>
				</div>
			)
		} else {
			return <Loader />
		}
	}
}

export default Profile
