/**
 * Created by Administrator on 2017/9/12.
 */

//map 获取城市列表
getCity();
function getCity(){
    var url = window.hostUrl + "appdatacustomer.svc//i_g_huoquchengshi?" + parameter + "&data={}&sign=1&token=login";
    ajaxData("GET", url, null, function (data) {
        if(data.status==0){
            var cityList = data.dataResult.dataInfo;
            var html = '';
            for(var i = 0;i<cityList.length;i++){
                html += '<p data-id="'+cityList[i].ID+'" data-jingdu="'+cityList[i].JINGDU+'" data-weidu="'+cityList[i].WEIDU+'">'+cityList[i].CHENGSHI+'</p>';
            }
            $("#night-city-list").append(html);
            //getShop(cityList[0].ID,cityList[0].JINGDU,cityList[0].WEIDU);
        }
    },function () {
        console.log(data.message)
    },true)
}
//map 获取门店列表
function getShop(id,jingdu,weidu,board){
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
}

$("#night-close").click(function(){
   $(".form-layer").hide();
});

$(".night-btn").click(function(){
    $(".form-layer").show();
});