/**
 * Created by Administrator on 2017/9/13.
 */
var time = new Date();
var hour = time.getHours();
var min = time.getMinutes();
console.log(hour);
if((hour>=21) || (hour<=8)){
    loadStyle('css/night.css');
}else{
    removejscssfile('css/night.css');
}
function loadStyle(url){
    var link=document.createElement('link');
    link.rel='stylesheet';
    link.type ='text/css';
    link.href=url;
    document.getElementsByTagName('head')[0].appendChild(link);
}
function removejscssfile(filename, filetype){
    var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none"
    var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none"
    var allsuspects=document.getElementsByTagName(targetelement)
    for (var i=allsuspects.length; i>=0; i--){
        if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
            allsuspects[i].parentNode.removeChild(allsuspects[i])
    }
}