import React from 'react';
import ListCard from './ListCard';
import { Card } from 'semantic-ui-react'

const DoneListCollection= ({id, todolists, removeFromDone, handleClick }) => {

  return (
      <div>
         <h1>Done List</h1>
         <ul>
      <Card.Group itemsPerRow={4}>
      {todolists.map(list => {
        return <ListCard
        handleClick={handleClick}
        key={list.id}
        list={list}
        action={removeFromDone}
        />
      })}
      </Card.Group>
      </ul>
    </div>
    );
  }

export default DoneListCollection;
