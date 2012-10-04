$(document).ready(function(){
		// $('.shiny').children().delay(3000).each(function(i){
		// 				$(this).delay(i*150).fadeTo(400, 0.8);
		// });
		$('.shiny').hover(
			function(){
				$(this).children().each(function(i){
					$(this).delay(i*55).fadeTo(200, 0.5);
				})
			},
			function(){
				$(this).children().each(function(i){
					$(this).delay(i*55).fadeTo(200, 1);
				});
			}
		);
});
