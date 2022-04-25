var index = 0;
var len = ('.lun li').length;
$(function() {
    setInterval(function() {
        $('.lun img').eq(index).fadeOut(1000);
        $('.lol li span').eq(index).removeClass('active');
        index++;
        // console.log(index)
        index = index >= len - 1 ? 0 : index;
        $('.lun img').eq(index).fadeIn(1000);
        $('.lol li span').eq(index).addClass('active');
    }, 3000);
    $('.lol li').click(function() {
        $('.lun img').eq(index).fadeOut(1000);
        $('.lol li span').eq(index).removeClass('active');
        index = $(this).index();
        $('.lun img').eq(index).fadeIn(1000);
        $('.lol li span').eq(index).addClass('active');
    })
    $('.right a ').click(function() {
        $('.lun img').eq(index).fadeOut(1000);
        $('.lol li span').eq(index).removeClass('active');
        index++;
        index = index >= len - 1 ? 0 : index;
        $('.lun img').eq(index).fadeIn(1000);
        $('.lol li span').eq(index).addClass('active');
    })
    $('.left a ').click(function() {
        $('.lun img').eq(index).fadeOut(600);
        $('.lol li span').eq(index).removeClass('active');
        index--;
        index = index < 0 ? len - 1 : index;
        $('.lun img').eq(index).fadeIn(600);
        $('.lol li span').eq(index).addClass('active');
    })
    $('.left-erji ul li').eq(1).mouseover(function() {
        $('.lefterji1').css('display', 'block');
    })
    //选项卡的点击切换效果 
    $('.shiliao').click(function() {
        $('.ka1-1').css('display', 'none');
        $('.ka1-title h2:first-child a').removeClass('active1');
        $('.ka1-2').css('display', 'block');
        $('.shiliao').addClass('active1');
    })
    $('.ka1-title h2:first-child a').click(function() {
        $('.ka1-2').css('display', 'none');
        $('.shiliao').removeClass('active1');
        $('.ka1-1').css('display', 'block');
        $('.ka1-title h2:first-child a').addClass('active1');
    })

    $('.shipu').click(function() {
        $('.ka2-1').css('display', 'none');
        $('.ka2-title h2:first-child a').removeClass('active2');
        $('.ka2-2').css('display', 'block');
        $('.shipu').addClass('active2');
    })
    $('.ka2-title h2:first-child a').click(function() {
        $('.ka2-2').css('display', 'none');
        $('.shipu').removeClass('active2');
        $('.ka2-1').css('display', 'block');
        $('.ka2-title h2:first-child a').addClass('active2');
    })

    $('.yizhou').click(function() {
        $('.tupian').fadeOut(300);
        $('.tupian1').fadeIn(300);
        $('.tupian2').fadeOut(300);
        $('.nav1 h3:first-child a').removeClass('active3');
        $('.nav1 h3:nth-child(2) a').addClass('active3');
        $('.nav1 h3:nth-child(3) a').removeClass('active3');
    })
    $('.nav1 h3:nth-child(1) a').click(function() {
        $('.tupian').fadeIn(300);
        $('.tupian1').fadeOut(300);
        $('.tupian2').fadeOut(300);
        $('.nav1 h3:first-child a').addClass('active3');
        $('.nav1 h3:nth-child(2) a').removeClass('active3');
        $('.nav1 h3:nth-child(3) a').removeClass('active3');
    })
    $('.zuishou').click(function() {
        $('.tupian').fadeOut(300);
        $('.tupian1').fadeOut(300);
        $('.tupian2').fadeIn(300);
        $('.nav1 h3:first-child a').removeClass('active3');
        $('.nav1 h3:nth-child(2) a').removeClass('active3');
        $('.nav1 h3:nth-child(3) a').addClass('active3');
    })
    $('.jinghua').click(function() {
        $('.nav3 h3:first-child a').removeClass('active5');
        $('.jinghua').addClass('active5');
        $('.pinglun').fadeOut(300);
        $('.duotu').fadeIn(300);
        $('.zuihou').css('top', '2750px')
    })
    $('.nav3 h3:first-child a').click(function() {
        $('.duotu').fadeOut(300);
        $('.pinglun').fadeIn(300);
        $('.zuihou').css('top', '2500px')
        $('.nav3 h3:first-child a').addClass('active5');
        $('.jinghua').removeClass('active5');
    })

    // /锚点/
    $('.maodian').click(function() {
        $(window).scrollTop(0);
    })
    window.onscroll = function() {
        var gundong = document.body.scrollTop || document.documentElement.scrollTop;
        console.log(gundong);
        if (gundong > 100) {
            $('.maodian').css('display', 'block')
        } else {
            $('.maodian').css('display', 'none')

        }
    }




    // 文字轮播
    var index2 = 0;
    $('.lunbo12-left').click(function() {
        index2++;
        if (index2 == 4) {
            index2 = 0;
            $('.lunbo12 ul').css('left', '0')
        }
        $('.lunbo12 ul').animate({
            left: -910 * index2
        }, 300)
        console.log(index2);
    })

    $('.lunbo12-right').click(function() {
        if (index2 == 0) {
            index2 = 4;
            $('.lunbo12 ul').css('left', '-2730px')
        }
        index2--;
        console.log(index2);

        $('.lunbo12 ul').animate({
            left: -910 * index2
        }, 500)
    })


    $('.wenzi-lunbo-dianji').mouseover(function() {
        $('.lunbo12-left').css('display', 'block');
        $('.lunbo12-right').css('display', 'block');
    }).mouseout(function() {
        $('.lunbo12-left').css('display', 'none');
        $('.lunbo12-right').css('display', 'none');
    })
})