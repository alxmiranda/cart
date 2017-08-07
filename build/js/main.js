'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Storage.prototype.set = function (key, value) {
  if (value === "string") {
    localStorage.setItem(key, value);
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

Storage.prototype.get = function (key) {
  return JSON.parse(localStorage.getItem(key));
};

var BudgetCart = function () {
  function BudgetCart() {
    _classCallCheck(this, BudgetCart);

    this.cart = localStorage.get('BudgetCart') === null ? [] : localStorage.get('BudgetCart');
    this.products = Array.from(document.querySelectorAll(".product"));
    this.selectorButtonAdd = ".product__button-add";
    this.selectorQuantity = ".product__quantity";
    this.selectorFeedback = ".product__feedback";
    this.cartTotal = document.querySelector(".header__notifications p span");
  }

  _createClass(BudgetCart, [{
    key: 'qtdItems',
    value: function qtdItems() {
      return this.cartStorage.length;
    }
  }, {
    key: 'setIds',
    value: function setIds() {
      var _this = this;

      this.products.forEach(function (product, index) {
        product.dataset.productId = '' + index;
        product.querySelector(_this.selectorButtonAdd).dataset.productButtonId = '' + index;
        product.querySelector(_this.selectorQuantity).dataset.productQuantityonId = '' + index;
        product.querySelector(_this.selectorFeedback).dataset.productFeedbackId = '' + index;
      });
    }
  }, {
    key: 'saveProduct',
    value: function saveProduct(idClick) {
      var _this2 = this;

      this.products.find(function (product) {

        if (product.dataset.productId === idClick) {
          var feedBack = product.querySelector(".product__feedback");
          var quantity = product.querySelector(".product__quantity");
          var name = product.querySelector(".product__name");
          var price = product.querySelector(".product__price");

          var data = {
            idProduct: product.dataset.productId,
            quantity: quantity.value,
            name: name.innerText,
            price: price.innerText
          };

          if (quantity.value == "") {
            quantity.focus();
            feedBack.innerText = "Informe a quantidade";
          } else {
            _this2.cart.push(data);
            localStorage.set('BudgetCart', _this2.cart);
          }
        }
      });
    }
  }, {
    key: 'removeProduct',
    value: function removeProduct(id) {}
  }, {
    key: 'updateQuantity',
    value: function updateQuantity() {}
  }, {
    key: 'getClick',
    value: function getClick() {
      var _this3 = this;

      this.products.forEach(function (product) {
        product.querySelector(_this3.selectorButtonAdd).addEventListener("click", function (e) {
          var idClick = e.target.dataset.productButtonId;
          _this3.saveProduct(idClick);
        });
      });
    }
  }, {
    key: 'init',
    value: function init() {
      console.log(this.cart);
      BudgetCart.validQuantity();
      this.getClick();
      this.setIds();
    }
  }], [{
    key: 'validQuantity',
    value: function validQuantity() {
      var quantitys = Array.from(document.querySelectorAll(".product__quantity"));

      quantitys.forEach(function (element, index) {
        element.addEventListener('input', function () {
          var pattern = /[a-z]/gi;
          if (pattern.test(this.value) === true) {
            element.value = element.value.replace(pattern, "");
          }
          if (this.value != "") {
            element.nextElementSibling.innerText = "";
          }
        });
      });
    }
  }]);

  return BudgetCart;
}();

var cart = new BudgetCart();
cart.init();