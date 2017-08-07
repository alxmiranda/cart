Storage.prototype.set = (key, value) => {
  if(value === "string"){
    localStorage.setItem(key, value)
  } else {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

Storage.prototype.get = (key) => {
  return JSON.parse(localStorage.getItem(key))
}

class BudgetCart {
  constructor(){
    this.cart = ((localStorage.get('BudgetCart') === null) ? [] : localStorage.get('BudgetCart'));
    this.products = Array.from(document.querySelectorAll(".product"));
    this.selectorButtonAdd = ".product__button-add";
    this.selectorQuantity = ".product__quantity";
    this.selectorFeedback = ".product__feedback";
    this.cartTotal = document.querySelector(".header__notifications p span");
  }
  
  qtdItems(){
    return this.cartStorage.length
  }
  
  setIds(){
    this.products.forEach((product, index) => {
      product.dataset.productId = `${index}`;
      product.querySelector(this.selectorButtonAdd).dataset.productButtonId = `${index}`;
      product.querySelector(this.selectorQuantity).dataset.productQuantityonId = `${index}`;
      product.querySelector(this.selectorFeedback).dataset.productFeedbackId = `${index}`;
    })
  }

  static validQuantity(){
    let quantitys = Array.from(document.querySelectorAll(".product__quantity"));

    quantitys.forEach((element, index) => {
      element.addEventListener('input', function(){
        let pattern = /[a-z]/gi;
        if(pattern.test(this.value) === true){
          element.value = element.value.replace(pattern, "")
        }
        if(this.value != ""){
          element.nextElementSibling.innerText = ""
        }
      })
    })
  }
  
  saveProduct(idClick) {
    this.products.find((product) => {

      if(product.dataset.productId === idClick) {
        let feedBack = product.querySelector(".product__feedback")
        let quantity = product.querySelector(".product__quantity");
        let name = product.querySelector(".product__name");
        let price = product.querySelector(".product__price");

        let data = {
          idProduct:product.dataset.productId, 
          quantity:quantity.value,
          name:name.innerText,
          price:price.innerText
        }

        if(quantity.value == ""){
          quantity.focus();
          feedBack.innerText = "Informe a quantidade"
        } else {
          this.cart.push(data);
          localStorage.set('BudgetCart', this.cart)
        }
      }

    })
  }

  removeProduct(id) {
    
  }

  updateQuantity() {

  }

  getClick(){
    this.products.forEach((product) => {
      product.querySelector(this.selectorButtonAdd).addEventListener("click", (e) => {
        let idClick = e.target.dataset.productButtonId;
        this.saveProduct(idClick);
      })
    })
  }
  
  init(){
    console.log(this.cart);
    BudgetCart.validQuantity();
    this.getClick();
    this.setIds()
  }
}

let cart = new BudgetCart()
cart.init()