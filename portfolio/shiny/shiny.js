$(document).ready(function(){

	var chars = $('.shiny').text().split("");
	$('.shiny').empty();
	$.each(chars, function (i, el) {
		$('.shiny').append("<span>" + el + "</span>");
	});

	$('.shiny').hover(
		function(){
			$(this).children().each(function(i){
				$(this).delay(i*55).fadeTo(200,0.5);
			})
		},
		function(){
			$(this).children().each(function(i){
				$(this).delay(i*55).fadeTo(200,1);
			});
		}
	);
		
});
