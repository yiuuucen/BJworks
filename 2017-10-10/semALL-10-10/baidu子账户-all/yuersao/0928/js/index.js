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
        var huodongId = 1801;
        var g = window.localStorage.getItem("sligleG");
        if(!g){
            g = 0;
        }
        var laiyuan = "PC_BD子户育儿嫂";
        var data = "{\"chongzhika_huodong_id\":" + huodongId + ",\"shoujihao\":\"" + tel + "\",\"laiyuan\":\""+laiyuan+"\",\"guanggaozuid\":"+g+"}";
        console.log(data);
        var senddata = '{' + window.parameterPost + ',"data":\'' + data +
            '\',"dataType":"json","sign": "1","token": "login"}';
        ajaxData("POST", window.hostUrl + "appdatacustomer.svc/i_p_chongzhika_huodong", senddata, function (data) {
            if(data.status==1){
                //$(".map-layer").hide();
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

    //map 获取城市列表
    getCity();
    function getCity(){
        var url = window.hostUrl + "appdatacustomer.svc//i_g_huoquchengshi?" + parameter + "&data={}&sign=1&token=login";
        ajaxData("GET", url, null, function (data) {
            if(data.status==0){
                var cityList = data.dataResult.dataInfo;
                var html = '';
                var leftHtml = '';
                for(var i = 0;i<cityList.length;i++){
                    html += '<p data-id="'+cityList[i].ID+'" data-jingdu="'+cityList[i].JINGDU+'" data-weidu="'+cityList[i].WEIDU+'">'+cityList[i].CHENGSHI+'</p>';
                    leftHtml += '<div data-id="'+cityList[i].ID+'" data-jingdu="'+cityList[i].JINGDU+'" data-weidu="'+cityList[i].WEIDU+'" class="left-city-item" data-level="1" data-show=true>'+cityList[i].CHENGSHI+'</div>';
                }
                $("#city-list,#banner-city-list,#nanny-city-list,#night-city-list,#cost-city-list").append(html);
                //$(".left-window-body").append(leftHtml);
                //getShop(cityList[0].ID,cityList[0].JINGDU,cityList[0].WEIDU);

                //left-window
                /*$(".left-city-item").click(function(e){
                 e.target.oncontextmenu = function(){
                 return false;
                 };
                 var $item = $(e.target);
                 var level = $item.attr("data-level");
                 console.log($item);

                 //第一次点击城市，加载门店列表
                 if(!$item.attr('data-info') && level==1){
                 $(".left-city-item div,.left-city-item div p").hide();
                 $item.attr('data-info',true);
                 leftGetShop($item.attr('data-id'),$item.attr('data-jingdu'),$item.attr('data-weidu'),$item);
                 return;
                 }

                 //再次点击城市，已经加载门店列表，切换显示隐藏

                 if($item.attr('data-info') && level==1){
                 $(".left-city-item div").hide();
                 $item.children('div').show();
                 }
                 if(level==2){
                 $(".left-city-item div").removeClass('active').children('p').hide();
                 $item.addClass('active');
                 $item.children('p').show();
                 return;
                 }
                 if(level==3){

                 $("#leftTel").addClass('leftWindowTel');
                 setTimeout(function(){
                 $("#leftTel").removeClass('leftWindowTel');
                 },500);
                 }
                 })*/
            }
        },function () {
            console.log(data.message)
        },true)
    }
    //map 获取门店列表
    /*function getShop(id,jingdu,weidu,board){
     var url = window.hostUrl + "appdatacustomer.svc/i_g_fengongsiliebiao?" + parameter + "&data={\"chengshi\":" + id + ",\"jingdu\":\"" + jingdu + "\",\"weidu\":\""+weidu+"\"}&sign=1&token=login;";
     ajaxData("GET", url, null, function (data) {
     if(data.status==0){
     var storeList = data.dataResult.dataInfo;
     var html = '';
     for(var i=0;i<storeList.length;i++){
     html += '<p>'+storeList[i].MINGCHENG.replace('分公司','门店').replace('子公司','门店')+'</p>';
     }
     switch (board){
     case 'banner':{
     $("#banner-store-list").html('').append(html);
     $("#banner-store").children('strong').text('单击选择门店');
     break;
     }
     case 'map':{
     $("#store-list").html('').append(html);
     $("#store").children('strong').text('单击选择门店');
     break;
     }
     case 'nanny':{
     $("#nanny-store-list").html('').append(html);
     $("#nanny-store").children('strong').text('单击选择门店');
     break;
     }
     case 'night':{
     $("#night-store-list").html('').append(html);
     $("#night-store").children('strong').text('单击选择门店');
     break;
     }
     }

     //$("#store").children('strong').text(storeList[0].MINGCHENG.replace('分公司','门店').replace('子公司','门店'));

     }
     },function () {
     console.log(data.message)
     },true)
     }*/
    function getShop(id,jingdu,weidu,board){
        var url = window.hostUrl + "appdatacustomer.svc/i_g_huoqudiqu?" + parameter + "&data={\"id\":" + id + "}&sign=1&token=login;";
        ajaxData("GET", url, null, function (data) {
            if(data.status==0){
                var storeList = data.dataResult.dataInfo;
                var html = '';
                for(var i=0;i<storeList.length;i++){
                    html += '<p>'+storeList[i].DISPLAY+'</p>';
                }
                switch (board){
                    case 'banner':{
                        $("#banner-store-list").html('').append(html);
                        $("#banner-store").children('strong').text('点击选择区');
                        break;
                    }
                    case 'map':{
                        $("#store-list").html('').append(html);
                        $("#store").children('strong').text('点击选择区');
                        break;
                    }
                    case 'nanny':{
                        $("#nanny-store-list").html('').append(html);
                        $("#nanny-store").children('strong').text('点击选择区');
                        break;
                    }
                    case 'night':{
                        $("#night-store-list").html('').append(html);
                        $("#night-store").children('strong').text('点击选择区');
                        break;
                    }
                }

                //$("#store").children('strong').text(storeList[0].MINGCHENG.replace('分公司','门店').replace('子公司','门店'));

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
        if($(item).attr('data-id')){
            getShop($(item).attr('data-id'),$(item).attr('data-jingdu'),$(item).attr('data-weidu'),that.attr('data-board'));
        }
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
