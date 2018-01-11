require(["config"], function(){
	require(["jquery","template","headerFooter","cookie"], function($,template){
		
			/*console.log(_prod)
			var id = _prod[0].id,
				imgs = _prod[0].imgs,
				
				amount = _prod[0].amount;
				console.log(price)*/
			// $.cookie.json = true;
			//加载对应商品的数据
		$.cookie.json = true;
		//加载对应商品的数据
		var contrast = $.cookie("id")+"";
		// console.log(contrast)
		$.getJSON("../mock/live.json", function(resdata){
			var contrastData = resdata.data.modulesType[0].mainlive.moduleItems;
			
			var arr=[],
				xb=0;
			$.each(contrastData,function(index,elements){
				arr.push(`${elements.id}`);
			})
			
			xb=$.inArray(contrast,arr);
		
			var cData = {products : resdata.data.modulesType[0].mainlive.moduleItems};

			var array =[]
			array.push(cData.products[xb]);
	
			var _src = array[0].src,
				_title = array[0].title,
				_price = array[0].salePrice,
				_id = array[0].id,
				_discount = array[0].discount,
				_OriginalPrice = array[0].OriginalPrice,
				_amount = 1;

			$(".big img").attr("src",_src);
			
			$("#ulSlider").find("img").attr("src",_src);

			$("#productName").html(_title);
		
			$(".price b").text("￥"+_price);
			$(".price em").text("￥"+_OriginalPrice);
			$("#buycount").text(_amount);
		

			$(".jia").on("click", function(){
				_amount++;
				$("#buycount").text(_amount);
				console.log()
			});
			$("label").on("click", ".jia, .jian", function(){
				var _amount = Number($("#buycount").val());
					if($(this).is(".jia")){
						_amount++;
					}else{
						if(_amount <= 1){
							_amount--;
						}
					}				
					$("#buycount").val(_amount);	
			});
			
			$("#btnAddShoppingCart").on("click", function(){
				var cart = {
					src : _src,
					title : _title,
					price : _price,
					id : _id,
					amount : _amount
				};	
			
				$.cookie.json = true;
				var cart_cookie = $.cookie("carts") || [];
				var index = $.inArray(cart.id, cart_cookie);
				if(index !== -1){
					cart_cookie[index].amount++;
				}else{
					cart_cookie.push(cart);
				}
				
				$.cookie("cart", cart_cookie,{expires:7,path:"/"});
				location = "/../html/cart.html";
			});
		});	
	});
});