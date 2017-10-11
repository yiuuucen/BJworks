/**
 * Created by Administrator on 2017/9/6.
 */
$(function(){
    var $height = $(window).height()/2;

    $('.right-top').css("top",($height-135-104)+'px');
    $('.right-bottom').css("top",($height+135)+'px');
    $('.back-top').click(function(){
        $('body,html').animate({scrollTop:0},500);
    });

    //底部飘窗显示
    var $scrtop;
    var $footTop = $('.source').offset().top;
    var $rightTop = $('.good-grace').offset().top;
    $(window).scroll(function(){
        $scrtop = $(window).scrollTop();
        if($scrtop>=$footTop){
            $('.foot-window').show();
        }
        if($scrtop>=$rightTop){
            $('.right-window').show();
        }
    });

    var g = getQueryString("g");
    if(g){
        window.localStorage.sligleG = g;
        var origin = window.location.origin;
        var pathname = window.location.pathname;
        var newHref = origin+pathname;
        window.location.href = newHref;
    };

    NumUpUI($(".num1"), {
        prefix: "",
        duration:1500,
        decimal: 0,
    });
    //滑动
    var mySwiper2 = new Swiper('#swiper-container2',{
        loop:true,
        autoplay : 5000,
        autoplayDisableOnInteraction :false,
    });

    /*预约*/
    $("#order").click(function(){
        var tel = $("#tel").val();
        order(tel);
    });
    $("#right-order").click(function(){
        var tel = $("#right-tel").val();
        order(tel);
    });
    $("#head-order").click(function(){
        var tel = $("#head-order-tel").val();
        order(tel);
    });
    $("#banner-order").click(function(){
        var tel = $("#banner-order-tel").val();
        order(tel);
    });
    $("#map-order").click(function(){
        var tel = $("#map-order-tel").val();
        order(tel);
    });
    $("#nanny-layer-order").click(function(){
        var tel = $("#nanny-layer-tel").val();
        order(tel);
    });
    $("#night-layer-order").click(function(){
        var tel = $("#night-layer-tel").val();
        order(tel);
    });
    $("#cost-layer-order").click(function(){
        var tel = $("#cost-layer-tel").val();
        order(tel);
    });
    $("#bottom-order").click(function(){
        var tel = $("#bottom-tel").val();
        order(tel);
    });

    function order(tel){
        if (tel.Trim().length == 0) {
            showerror("请输入您的手机号","info");
            return false;
        }
        if (!(/^1[123456789][0-9]{9}$/).test(tel)) {
            showerror("请正确输入手机号","info");
            return false;
        }
        var huodongId = 1082;
        var g = window.localStorage.getItem("sligleG");
        if(!g){
            g = 0;
        }
        var laiyuan = "pc_BD子账户投上海0905";
        var data = "{\"chongzhika_huodong_id\":" + huodongId + ",\"shoujihao\":\"" + tel + "\",\"laiyuan\":\""+laiyuan+"\",\"guanggaozuid\":"+g+"}";
        console.log(data);
        var senddata = '{' + window.parameterPost + ',"data":\'' + data +
            '\',"dataType":"json","sign": "1","token": "login"}';
        ajaxData("POST", window.hostUrl + "appdatacustomer.svc/i_p_chongzhika_huodong", senddata, function (data) {
            if(data.status==1){
                showerror("您已成功预约，请等候客服来电","success");
            }else{
                showerror(data.message,"error");
            }
        }, function () {
            console.log("操作失败");
        });
    }

    //map 弹框
    $(".map").click(function(e){
        $(".map-layer").addClass('trans');
        setTimeout(function(){
            $(".map-layer").removeClass('trans');
        },600);
    });

    $(".map-layer-close").click(function(){
        $(".nanny-layer").hide();
    });

    $("#nanny-btn").click(function(){
        $(".nanny-layer").show();
    });
    //{ID: 921, ORDER_NUM: 10, CHENGSHI: "北京", JINGDU: 116.416646, WEIDU: 39.965123, …}
    //{ID: 2901, ORDER_NUM: 12, CHENGSHI: "上海", JINGDU: 121.447172, WEIDU: 31.202902, …}
    //{ID: 6301, ORDER_NUM: 70, CHENGSHI: "广州", JINGDU: 113.31893, WEIDU: 23.15769, …}
    //{ID: 4481, ORDER_NUM: 40, CHENGSHI: "深圳", JINGDU: 114.073745, WEIDU: 22.581111, …}
    var bjId=2901;
    getShop(bjId)
    function getShop(id){
        var url = window.hostUrl + "appdatacustomer.svc/i_g_huoqudiqu?" + parameter + "&data={\"id\":" + id + "}&sign=1&token=login;";
        ajaxData("GET", url, null, function (data) {
            if(data.status==0){
                console.log(data)
                var storeList = data.dataResult.dataInfo;
                var html = '';
                for(var i=0;i<storeList.length;i++){
                    html += '<p>'+storeList[i].DISPLAY+'</p>';
                }
                        $("#banner-store-list,#store-list,#nanny-store-list,#night-store-list").html('').append(html);
                        $("#banner-store,#store,#nanny-store,#night-store").children('strong').text('点击选择区域');
                }
        },function () {
            console.log(data.message)
        },true)
    }

    function leftGetShop(id,jingdu,weidu,that){
        var url = window.hostUrl + "appdatacustomer.svc/i_g_fengongsiliebiao?" + parameter + "&data={\"chengshi\":" + id + ",\"jingdu\":\"" + jingdu + "\",\"weidu\":\""+weidu+"\"}&sign=1&token=login;";
        ajaxData("GET", url, null, function (data) {
            if(data.status==0){
                var storeList = data.dataResult.dataInfo;
                var html = '';
                for(var i=0;i<storeList.length;i++){
                    html += '<div data-address="'+storeList[i].SUOXIEDIZHI+'" data-level="2" class="show">'+storeList[i].MINGCHENG+'<p data-level="3">'+storeList[i].SUOXIEDIZHI+'</p></div>';
                }
                that.append(html);
            }
        },function () {
            console.log(data.message)
        },true)
    }

    //选择城市
    $(".map-click").click(function(){
        $(".city-list").hide();
        var dis = $(this).next().attr('data-show');
        if(dis=='block'){
            $(this).next().hide().attr('data-show','none');
            return;
        }
        $(this).next().show().attr('data-show','block');
    });
    $(".city-list").click(function(e){
        var item = e.target;
        var that = $(this);
        that.prev().children('strong').text(item.innerHTML);
        that.hide().attr('data-show','none');
    });

    //立即预约
    $("#map-layer-order").click(function(){
        var tel = $("#map-layer-tel").val();
        order(tel);
    });


    /*night*/
    $("#night-close").click(function(){
        $(".form-layer").hide();
    });

    $(".night-btn").click(function(){
        $(".form-layer").show();
    });

    /*仅剩名额*/
    var numnum=$("#left-num").html();
    clearInterval(timer1);
    var timer1=setInterval(function(){
        numnum--;
        $("#left-num").html(numnum);
        if(numnum==2){
            clearInterval(timer1);
        }
    },15000);
});

