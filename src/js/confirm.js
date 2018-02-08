require(["config"],function(){
	require(["jquery","template","headerFooter","cookie"],function($, template){
		$.cookie.json = true;
		var _products = $.cookie("carts");
		
		var html = template("confirm", {con:_products});
		$("#ulGoodsList").append(html);
		var _price = 0,
			totalPrice = 0;
		$(_products).each(function(index, element){
			_price = `${element.price * element.amount}`;
			totalPrice += Number(_price);
		});


		$("#spcost_money,#b_pay_money").text(totalPrice.toFixed(2));
		$("#quan").on("click", "#p1 a,#p2 a", function(){
			$(this).addClass("curr").siblings("a").removeClass();
			// $(this).parent().sibilings().children().removeClass();
		});

		$(".address").on("click", "#divAddressLogin", function(){
			$(".cont").show();
			$(".cont").siblings("i").show();
		});
		$(".cont").on("click", "#btn_saveaddress, .close", function(){
			$(".cont").hide();
			$(".cont").siblings("i").hide();
		});


		$(function(){
			// 加载省份
			function loadProvince() {
				var url1 = "http://route.showapi.com/1149-1?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7&level=1&page=1",
					url2 = "http://route.showapi.com/1149-1?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7&level=1&page=2";

				$.when($.ajax(url1), $.ajax(url2)).then(function(a1, a2){
					// 将响应回的两页省份数据合并为一个数组结构
					var provinces = a1[0].showapi_res_body.data.concat(a2[0].showapi_res_body.data);
					// 遍历数组
					var html = `<option value="-1">请选择</option>`;//省份
					$.each(provinces, function(index, province){
						html += `<option value="${province.id}">${province.areaName}</option>`;
					});
					// 渲染
					$("#selProv").html(html);
				});
			}

			// 根据选择省份加载城市
			function loadCity() {
				// 获取选择的省份 id
				var _id = $("#selProv").val();
				// 构建URL
				var url = `http://route.showapi.com/1149-2?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7&parentId=${_id}`;
				// 请求
				$.getJSON(url).done(function(data){
					// 获取所有城市信息
					var cities = data.showapi_res_body.data;
					// 遍历
					var html = `<option value="-1">请选择</option>`;//城市
					$.each(cities, function(index, city){
						html += `<option value="${city.id}">${city.areaName}</option>`;
					});
					// 渲染
					$("#selCity").html(html);
				});
			}

			// 加载区县信息
			function loadDistrict() {
				// 获取选择的城市 id
				var _id = $("#selCity").val();
				// 构建URL
				var url = `http://route.showapi.com/1149-2?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7&parentId=${_id}`;
				// 请求
				$.getJSON(url).done(function(data){
					// 获取所有区县信息
					var districts = data.showapi_res_body.data;
					// 遍历
					var html = `<option>请选择</option>`;//区县
					$.each(districts, function(index, district){
						html += `<option value="${district.id}">${district.areaName}</option>`;
					});
					// 渲染
					$("#selDistrict").html(html);
				});
			}

			// 页面打开即加载省份
			loadProvince();
			// 当省份选择项改变，则加载城市
			$("#selProv").change(function(){
				$("#selCity").html(`<option>请选择</option>`);//城市
				$("#selDistrict").html(`<option>请选择</option>`);//区县
				loadCity();
			});
			// 当城市选择项改变，则加载区县
			$("#selCity").change(function(){
				$("#selDistrict").html(`<option>请选择</option>`);//区县
				loadDistrict();
			});
		});
	});
});