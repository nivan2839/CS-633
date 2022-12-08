

export async function retrieveMenu(){
    const options = await fetch('http://localhost:3001/menu')
        .then(res => res.json())
        .then(data => {
            let menu = data.menu;
            let options = [];
            for (let key in menu) {
                let obj = {
                    id: key,
                    ...menu[key]
                }
                options.push(obj);
            };
            return options;
        });
    return options;  
}

export async function order(items) {
    const time = fetch('http://localhost:3001/order', {
        method: 'POST',
        body: JSON.stringify({
            items
        }),
        headers:{
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(res => res.json())
        .then(data => data.time)
         return time;
}