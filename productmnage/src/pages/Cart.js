import React, { useState } from 'react';

function Cart() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'T-shirt', price: 19.99, quantity: 2 },
    { id: 2, name: 'Jeans', price: 49.99, quantity: 1 },
  ]);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: cartItems, total }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Commande créée:', data);
        alert('Commande passée avec succès !');
        setCartItems([]);
      })
      .catch(error => console.error('Erreur lors de la création de la commande:', error));
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Votre Panier</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Produit</th>
            <th>Prix</th>
            <th>Quantité</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.price.toFixed(2)} €</td>
              <td>{item.quantity}</td>
              <td>{(item.price * item.quantity).toFixed(2)} €</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" className="text-end"><strong>Total:</strong></td>
            <td><strong>{total.toFixed(2)} €</strong></td>
          </tr>
        </tfoot>
      </table>
      <button className="btn btn-success" onClick={handleCheckout}>Passer la commande</button>
    </div>
  );
}

export default Cart;

