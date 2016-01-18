var cart = (function(){

		var cart    = JSON.parse(localStorage.getItem("cart"));
		((cart == null) ? cart = [] : "");
		
		var btnItem = document.querySelectorAll("button");
		var result  = document.querySelector(".result");
			
		function addItem(index){
			
			function getItem(){
	    // recuperando dados do item
	    var getItem   = btnItem[index].parentNode.parentNode,
	        id        = index + 1,
	        name      = getItem.querySelector(".product-name").innerText,
	        price     = getItem.querySelector(".product-price").innerText,
	        qty       = 0;

	    // criando objeto item
					var item = {
						id : id,
						name : name,
						price : price,
						qty : qty
					}
					return item;
			}

			function saveItem(){
					cart.push(getItem());
					localStorage.setItem("cart", JSON.stringify(cart));
					console.log("item(s) salvo(s)");
			}
			
			btnItem[index].addEventListener("click", saveItem, true);
		}

		for(var i = 0; i < btnItem.length; i++){
			addItem(i);
		}
}())