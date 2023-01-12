import React, { useState } from "react";
import './DNDComponent.css';

const boxBgColor = [{Red: "Red", 
            Blue: "Blue", 
            Green: "Green", 
            Black: "#000000db"}]

function DndComponent(props) {

  const [todos, setTodos] = useState([]);
  const [cardTitle, setCardTitle] = useState('');
  const [cardCountId, setCardCountId] = useState(0) ;
  const[overItem, setOverItem] = useState(0);
  const[pickedCard, setPickedCard] = useState([]); 
  const[sourceArr, setSourceArr] = useState([]); 
  const[destArr, setDestArr] = useState([]); 
  const[showError, setShowError] = useState('');

  const handleDragStart = (e, id, index, colorName) => {
    e.dataTransfer.setData("index", index);
    setPickedCard({ id: id, name: cardTitle });
    setSourceArr([...todos]);
    console.log("Todos: ", todos)
  };

  const deleteCard = (e, id) => {
    e.preventDefault();
    const newTodos = todos.filter((todo)=> todo.id !== id);
    setTodos(newTodos);
    setShowError('');
  };

  const handleDrop = (e, colorName) => {
    e.preventDefault();
    const droppedIndex = e.dataTransfer.getData("index");
    const items = Array.from(todos);
    const [reorderedItem] = items.splice(droppedIndex, 1);
    items.splice(overItem, 0, reorderedItem);

    setTodos(items);

  };

  const handleDragOver = (e, index, id, colorName) => {
    e.preventDefault();
    setOverItem(index);
  };

  const handleAddCard = (e) => {
    e.preventDefault();
    if(!cardTitle || cardCountId>7) {
      setShowError("Error: Limit exceeds");
      return;
    }
    setTodos([...todos, { id: cardCountId, name: cardTitle }]);
    setCardCountId(cardCountId+1);
    setCardTitle('');
  }

  return (
    <div className="DndComponent">
        <h5>{props.name} Cards</h5>
        <form className="dndForm">
        <input
          type="text"
          placeholder="Enter card title"
          value={cardTitle}
          onChange={e => setCardTitle(e.target.value)}
        />
        <button type="submit" onClick={handleAddCard}>Add Card</button>
      </form>
      <h6 className="errorText">{showError}</h6>
      <div className="list">
        {todos
          .map((todo, index) => (
            <div
              key={todo.id}
              onDrop={(e) => handleDrop(e, props.name)}
              onDragOver={(e) => handleDragOver(e, index, todo.id, props.name)}
              onDragStart={(e) => handleDragStart(e, todo.id, index, props.name)}
              draggable={true}
              className="todo"
              style={{ backgroundColor: boxBgColor[0][props.name] }}
            >
              {todo.name}
            <p className="deleteCard" key={todo.id} onClick={(e) => deleteCard(e, todo.id)}>X</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default DndComponent;