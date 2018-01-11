require(["config"], function(){
	require(["load"], function(){
		require(["xmcarousel"], function() {
			$(".banner-slider").eq(0).carousel({
				imgs: [{
					src: "http://image-family.huijiayou.cn/cfiles/staticfiles/upload/2bf88/3191a2f1d1bb4914a7f24e59e2b4072a.jpg",
					href: "#"
				}, {
					src: "http://image-family.huijiayou.cn/cfiles/staticfiles/upload/2bf86/fcefce1528f34d68b226251549e19860.jpg",
					href: "#"
				}, {
					src: "http://image-family.huijiayou.cn/cfiles/staticfiles/upload/2bf88/1921c65c63c8459f8dc11d664614bbba.jpg",
					href: "#"
				}, {
					src: "http://image-family.huijiayou.cn/cfiles/staticfiles/upload/29b33/851a8b28d703470c943ad8c10bddf242.jpg",
					href: "#"
				}, {
					src: "http://image-family.huijiayou.cn/cfiles/staticfiles/upload/29c10/df7bc72d38ab4f72b0287c4216bccfd6.jpg",
					href: "#"
				}],
				isPrevNextPage: true,
				width: 714,
				height: 382,
				duration: 3000,
				isAuto: true,
				type: "fade"
			});
		});

 		require(["jquery", "template", "cookie"], function($, template) {
			$.ajax("../mock/live.json").done(function(responseData) {

				var html = template("cate", {
					cat: responseData.data.modulesType[0].mainlive.moduleItems
				});
				$(".live_list").html(html);
			}).done(function(){

				$.ajax("../mock/floors.json").done(function(data){
			
					var html = template("floor", {
						floor: data.res_body.data
					});

					$(".floors").html(html);
				});
			}).done(function(){
				
				$(".purchase li").on("click", function(e){
					e = e || event;
				
					$.cookie("id","",{path:"/"});

					var _id = $(e.target).parent().find("input").val();
			
					$.cookie("id",_id,{expires:7,path:"/"})
					console.log($.cookie("id"))
					location = "html/detail.html";
				});
			});
		});
	});
});					// location = "html/detail.html";
				/*$.cookie("products", "", {
					path:"/"
				});
			
				// var product = [];
				if(e.target.tagName == "EM"){
					var _price = $(e.target).html();
					console.log($(e.target).html())
					// product.price = _price;

				}else if(e.target.tagName == "B" && $(e.target).parent().is("a")){
					var _title = $(e.target).html();
					
				}else if(e.target.tagName == "IMG"){
					var _imgs = $(e.target).attr("src");
					var _id = $(e.target.parentNode.previousElementSibling).val();
				}
				
				if(e.target.tagName == "EM"
					|| e.target.tagName == "B" && $(e.target).parent().is("a")
					|| e.target.tagName == "IMG"){
					// var _price = $(e.target).html();
					// console.log($(e.target).html())
					// var _title = $(e.target).html();
					var _imgs = $(e.target).attr("src");
					var _id = $(e.target.parentNode.previousElementSibling).val();

				}


				var product = {
					id : _id,
					imgs : _imgs,
					// price : _price,
					// title : _title,
					amount : 1
				};

				$.cookie.json = true;
				var _prod = $.cookie("products") || [];
				
					_prod.push(product);
					console.log(_prod);
				$.cookie("products", product, {expires:7, path:"/"});

				
					location = "html/detail.html";
					function exist(id, products){
						for(var i = 0, len = products.length; i < len; i++){
							if(products[i].id == id)
								return i;
						}
						return -1;
					}*/	
				
		

