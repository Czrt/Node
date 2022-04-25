$(function(){
	$('.maodian').click(function(){
		$(window).scrollTop(0);
	})
	$(window).scroll(function(){
		var gundong  = document.body.scrollTop || document.documentElement.scrollTop;
		console.log(gundong);
		if( gundong > 100){
			$('.maodian').css('display','block')
		}else{
			$('.maodian').css('display','none')
		}
	})

	// ****************************
	$('.yiru2').mouseenter(function(){
		$('#xiala').slideDown();
	})
	$('.yiru2').mouseleave(function(){
		$('#xiala').slideUp();
	})
	// ##############################

	// $('.texiao a img').mouseenter(function(){
	// 	console.log(111);
	// 	$('.sanzhang-tu').css('display','block');
	// })

	$('.sanzhang-tu').click(function(){
		$('.dianji-qietu').css('display','block')
	})
	// 
	var index = 0;var len = $('.lunbo-1-left img').length;
		console.log(len);
			$('.aniu-right').click(function(){
				console.log(111);
				$('.aniu-left').css('display','block');
				$('.lunbo-1-left img').eq(index).hide();
				index++;
				if(index >= len-1){
					index=len-1;
					$('.aniu-right').css('display','none');
				}
				$('.lunbo-1-left img').eq(index).show();
				})

			$('.aniu-left').click(function(){
				console.log(222);
				$('.aniu-right').css('display','block');
				$('.lunbo-1-left img').eq(index).hide();
				index--;
				if(index <= 0){
					index=0;
					$('.aniu-left').css('display','none');
				}
				$('.lunbo-1-left img').eq(index).show();
				})



			$('.fang-tu ul li:first-child a').click(function(){
				$('.fang-tu ul li a').css('border','0');
				$('.fang-tu ul li:first-child a').css('border','1px solid red');
				$('.lunbo-1-left img').css('display','none');
				$('.lunbo-1-left img').eq(0).css('display','block');
			})

			$('.fang-tu ul li:nth-child(2)').click(function(){
				console.log(333)
				$('.fang-tu ul li a').css('border','0');

				$('.fang-tu ul li:nth-child(2) a').css('border','1px solid red');
				$('.lunbo-1-left img').css('display','none');
				$('.lunbo-1-left img').eq(1).css('display','block');
			})

			$('.fang-tu ul li:nth-child(3)').click(function(){
				console.log(333)
				$('.fang-tu ul li a').css('border','0');
				$('.fang-tu ul li:nth-child(3) a').css('border','1px solid red');
				$('.lunbo-1-left img').css('display','none');
				$('.lunbo-1-left img').eq(2).css('display','block');
			})

			$('.chahao a').click(function(){
				$('.dianji-qietu').hide();
			})

})