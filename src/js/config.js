require.config({
	baseUrl : "/", 
	paths : {
		"jquery" : ["lib/jquery/jquery-1.12.4.min"],
		"cookie" : "lib/jquery_plugins/jquery.cookie",
		"zoom" : "lib/jquery_plugins/jquery.elevateZoom",
		"fly" : "lib/jquery_plugins/jquery.fly",
		"template" : "lib/arttemplate/template",
		"load" : "js/loadHeaderFooter",
		"headerFooter":"js/HeaderFooter",
		// "slide" : "js/jquery_plugins/jquery_plugins/jquery.SuperSlide.2.1.1"
		"xmcarousel":"lib/jquery_plugins/xmcarousel/jquery.xmcarousel"
	},
	shim : {
		"zoom" : {
			deps : ["jquery"]
		}
	}
});