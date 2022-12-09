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
        {console.log(orders)}
        <div style={{width: '50%'}}>
              <h3 style={{width: '50%', float: 'left'}}>Order ID</h3>
              <h3 style={{width: '50%', float: 'left'}}>Ordered Items</h3>
        </div>
        {orders.map(x => 
          <div style={{width: '50%'}}>
              <p style={{width: '50%', float: 'left'}}>{x.order_id}</p>
              <p style={{width: '50%', float: 'left'}}> {x.ordered_items.map(y => `[${y.count} ${y.food_name}] `)}</p>
          </div>)}
        </div>
    </div>
  );
}

export default App;
