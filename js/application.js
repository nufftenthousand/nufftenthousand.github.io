$(document).ready(function(){

	// // create background pattern
	// var colors = ["#6d6c4c", "#7d929a", "#792e3b", "#222342",/* "#d3c2a8",*/ "#d96841", "#c92e3f"/*, "#f5dfa9"*/];
	// var width = 344;
	// var height = 290;
	// var count = colors.length;
	// var offset = 4; 
	// var random = false;
	// var radius = 100;
	// var screenWidth = 2880;//screen.width * 2;
	// var screenHeight = 2880;//screen.height * 2;
	// var totalCols = Math.floor( screenWidth / width );
	// var totalRows = Math.ceil( screen.height / height );

	// // create row containers for tiles
	// for (var j = 0; j < totalCols; j++) {

	// 	$('<div>', {
	// 			"class" : "_d_row_"+j ,
	// 			"css" : {
	// 				"width" : screenWidth ,
	// 				"height" : height ,
	// 				"display" : "block"
	// 			}
	// 		}).appendTo( $('.disco') );

	// 	// create individual tiles
	// 	for (var i = 0; i < totalCols; i++) {

	// 		if (random == true) {
	// 			var index = Math.floor((Math.random()*count));
	// 		} else {
	// 			var index = (i+offset*j)%count;
	// 		}

	// 		$('<div>', {
	// 			"class" : "_d_col_"+i ,
	// 			"css" : {
	// 				"width" : width ,
	// 				"height" : height ,
	// 				"background-color" : colors[ index ] ,
	// 				"border-radius" : radius ,
	// 				"display" : "inline-block"
	// 			}
	// 		}).appendTo( $('._d_row_'+j) );

	// 	}
	// }

	// Initialize scroll snap
	$('#content').scrollSnap( $('#scrollBox').width()/4 );

	// Quick and dirty handler for pagination on window resizes
	$(window).resize( function() {
		$('#content').scrollLeft( $('#content').scrollLeft()+1 );
	});

	// Pagination animation for header nav links
	$('#header div.nav a').click( function() {

		p1 = 0;
		p2 = $('.scroll').width();
		p3 = $('.scroll').width() * 2;
		p4 = $('.scroll').width() * 3;

		if ( $(this).attr('id') == 'home' ) {
			$('#content').animate({scrollLeft: p1}, 300);
		} else if ( $(this).attr('id') == 'past' ) {
			$('#content').animate({scrollLeft: p2}, 300);
		} else if ( $(this).attr('id') == 'present' ) {
			$('#content').animate({scrollLeft: p3}, 300);
		} else if ( $(this).attr('id') == 'future' ) {
			$('#content').animate({scrollLeft: p4}, 300);
		}
	});

});
