var BudgetCart = function(){
  'use strict'

  var _ = this;

  _.config = {
   cartStorage : JSON.parse(localStorage.getItem("BudgetCart")),
   btnItem     : Array.prototype.slice.call(document.querySelectorAll(".product__actions .btn")),
   cartTotal   : document.querySelector(".header__notifications p span"),
  };

  _.nItens = function () {
   _.config.cartTotal.innerText = _.config.cartStorage.length;
  };
  
  _.saveItem = function(el, i){

    var itemDetails = {};
    
    itemDetails.id    = i;
    itemDetails.name  = el.parentNode.parentNode.querySelector(".product__name").innerText;
    itemDetails.price = el.parentNode.parentNode.querySelector(".product__price").innerText;
    
    _.config.cartStorage.push(itemDetails);
    localStorage.setItem("BudgetCart", JSON.stringify(_.config.cartStorage));
    _.nItens();
  };

  ((_.config.cartStorage === null) ? _.config.cartStorage = [] : "");
  
  _.nItens();

  _.config.btnItem.forEach(function(el, i, arr){
   el.addEventListener("click", function(){
    _.saveItem(el, i)
   });
  });
};
new BudgetCart();