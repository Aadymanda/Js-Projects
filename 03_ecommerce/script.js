document.addEventListener("DOMContentLoaded", () => {
  
  const products = [
    { id: 1, name: "Product 1", price: 29.99 },
    { id: 2, name: "Product 2", price: 19.99 },
    { id: 3, name: "Product 3", price: 59.999 },
  ];

  const cart = JSON.parse(localStorage.getItem("cart")) || [];  // assignment given to save the cart items in local storage   --> this portion used to get the item from the local storage if it is already present -->(JSON.parse(localStorage.getItem("cart")) ||)
  
  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-btn");

 
  renderCart();     // assignment --> yha pehle isliye render kiya bcz agar koi item already cart mai tha and delete nhi kye hai to page reload hone par wapas se local storage se render hojayega 

  products.forEach((product) => {

    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
    <span>${product.name} - $${product.price.toFixed(2)}</span>
    <button data-id="${product.id}">Add to cart</button>
    `;
    productList.appendChild(productDiv);

  });

  

  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      // console.log("Clicked");  //jus to check wheather it is getting displayed only after clicking button of product list or not 
      const productId = parseInt(e.target.getAttribute("data-id"));

      const product = products.find((p) => p.id === productId);
      addToCart(product);
    }
  });

  //done by me as assignment
  cartItems.addEventListener("click", (e) => {
    
    if (e.target.tagName === "BUTTON"){
      console.log(e.target.getAttribute("id"));
      
      const productId = parseInt(e.target.getAttribute("id"));
      const product = products.find((p) => p.id === productId);
      removeFromcart(product);

    }

  });
  function removeFromcart(product) {
    cart.pop(product);
    console.log(cart);
    
    renderCart();
  }
  /* upto here assignment is don by me */

  function addToCart(product) {
    cart.push(product);
    // console.log(cart);
    
    renderCart();
  }

  function renderCart() {

    cartItems.innerText = "";
    let totalPrice = 0;

    if (cart.length > 0) {

      emptyCartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");

      cart.forEach((item,index) => {

        totalPrice += item.price;
        const cartItem = document.createElement("div");
        // var x = document.createElement("BUTTON");
        cartItem.innerHTML = `<span>
        ${item.name} - $${item.price.toFixed(2)}</span> 
        <button id = ${item.id}> delete </button>
        `;    // here button added by me as assignment
        
        cartItems.appendChild(cartItem);
        totalPriceDisplay.textContent = `${totalPrice.toFixed(2)}`;
        
        
      });
      saveTasks()
    } else {
      emptyCartMessage.classList.remove("hidden"); 

      //next 3 line done by me
      const cartItem = document.createElement("div");
      cartItem.innerHTML  = "Your Cart Is Empty.";
      cartItems.appendChild(cartItem);
      
      totalPriceDisplay.textContent = `$0.00`;
      saveTasks()
    }
  }

  checkOutBtn.addEventListener("click", () => {
    
    cart.length = 0;
    alert("Checkout successfully");

    renderCart();
  });

  function saveTasks() {
      //local storag has an api to acces this //just by writting "localStorage" our localstorage api can be invoked 
      localStorage.setItem("cart", JSON.stringify(cart));
    
      //int setItem we use to put it in the format key, String
      // task is the key which is array and to convert it into string we use Json.Stringify to the value of tasks
    }
});
// below code is from to do project for saving task to localstorage 

// let tasks = JSON.parse(localStorage.getItem("tasks")) || []; 

// saveTasks();  // in render function
// function saveTasks() {
//   //local storag has an api to acces this //just by writting "localStorage" our localstorage api can be invoked 
//   localStorage.setItem("tasks", JSON.stringify(tasks));

//   //int setItem we use to put it in the format key, String
//   // task is the key which is array and to convert it into string we use Json.Stringify to the value of tasks
// }
