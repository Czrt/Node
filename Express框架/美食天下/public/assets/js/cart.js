$(function(){
	$('.maodian').click(function(){
		$(window).scrollTop(0);
	})
	// &&&&&&&&&&&
	var index = 0,len=$('.lunbo-left a').length;
	setInterval(function(){
		$('.lunbo-left a img').eq(index).fadeOut(300);
		index++;
		if(index > len-1){
			index = 0;
		}
		$('.lunbo-left a img').eq(index).fadeIn(300);
	},5000)
		$('.lunbo-left ul li').stop(true,true);
	$('.lunbo-left ul li').mouseover(function(){
		$('.lunbo-left a img').eq(index).fadeOut(300);
		$('.lunbo-left ul li').eq(index).removeClass('active');
		index = $(this).index();
		$('.lunbo-left a img').eq(index).fadeIn(300);
		$('.lunbo-left ul li').eq(index).addClass('active');
	})

	// !@@@@@@@@@@@@@@

	var top = $('.container-right').offset().top;
	window.onscroll = function(){
		var gun  = document.body.scrollTop || document.documentElement.scrollTop;
		if(gun >= top){
			$('.container-right').css({'position':'fixed','top':'40px','right':'135px'});
		}else{
			$('.container-right').css('position','');
		}
		
		var gundong  = document.body.scrollTop || document.documentElement.scrollTop;
		console.log(gundong);
		if( gundong > 100){
			$('.maodian').css('display','block')
		}else{
			$('.maodian').css('display','none')

		}
	}
})