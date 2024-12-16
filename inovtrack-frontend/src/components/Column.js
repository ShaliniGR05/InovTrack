import React from 'react';
import Card from './Card';
import './Column.css';

function Column({ title, tasks }) {
  const cards = Array.from({ length: tasks }, (_, i) => ({
    id: i,
    title: `Task ${i + 1}`,
    label: 'Label',
    number: `TIS-${i + 1}`
  }));

  return (
    <div className="column">
      <div className="column-header">
        <h2>{title}</h2>
        <span>{tasks}</span>
      </div>
      <div className="column-cards">
        {cards.map((card) => (
          <Card key={card.id} title={card.title} label={card.label} number={card.number} />
        ))}
      </div>
    </div>
  );
}

export default Column;
