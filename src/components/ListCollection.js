import React from 'react'
import ListCard from './ListCard';
import { Card } from 'semantic-ui-react'

const ListCollection = ({id, addToDone, todolists, handleClick}) => {

    return (
      <div>
      <h1>TodoList</h1>
      <ul>
        <Card.Group itemsPerRow={4}>

      {todolists.map(list => {
        return <ListCard
        handleClick={handleClick}
        key={list.id}
        action={addToDone}
        list={list}
        />
      })}
    </Card.Group>
    </ul>
      </div>
    );
  }


export default ListCollection;
