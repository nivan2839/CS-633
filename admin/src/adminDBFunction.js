export async function getOrders() {
    const orders = fetch('http://localhost:3001/orderedItems')
        .then(res => res.json())
    return orders
}