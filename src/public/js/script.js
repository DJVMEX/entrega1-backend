const socketClient = io();

const form = document.getElementById('form');
const inputTitle = document.getElementById('title');
const inputDescription = document.getElementById('description');
const inputPrice = document.getElementById('price');
const inputCategory = document.getElementById('category');
const inputCode = document.getElementById('code');
const inputStock = document.getElementById('stock');
const inputSend = document.getElementById('send');
const pProducts = document.getElementById('products');

form.onsubmit = (e) =>{
    e.preventDefault();
    const title = inputTitle.value;
    const description = inputDescription.value;
    const price = inputPrice.value;
    const category = inputCategory.value;
    const code = inputCode.value;
    const stock = inputStock.value;
    
    const product = {
        title, 
        description,
        price,
        category,
        code, 
        stock
    }

    socketClient.emit('newProduct', product);
}

socketClient.on('products', (arrayProduct) => {
    let infoProducts = '';   
    pProducts.innerHTML = arrayProduct;
})

function eliminarProducto(id) {
    socketClient.emit('deleteProduct', id);
}
