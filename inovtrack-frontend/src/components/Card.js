import React from 'react';
import './Card.css';

function Card({ title, label, number }) {
  return (
    <div className="card">
      <p>{title}</p>
      <div className="card-label">{label}</div>
      <div className="card-footer">
        <span>{number}</span>
      </div>
    </div>
  );
}

export default Card;
