import React from 'react';
import Column from './Column';
import './Board.css';

function Board() {
  const columns = [
    { title: 'TO DO', tasks: 5 },
    { title: 'IN PROGRESS', tasks: 5 },
    { title: 'CODE REVIEW', tasks: 2 },
    { title: 'DONE', tasks: 8 }
  ];

  return (
    <div className="board">
      {columns.map((column, index) => (
        <Column key={index} title={column.title} tasks={column.tasks} />
      ))}
    </div>
  );
}

export default Board;
