require(["config"], function(){
	require(["jquery","template","headerFooter","cookie"], function($, template){
		$.cookie.json = true;

		var _products = $.cookie("carts") || [];
		if (_products.length === 0) { // 购物车为空

			return;
		}

		var html = template("carts", {cart: _products});
		$("#tbCartList tbody").append(html);
		// 查找 id 所表示的商品在 products 中位置
		function exist(id, products){
			var idx = -1;
			$.each(products, function(index, element){
				if(element.id == id){
					idx = index;
					return false;
				}
			});
			return idx;
		}

		/************************************************************/
		/* 删除选购商品 */

		$(".trolley").on("click",".del",function(){
			if(confirm("确认删除？")){
				var _row = $(this).parents("tr");
				var _id = _row.find("input").attr("id");
				var index = exist(_id, _products);
				_products.splice(index, 1);
				$.cookie("carts", _products, {expires:7, path:"/"});
				_row.remove();
				// calcTotal();	
			}
		});

		/************************************************************/
		/* 修改商品数量 */
		// +/-
		$(".trolley").on("click", ".jia,.jian", function(){
			// 当前“+/-”所在行
			var _row = $(this).parents("tr");
			// 获取当前删除商品的 id
			var _id = _row.find("input").attr("id");
			// 当前删除商品在所有数组元素中的下标
			var index = exist(_id, _products);
			// 当前行所对应的商品对象
			var _prod = _products[index];

			if ($(this).is(".jia")) { // 数量加			
				_prod.amount++;
			} else { // 数量减
				if (_prod.amount <= 1)
					return;
				_prod.amount--;
			}
			// 保存回 cookie 中
			$.cookie("carts", _products, {expires:7, path:"/"});
			// 显示修改后的数量
			_row.find("input:last").val(_prod.amount);
			// 显示小计
			_row.find(".s1").text((Number(_prod.amount * _prod.price)).toFixed(2));
			// 计算合计
			calcTotal();
		});
		// 输入修改
		$(".trolley").on("blur", ".tel", function(){
			// 当前“输入框”所在行
			var _row = $(this).parents("tr");
			// 获取当前删除商品的 id
			var _id = _row.find("input").attr("id");
			// 当前删除商品在所有数组元素中的下标
			var index = exist(_id, _products);
			// 当前行所对应的商品对象
			var _prod = _products[index];

			// 判断输入格式是否正确
			if (!/^[1-9]\d*$/.test($(this).val())) { // 输入不合法，还原原有数量
				$(this).val(_prod.amount);
				return;
			}

			// 数量修改成功
			_prod.amount = $(this).val();
			// 保存回 cookie 中
			$.cookie("carts", _products, {expires:7, path:"/"});
			// 显示小计
			_row.find(".s1").text(_prod.amount * _prod.price);
			// 计算合计
			calcTotal();
		});

		/************************************************************/
		/* 全选 */
		$("#cbseletall_top").click(function(){
			// 获取当前“全选”复选框选中状态
			var status = $(this).prop("checked");
			// 将所有商品行前复选框选中状态设置为与“全选”一致的状态
			$(".cbseletall").prop("checked", status);
			// 计算合计
			calcTotal();
		});

		$(".cbseletall").click(function(){
			var status = $(".cbseletall:checked").length === _products.length
			$("#cbseletall_top").prop("checked", status);
			// 计算合计
			calcTotal();
		});

		/************************************************************/
		/* 计算合计 */
		function calcTotal() {
		// 获取所有选中的商品行前的复选框
			var sum = 0;
			$(".cbseletall:checked").each(function(index, element){
				sum += Number($(this).parents("tr").find(".s1").text())
			});
			$("#pay_money").text(sum.toFixed(2));
		}
		/************************************************************/
		$(".trolley").on("click", function(){
			location="confirm.html";
		});
	});
});