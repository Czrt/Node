$(function(){
	$('.maodian').click(function(){
		$(window).scrollTop(0);
	})
	window.onscroll = function(){
		var gundong  = document.body.scrollTop || document.documentElement.scrollTop;
		console.log(gundong);
		if( gundong > 100){
			$('.maodian').css('display','block')
		}else{
			$('.maodian').css('display','none')

		}
	}


	// *********************
	$('.yiru2').mouseenter(function(){
		$('#xiala').slideDown();
	})
	$('.yiru2').mouseleave(function(){
		$('#xiala').slideUp();
	})

	// *************************      无缝滚动轮播@@@@@@@@@@@@@@@@@@@@@@@@@@
	var index = 0;
	var len = $('.lunbo ul li').length/3;
	$('.lunbo li:first-child').clone(true).appendTo($('.lunbo ul'));
	$('.lunbo li:nth-child(2)').clone(true).appendTo($('.lunbo ul'));
	$('.lunbo li:nth-child(3)').clone(true).appendTo($('.lunbo ul'));
	console.log(len);
	$('.lunbo-left').click(function(){
		if(index == 0){
			$('.lunbo ul').css('left',-990*len);
			index = len;
		}
		index--;
		$('.lunbo ul').stop().animate({
			left:-index*1035
		},2000);
	})
	$('.lunbo-right').click(function(){
		index++;
		if(index > len){
			$('.lunbo ul').css('left',0);
			index = 0;
		}
		$('.lunbo ul').stop(true).animate({
			left:-index*1035
		},2000);
	})

	// ****************************
	// 点击切换图片
	$('.nav3 ul li:nth-child(2) a').click(function(){
		$('.xuan div:first-child ul li').css('display','none');	
		$('.xuan div:last-child ul li').css('display','block');	
		$(this).addClass('active10');
		$('.nav3 ul li:first-child a').removeClass('active10');
	})
	$('.nav3 ul li:first-child a').click(function(){
		$('.xuan div:first-child ul li').css('display','block');	
		$('.xuan div:last-child ul li').css('display','none');	
		$(this).addClass('active10');
		$('.nav3 ul li:nth-child(2) a').removeClass('active10');
	})

})
	// var ajax = document.getElementsByClassName('.ajax');
	// console.log(ajax);
	// var ul = document.getElementsByClassName('.jiazai');
	// console.log(ul);
	// 			var str = "";
	// ajax.onclick = function(){
	// 	$.get('list.php',function(msg){
	// 		msg.forEach(function(value,key){
	// 			str += '<li>';
	// 				str += '<a href="">';
	// 					str += '<div class="duotu-fangda"><img src="'+value.img+'" alt=""></div>';
	// 					str += '<p>'+value.title+'</p>';
	// 				str += '</a>';
	// 				str += '<a href="">'+value.qwe+'</a>';
	// 			str += '</li>';
	// 		})
	// 		ul.innerHTML += str;
	// 	},'json')
	// }
	$('.ajax').click(function(){
		$.get('list.json',function(msg){
		var str = '';
			console.log(msg);
			msg.forEach(function(value,key){
				str += '<li>';
					str += '<a href="">';
						str += '<div class="duotu-fangda"><img src="'+value.img+'" alt=""></div>';
						str += '<p>'+value.title+'</p>';
					str += '</a>';
					str += '<a href="">'+value.qwe+'</a>';
				str += '</li>';
			});
			console.log(str);
			$('.duotu ul').append(str);
		})
	})