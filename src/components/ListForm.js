import React from 'react'
import { Grid, Segment, Form, Button } from 'semantic-ui-react'

class TodolistForm extends React.Component {

  state = {
    task: ''
  }


  // handleChange = (event) => {
  //   this.setState({
  //     [event.target.name]: event.target.value
  //   })
  // }

  createNewTodoList = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token")
    let newValue = event.target.name.value
    event.target.reset()
    fetch("http://localhost:3000/todolists", {
      method: "POST",
      headers: {
        "Authorization": token,
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({
        title: newValue
      })
    }).then(response => response.json())
    .then(newlist => {
      this.props.addNewList(newlist)
    })

  }



  render (){
    return (
      <div>
      <Grid columns={2} centered>
        <Grid.Column width={3}>
        </Grid.Column>
        <Grid.Column width={9}>
          <Segment>
          <Form onSubmit={this.createNewTodoList}>
            <Form.Field>
              <label>List Name: </label>
              <input type="text" name="name" placeholder="add a new todo ..."/>
            </Form.Field>
            <Button type='submit' className="btn-default">Create New List</Button>
          </Form>
          </Segment>
        </Grid.Column>
      </Grid>
      </div>
    )
  }



}

export default TodolistForm
