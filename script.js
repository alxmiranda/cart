var cart = (function(){

	var btn = document.querySelectorAll("button");
	var arraItens = [];

	function addItem(index){

		function clickItem(){
			// recuperando dados do item
			var getItem   = btn[index].parentNode.parentNode,
							id        = index + 1,
							name      = getItem.querySelector(".product-name").innerText,
							price     = getItem.querySelector(".product-price").innerText,
							qty       = 0;

			// convertendo array em string
			var item   = 
							{
								id : id,
								name : name,
								price : price,
								qty : qty
							};
			arraItens.push(item);

			// salvando string no localstorage
			localStorage.setItem("cart", JSON.stringify(arraItens));

		}

		btn[index].addEventListener("click", clickItem, true);			
	}

	for(var i = 0; i < btn.length; i++){
		addItem(i);
	}
}())