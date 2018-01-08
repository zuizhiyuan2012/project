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
			});
		 			
				/*$(".category-list li").hover(function() {
				var imgs = $(this).children("a").children("i").children("img");
				imgs.stop().animate({
					"width": "101%",
					"height": "101%"
				}, 100, "linear")

				$(this).css({
					"box-shadow": "0 6px 6px rgba(0, 0, 0, 0.1)"

				});
			}, function() {*/
				/*var imgs = $(this).children("a").children("i").children("img");

				imgs.stop().animate({
					"width": "100%",
					"height": "100%"
				}, 100, "linear")
				$(this).css({
					"box-shadow": ""

				});
			});*/
		});
	});
});
