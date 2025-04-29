import React from "react";

function Item({ item, onUpdateItem, onDeleteItem }) {
  // Handle Update Click (Add/Remove from Cart)
  function handleUpdateClick() {
    const updatedItem = { ...item, isInCart: !item.isInCart };

    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedItem),
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then(() => onUpdateItem(updatedItem));
  }

  // Handle Delete Click
  function handleDeleteClick() {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => onDeleteItem(item));
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>

      <button
        className={item.isInCart ? "remove" : "add"}
        onClick={handleUpdateClick}
      >
        {item.isInCart ? "Remove From Cart" : "Add to Cart"}
      </button>

      <button className="remove" onClick={handleDeleteClick}>
        Delete
      </button>
    </li>
  );
}

export default Item;
