var G=[{
    label:"Internet Explorer",
    data:12
},{
    label:"Mobile",
    data:27
},{
    label:"Safari",
    data:85
},{
    label:"Opera",
    data:64
},{
    label:"Firefox",
    data:90
},{
    label:"Chrome",
    data:112
}];
if($("#piechart").length){
   
     
    $.plot($("#piechart"),G,{
        series:{
            pie:{
                show:true
            }
        },
    grid:{
        hoverable:true,
        clickable:true
    },
    legend:{
        show:false
    },
    colors:["#FA5833","#2FABE9","#FABB3D","#78CD51"]
    });
function w(i,J,I){
    if(!I){
        return
    }
    percent=parseFloat(I.series.percent).toFixed(2);
    $("#hover").html('<span style="font-weight: bold; color: '+I.series.color+'">'+I.series.label+" ("+percent+"%)</span>")
    }
    $("#piechart").bind("plothover",w)
}