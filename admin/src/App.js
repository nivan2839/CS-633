import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { getOrders } from './adminDBFunction';

function App() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getOrders()
      .then(data => setOrders(data.orders))
  }, []);

  return (
    <div className="App">
      <div className="App-header">
        <div className='order-box'>
              <h3 style={{width: '40%', float: 'left'}}>Order ID</h3>
              <h3 style={{width: '40%', float: 'left'}}>Ordered Items</h3>
        </div>
        {orders.map(x => 
          <div className='order-box'>
              <p style={{width: '40%', float: 'left'}}>{x.order_id}</p>
              <p style={{width: '40%', float: 'left'}}> {x.ordered_items.map(y => `[${y.count} ${y.food_name}] `)}</p>
          </div>)}
        </div>
    </div>
  );
}

export default App;
