//var getContent = function(data)
var keys = []
var addCols = function (data){
    key = Object.keys(data);
    keys = key;
    for (var i=0;i<key.length;i++) {
        var index = key[i];
        var group = data[index];
        var block_id = key[i] + "_Panel";
        /*if(!$(block_id).length){
            $(block_id) = $()
        }*/
        var myCol = $('<div class="list_box"></div>');
        console.log(group);
        //$(block_id).find
        var info = $("<div class='card-body card_content'></div>")
        var skeys = Object.keys(group.Student)
        skeys.forEach((k)=>{
            if( group.Student[k] != "")
                info.append($("<div id='Students' class='bachelor'></div>")
                    .text(k +": "+ group.Student[k]))
        })
        var myPanel = $("<div class='card-block'></div>").attr("id", block_id)
            .append($("<div class='card-header card_title'>")
                .append($("<span id='Professor'></span>").text(group["Teacher"])
                .append(info))
            )
        //var myPanel = $('<div class="card-block" id="'+block_id+'"><div class="card-header card_title"><span id="Professor">'+group["Teacher"]+'</span></div><div class="card-body card_content"><div id="Students" class="bachelor">'+group["Student"]["a"]+' </div><div id="Masters" class="master">'+group["Student"]["b"]+' </div></div></div>');
        myPanel.appendTo(myCol);
        myCol.appendTo('#panels');
    }
}

var delete_card = function(index){
    var obj_name = '#' + index + '_Panel';
    //$(obj_name).addClass("card_hide");
    $(obj_name).animate({height: 0, opacity:0});
    //$(obj_name).fadeOut(2000);
    console.log("Hide " + obj_name);
}
var show_card = function(index){
    var obj_name = '#' + index + '_Panel';
    //$(obj_name).addClass("card_hide");
    $(obj_name).css({height:'auto', opacity:1, display:'block'})
    //$(obj_name).fadeIn(2000);
    console.log("Show " + obj_name);
}
var last_one;
var high_light;
var card_update = function(){
    $.ajax({
        method: "get",
        url: "./update",
        success: function(data){
            high_light = '#' + last_one + '_Panel';
            $(high_light).removeClass("now_playing");
            del = keys.filter(k=>!data.includes(k));
            if(del.length>0){
                del.forEach(d=>delete_card(d));
                console.log("Del= ");
                console.log(del);
            }
            show = data.filter(k=>!keys.includes(k))
            if(show.length>0){
                show.forEach(s=>show_card(s));
                console.log("Show= ");
                console.log(show);

            }
            keys = data;
            last_one = data[0];
            high_light = '#' + last_one + '_Panel';
            $(high_light).addClass("now_playing");
        }
    })
}

$( document ).ready(function() {
    $.ajax({
        method: "get",
        url: "./initial",
        success: function(data){
            addCols(data);
        }
    })
    setInterval(card_update, 1000);
});
