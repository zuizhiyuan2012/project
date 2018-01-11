require(["config"], function(){
	require(["jquery","headerFooter","cookie"], function(){
		$.cookie.json = true;
		var _products = $.cookie("cart") || [];
		if (_products.length === 0) { // 购物车为空
			// $(".cart_body").html(`购物车为空，请<a href="list.html">选购商品</a>`);
			return;
		}
	});
});