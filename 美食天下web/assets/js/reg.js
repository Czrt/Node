$(function(){
	var index  = 0,len=$('.beijing img').length;
	setInterval(function(){
		$('.beijing img').eq(index).fadeOut(2000);
		index++;
		console.log(index);
		index = index > len-1 ? 0 : index;
		$('.beijing img').eq(index).fadeIn(2000);
	},5000)
})