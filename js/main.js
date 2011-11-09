$(document).ready(function(){
		$('.shiny').children().delay(3000).each(function(i){
						$(this).delay(i*150).fadeTo(400, 0.8);
		});
		$('.navi').children().delay(3000).each(function(i){
						$(this).delay(i*150).fadeTo(400, 0.9);
		});
		$('.shiny').hover(
			function(){
				$(this).children().each(function(i){
						$(this).delay(i*55).fadeTo(200, 1);
				})
			},
			function(){
				$(this).children().each(function(i){
						$(this).delay(i*55).fadeTo(200, 0.8);
				});
			}
		);
});
