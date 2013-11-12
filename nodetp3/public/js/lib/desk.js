function hexToRgb(b){
    var a=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(b);
    return a?{
        r:parseInt(a[1],16),
        g:parseInt(a[2],16),
        b:parseInt(a[3],16)
        }:null
    }
    function rgbToRgba(a,b){
    if(jQuery.browser.version<=8){
        a=hexToRgb(a);
        rgba="rgba("+a.r+","+a.g+","+a.b+","+b+")"
        }else{
        a=a.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        rgba="rgba("+a[1]+","+a[2]+","+a[3]+","+b+")"
        }
        return rgba
    }
    function charts(){
    if($(".sparkLineStats").length){
        n=function(){
            return(Math.floor(Math.random()*(1+40-20)))+20
            };
            
        var q=["#2FABE9","#FA5833","#b9e672","#bbdce3","#9a3b1b","#5a8022","#2c7282"];
        A=1;
        for(A=1;A<9;A++){
            var G=[[1,3+n()],[2,5+n()],[3,8+n()],[4,11+n()],[5,14+n()],[6,17+n()],[7,20+n()],[8,15+n()],[9,18+n()],[10,22+n()]];
            placeholder=".sparkLineStats"+A;
            if(retina()){
                $(placeholder).sparkline(G,{
                    width:200,
                    height:60,
                    lineColor:"#2FABE9",
                    fillColor:"#f2f7f9",
                    spotColor:"#467e8c",
                    maxSpotColor:"#b9e672",
                    minSpotColor:"#FA5833",
                    spotRadius:2,
                    lineWidth:1
                });
                $(placeholder).css("zoom",0.5)
                }else{
                $(placeholder).sparkline(G,{
                    width:100,
                    height:30,
                    lineColor:"#2FABE9",
                    fillColor:"#f2f7f9",
                    spotColor:"#467e8c",
                    maxSpotColor:"#b9e672",
                    minSpotColor:"#FA5833",
                    spotRadius:2,
                    lineWidth:1
                })
                }
            }
        }
    if($(".verticalChart")){
    $(".singleBar").each(function(){
        var i=$(this).find(".value span").html();
        $(this).find(".value").animate({
            height:i
        },2000,function(){
            $(this).find("span").fadeIn()
            })
        })
    }
    if($(".main-chart")){
    $(".bar").each(function(){
        var i=$(this).find(".value").html();
        $(this).find(".value").html("");
        $(this).find(".value").animate({
            height:i
        },2000)
        })
    }
    if($(".bar-stat").length){
    if(retina()){
        $(".bar-stat > .chart").each(function(){
            var i=$(this).css("color");
            $(this).sparkline("html",{
                type:"bar",
                height:"80",
                barWidth:"10",
                barSpacing:"4",
                barColor:i,
                negBarColor:"#eeeeee"
            });
            $(this).css("zoom",0.5)
            })
        }else{
        $(".bar-stat > .chart").each(function(){
            var i=$(this).css("color");
            $(this).sparkline("html",{
                type:"bar",
                height:"40",
                barWidth:"5",
                barSpacing:"2",
                barColor:i,
                negBarColor:"#eeeeee"
            })
            })
        }
    }
if($(".chart-stat").length){
    if(retina()){
        $(".chart-stat > .chart").each(function(){
            var i=$(this).css("color");
            $(this).sparkline("html",{
                width:"180%",
                height:80,
                lineColor:i,
                fillColor:false,
                spotColor:false,
                maxSpotColor:false,
                minSpotColor:false,
                spotRadius:2,
                lineWidth:2
            });
            $(this).css("zoom",0.5)
            })
        }else{
        $(".chart-stat > .chart").each(function(){
            var i=$(this).css("color");
            $(this).sparkline("html",{
                width:"90%",
                height:40,
                lineColor:i,
                fillColor:false,
                spotColor:false,
                maxSpotColor:false,
                minSpotColor:false,
                spotRadius:2,
                lineWidth:2
            })
            })
        }
    }
if($(".chart-type1").length){
    $(".chart-type1").each(function(){
        var i=[[0,5],[5,6],[11,9],[17,8],[21,6],[27,8],[31,4]];
        var M=[[0,1],[1,2],[2,3],[3,4],[4,5],[5,4],[6,3],[7,3],[8,4],[9,5],[10,5],[11,6],[12,6],[13,5],[14,5],[15,4],[16,6],[17,5],[18,4],[19,3],[20,2],[21,1],[22,2],[23,2],[24,3],[25,4],[26,5],[27,6],[28,5],[29,4],[30,3],[31,2]];
        var I=$(this).parent().parent().css("color");
        var K=$.plot($(".chart-type1"),[{
            data:i,
            label:"Visits",
            lines:{
                show:true,
                fill:true,
                fillColor:rgbToRgba(I,0.25),
                lineWidth:3
            },
            points:{
                show:true,
                lineWidth:3,
                fill:true
            },
            shadowSize:0
        },{
            data:M,
            bars:{
                show:true,
                fill:false,
                barWidth:0.1,
                align:"center",
                lineWidth:8
            }
        }],{
            grid:{
                hoverable:true,
                clickable:true,
                tickColor:"#eee",
                borderWidth:0
            },
            legend:{
                show:false
            },
            colors:[I,rgbToRgba(I,0.25)],
            xaxis:{
                ticks:5,
                tickDecimals:0
            },
            yaxis:{
                ticks:5,
                tickDecimals:0
            }
        });
    function L(N,P,O){
        $('<div id="tooltip">'+O+"</div>").css({
            position:"absolute",
            display:"none",
            top:P+5,
            left:N+5,
            border:"1px solid #fdd",
            padding:"2px",
            "background-color":"#dfeffc",
            opacity:0.8
        }).appendTo("body").fadeIn(200)
        }
        var J=null;
    $(this).bind("plothover",function(P,R,O){
        $("#x").text(R.x.toFixed(2));
        $("#y").text(R.y.toFixed(2));
        if(O){
            if(J!=O.dataIndex){
                J=O.dataIndex;
                $("#tooltip").remove();
                var N=O.datapoint[0].toFixed(2),Q=O.datapoint[1].toFixed(2);
                L(O.pageX,O.pageY,O.series.label+" of "+N+" = "+Q)
                }
            }else{
        $("#tooltip").remove();
        J=null
        }
    })
})
}
function n(){
    return((Math.floor(Math.random()*(1+40-20)))+20)*1200
    }
    if($(".multi-stat-box-chart").length){
    $(".multi-stat-box-chart").each(function(){
        var O=[[1111,5+n()],[1112,10+n()],[1113,15+n()],[1114,20+n()],[1115,25+n()],[1116,30+n()],[1117,25+n()]];
        var L=[[K(2013,1,7),5+n()],[K(2013,1,8),10+n()],[K(2013,1,9),15+n()],[K(2013,1,10),20+n()],[K(2013,1,11),25+n()],[K(2013,1,12),30+n()],[K(2013,1,13),25+n()]];
        var I=$(this).parent().parent().css("color");
        var i=["SUN","MON","TUE","WED","THR","FRI","SAT"];
        function K(Q,R,P){
            return new Date(Q,R-1,P).getTime()
            }
            var M=$.plot($(".multi-stat-box-chart"),[{
            data:L
        }],{
            series:{
                lines:{
                    show:true,
                    lineWidth:3,
                    fill:false
                },
                points:{
                    show:true,
                    lineWidth:3,
                    fill:true,
                    fillColor:"#fff"
                },
                shadowSize:0
            },
            grid:{
                hoverable:true,
                clickable:true,
                tickColor:"#fff",
                borderColor:false
            },
            colors:["#c7cbd5"],
            xaxis:{
                mode:"time",
                tickFormatter:function(Q,P){
                    return i[new Date(Q).getDay()]
                    },
                color:"#c7cbd5",
                autoscaleMargin:1e-18
            },
            yaxis:{
                ticks:4,
                tickDecimals:0,
                color:"#fff"
            }
        });
    function N(P,R,Q){
        $('<div id="tooltip">'+Q+"</div>").css({
            position:"absolute",
            display:"none",
            top:R+5,
            left:P+5,
            border:"1px solid #fdd",
            padding:"2px",
            "background-color":"#dfeffc",
            opacity:0.8
        }).appendTo("body").fadeIn(200)
        }
        var J=null;
    $(".multi-stat-box-chart").bind("plothover",function(R,T,Q){
        $("#x").text(T.x.toFixed(2));
        $("#y").text(T.y.toFixed(2));
        if(Q){
            if(J!=Q.dataIndex){
                J=Q.dataIndex;
                $("#tooltip").remove();
                var P=Q.datapoint[0].toFixed(2),S=Q.datapoint[1].toFixed(2);
                N(Q.pageX,Q.pageY,Q.series.label+" of "+P+" = "+S)
                }
            }else{
        $("#tooltip").remove();
        J=null
        }
    })
})
}
function n(){
    return((Math.floor(Math.random()*(1+40-20)))+20)*1200
    }
    if($(".chart-type2").length){
    $(".chart-type2").each(function(){
        var I=[[1,5+n()],[2,10+n()],[3,15+n()],[4,20+n()],[5,25+n()],[6,30+n()],[7,35+n()],[8,40+n()],[9,45+n()],[10,50+n()],[11,55+n()],[12,60+n()]];
        var i=$(this).parent().parent().css("color");
        var K=$.plot($(".chart-type2"),[{
            data:I
        }],{
            series:{
                lines:{
                    show:true,
                    lineWidth:3,
                    fill:false
                },
                points:{
                    show:true,
                    lineWidth:3,
                    fill:true,
                    fillColor:i
                },
                shadowSize:0
            },
            grid:{
                hoverable:true,
                clickable:true,
                tickColor:"rgba(255,255,255,.15)",
                borderColor:"rgba(255,255,255,0)"
            },
            colors:["#fff"],
            xaxis:{
                ticks:6,
                tickDecimals:0,
                tickColor:i,
                color:"#fff"
            },
            yaxis:{
                ticks:4,
                tickDecimals:0,
                color:"#fff",
                autoscaleMargin:0.000001
            }
        });
    function L(M,O,N){
        $('<div id="tooltip">'+N+"</div>").css({
            position:"absolute",
            display:"none",
            top:O+5,
            left:M+5,
            border:"1px solid #fdd",
            padding:"2px",
            "background-color":"#dfeffc",
            opacity:0.8
        }).appendTo("body").fadeIn(200)
        }
        var J=null;
    $(".chart-type2").bind("plothover",function(O,Q,N){
        $("#x").text(Q.x.toFixed(2));
        $("#y").text(Q.y.toFixed(2));
        if(N){
            if(J!=N.dataIndex){
                J=N.dataIndex;
                $("#tooltip").remove();
                var M=N.datapoint[0].toFixed(2),P=N.datapoint[1].toFixed(2);
                L(N.pageX,N.pageY,N.series.label+" of "+M+" = "+P)
                }
            }else{
        $("#tooltip").remove();
        J=null
        }
    })
})
}
function n(){
    return((Math.floor(Math.random()*(1+40-20)))+20)*1200
    }
    function y(){
    return((Math.floor(Math.random()*(1+40-20)))+20)*500
    }
    function x(){
    return((Math.floor(Math.random()*(1+40-20)))+20)*300
    }
    function v(){
    return((Math.floor(Math.random()*(1+40-20)))+20)*100
    }
    if($("#stats-chart2").length){
    var k=[[1,5+x()],[2,10+x()],[3,15+x()],[4,20+x()],[5,25+x()],[6,30+x()],[7,35+x()],[8,40+x()],[9,45+x()],[10,50+x()],[11,55+x()],[12,60+x()],[13,65+x()],[14,70+x()],[15,75+x()],[16,80+x()],[17,85+x()],[18,90+x()],[19,85+x()],[20,80+x()],[21,75+x()],[22,80+x()],[23,75+x()],[24,70+x()],[25,65+x()],[26,75+x()],[27,80+x()],[28,85+x()],[29,90+x()],[30,95+x()]];
    var j=[[1,5+x()],[2,10+x()],[3,15+x()],[4,20+x()],[5,25+x()],[6,30+x()],[7,35+x()],[8,40+x()],[9,45+x()],[10,50+x()],[11,55+x()],[12,60+x()],[13,65+x()],[14,70+x()],[15,75+x()],[16,80+x()],[17,85+x()],[18,90+x()],[19,85+x()],[20,80+x()],[21,75+x()],[22,80+x()],[23,75+x()],[24,70+x()],[25,65+x()],[26,75+x()],[27,80+x()],[28,85+x()],[29,90+x()],[30,95+x()]];
    var z=$.plot($("#stats-chart2"),[{
        data:k,
        label:"Tickets"
    },{
        data:j,
        label:"Solved Tickets"
    }],{
        series:{
            lines:{
                show:true,
                lineWidth:1,
                fill:true,
                fillColor:{
                    colors:[{
                        opacity:0.1
                    },{
                        opacity:0.1
                    }]
                    }
                },
        points:{
            show:false,
            lineWidth:1
        },
        shadowSize:0
    },
    grid:{
        hoverable:true,
        clickable:true,
        borderWidth:0
    },
    legend:{
        show:false
    },
    colors:["#bdea74","#2FABE9"],
    xaxis:{
        ticks:10,
        tickDecimals:0,
        tickColor:"#fff"
    },
    yaxis:{
        ticks:5,
        tickDecimals:0,
        tickColor:"#c7cbd5"
    }
    });
function g(i,J,I){
    $('<div id="tooltip">'+I+"</div>").css({
        position:"absolute",
        display:"none",
        top:J+5,
        left:i+5,
        border:"1px solid #fdd",
        padding:"2px",
        "background-color":"#dfeffc",
        opacity:0.8
    }).appendTo("body").fadeIn(200)
    }
    var u=null;
$("#stats-chart2").bind("plothover",function(J,L,I){
    $("#x").text(L.x.toFixed(2));
    $("#y").text(L.y.toFixed(2));
    if(I){
        if(u!=I.dataIndex){
            u=I.dataIndex;
            $("#tooltip").remove();
            var i=I.datapoint[0].toFixed(2),K=I.datapoint[1].toFixed(2);
            g(I.pageX,I.pageY,I.series.label+" of "+i+" = "+K)
            }
        }else{
    $("#tooltip").remove();
    u=null
    }
})
}
function n(){
    return((Math.floor(Math.random()*(1+40-20)))+20)
    }
    if($("#facebookChart").length){
    var o=[[1,5+n()],[2,10+n()],[3,15+n()],[4,20+n()],[5,25+n()],[6,30+n()],[7,35+n()],[8,40+n()],[9,45+n()],[10,50+n()],[11,55+n()],[12,60+n()],[13,65+n()],[14,70+n()],[15,75+n()],[16,80+n()],[17,85+n()],[18,90+n()],[19,85+n()],[20,80+n()],[21,75+n()],[22,80+n()],[23,75+n()],[24,70+n()],[25,65+n()],[26,75+n()],[27,80+n()],[28,85+n()],[29,90+n()],[30,95+n()]];
    var z=$.plot($("#facebookChart"),[{
        data:o,
        label:"Fans"
    }],{
        series:{
            lines:{
                show:true,
                lineWidth:2,
                fill:true,
                fillColor:{
                    colors:[{
                        opacity:0.5
                    },{
                        opacity:0.2
                    }]
                    }
                },
        points:{
            show:true,
            lineWidth:2
        },
        shadowSize:0
    },
    grid:{
        hoverable:true,
        clickable:true,
        tickColor:"#f9f9f9",
        borderWidth:0
    },
    colors:["#3B5998"],
    xaxis:{
        ticks:6,
        tickDecimals:0
    },
    yaxis:{
        ticks:3,
        tickDecimals:0
    }
    });
function g(i,J,I){
    $('<div id="tooltip">'+I+"</div>").css({
        position:"absolute",
        display:"none",
        top:J+5,
        left:i+5,
        border:"1px solid #fdd",
        padding:"2px",
        "background-color":"#dfeffc",
        opacity:0.8
    }).appendTo("body").fadeIn(200)
    }
    var u=null;
$("#facebookChart").bind("plothover",function(J,L,I){
    $("#x").text(L.x.toFixed(2));
    $("#y").text(L.y.toFixed(2));
    if(I){
        if(u!=I.dataIndex){
            u=I.dataIndex;
            $("#tooltip").remove();
            var i=I.datapoint[0].toFixed(2),K=I.datapoint[1].toFixed(2);
            g(I.pageX,I.pageY,I.series.label+" of "+i+" = "+K)
            }
        }else{
    $("#tooltip").remove();
    u=null
    }
})
}
function p(){
    return((Math.floor(Math.random()*(1+40-20)))+20)
    }
    if($("#twitterChart").length){
    var h=[[1,5+p()],[2,10+p()],[3,15+p()],[4,20+p()],[5,25+p()],[6,30+p()],[7,35+p()],[8,40+p()],[9,45+p()],[10,50+p()],[11,55+p()],[12,60+p()],[13,65+p()],[14,70+p()],[15,75+p()],[16,80+p()],[17,85+p()],[18,90+p()],[19,85+p()],[20,80+p()],[21,75+p()],[22,80+p()],[23,75+p()],[24,70+p()],[25,65+p()],[26,75+p()],[27,80+p()],[28,85+p()],[29,90+p()],[30,95+p()]];
    var z=$.plot($("#twitterChart"),[{
        data:h,
        label:"Followers"
    }],{
        series:{
            lines:{
                show:true,
                lineWidth:2,
                fill:true,
                fillColor:{
                    colors:[{
                        opacity:0.5
                    },{
                        opacity:0.2
                    }]
                    }
                },
        points:{
            show:true,
            lineWidth:2
        },
        shadowSize:0
    },
    grid:{
        hoverable:true,
        clickable:true,
        tickColor:"#f9f9f9",
        borderWidth:0
    },
    colors:["#1BB2E9"],
    xaxis:{
        ticks:6,
        tickDecimals:0
    },
    yaxis:{
        ticks:3,
        tickDecimals:0
    }
    });
function g(i,J,I){
    $('<div id="tooltip">'+I+"</div>").css({
        position:"absolute",
        display:"none",
        top:J+5,
        left:i+5,
        border:"1px solid #fdd",
        padding:"2px",
        "background-color":"#dfeffc",
        opacity:0.8
    }).appendTo("body").fadeIn(200)
    }
    var u=null;
$("#twitterChart").bind("plothover",function(J,L,I){
    $("#x").text(L.x.toFixed(2));
    $("#y").text(L.y.toFixed(2));
    if(I){
        if(u!=I.dataIndex){
            u=I.dataIndex;
            $("#tooltip").remove();
            var i=I.datapoint[0].toFixed(2),K=I.datapoint[1].toFixed(2);
            g(I.pageX,I.pageY,I.series.label+" of "+i+" = "+K)
            }
        }else{
    $("#tooltip").remove();
    u=null
    }
})
}
if($("#activeUsers").length){
    var H=[];
    for(var A=0;A<=160;A+=1){
        H.push([A,parseInt(Math.random()*123123)])
        }
        var l=0,s=true,b=false,B=false;
    function C(){
        $.plot($("#activeUsers"),[H],{
            series:{
                bars:{
                    show:s,
                    fill:true,
                    barWidth:0.1,
                    align:"center",
                    lineWidth:5,
                    fillColor:{
                        colors:[{
                            opacity:1
                        },{
                            opacity:0.5
                        }]
                        }
                    }
            },
        grid:{
            hoverable:true,
            clickable:true,
            tickColor:"#f6f6f6",
            borderWidth:0
        },
        colors:["#CBE968"],
        xaxis:{
            ticks:0,
            tickDecimals:0,
            tickFormatter:function(I,i){
                return I
                }
            },
    yaxis:{
        ticks:5,
        tickDecimals:0,
        tickFormatter:function(i){
            return i
            }
        }
})
}
C()
}
if($("#stats-chart").length){
    var r=[[1,n()-10],[2,n()-10],[3,n()-10],[4,n()],[5,n()],[6,4+n()],[7,5+n()],[8,6+n()],[9,6+n()],[10,8+n()],[11,9+n()],[12,10+n()],[13,11+n()],[14,12+n()],[15,13+n()],[16,14+n()],[17,15+n()],[18,15+n()],[19,16+n()],[20,17+n()],[21,18+n()],[22,19+n()],[23,20+n()],[24,21+n()],[25,14+n()],[26,24+n()],[27,25+n()],[28,26+n()],[29,27+n()],[30,31+n()]];
    var z=$.plot($("#stats-chart"),[{
        data:r,
        label:"visitors"
    }],{
        series:{
            lines:{
                show:true,
                lineWidth:3,
                fill:true,
                fillColor:{
                    colors:[{
                        opacity:0.5
                    },{
                        opacity:0.2
                    }]
                    }
                },
        points:{
            show:true
        },
        shadowSize:2
    },
    grid:{
        hoverable:true,
        clickable:true,
        tickColor:"#eee",
        borderWidth:0
    },
    colors:["#b1d3d4"],
    xaxis:{
        ticks:11,
        tickDecimals:0
    },
    yaxis:{
        ticks:11,
        tickDecimals:0
    }
    });
function g(i,J,I){
    $('<div id="tooltip">'+I+"</div>").css({
        position:"absolute",
        display:"none",
        top:J+5,
        left:i+5,
        border:"1px solid #fdd",
        padding:"2px",
        "background-color":"#dfeffc",
        opacity:0.8
    }).appendTo("body").fadeIn(200)
    }
    var u=null;
$("#stats-chart").bind("plothover",function(J,L,I){
    $("#x").text(L.x.toFixed(2));
    $("#y").text(L.y.toFixed(2));
    if(I){
        if(u!=I.dataIndex){
            u=I.dataIndex;
            $("#tooltip").remove();
            var i=I.datapoint[0].toFixed(2),K=I.datapoint[1].toFixed(2);
            g(I.pageX,I.pageY,I.series.label+" of "+i+" = "+K)
            }
        }else{
    $("#tooltip").remove();
    u=null
    }
});
$("#sincos").bind("plotclick",function(I,J,i){
    if(i){
        $("#clickdata").text("You clicked point "+i.dataIndex+" in "+i.series.label+".");
        z.highlight(i.series,i.datapoint)
        }
    })
}
if($("#sincos").length){
    var a=[],d=[];
    for(var A=0;A<14;A+=0.5){
        a.push([A,Math.sin(A)/A]);
        d.push([A,Math.cos(A)])
        }
        var z=$.plot($("#sincos"),[{
        data:a,
        label:"sin(x)/x"
    },{
        data:d,
        label:"cos(x)"
    }],{
        series:{
            lines:{
                show:true,
                lineWidth:2
            },
            points:{
                show:true
            },
            shadowSize:2
        },
        grid:{
            hoverable:true,
            clickable:true,
            tickColor:"#dddddd",
            borderWidth:0
        },
        yaxis:{
            min:-1.2,
            max:1.2
        },
        colors:["#FA5833","#2FABE9"]
        });
    function g(i,J,I){
        $('<div id="tooltip">'+I+"</div>").css({
            position:"absolute",
            display:"none",
            top:J+5,
            left:i+5,
            border:"1px solid #fdd",
            padding:"2px",
            "background-color":"#dfeffc",
            opacity:0.8
        }).appendTo("body").fadeIn(200)
        }
        var u=null;
    $("#sincos").bind("plothover",function(J,L,I){
        $("#x").text(L.x.toFixed(2));
        $("#y").text(L.y.toFixed(2));
        if(I){
            if(u!=I.dataIndex){
                u=I.dataIndex;
                $("#tooltip").remove();
                var i=I.datapoint[0].toFixed(2),K=I.datapoint[1].toFixed(2);
                g(I.pageX,I.pageY,I.series.label+" of "+i+" = "+K)
                }
            }else{
        $("#tooltip").remove();
        u=null
        }
    });
$("#sincos").bind("plotclick",function(I,J,i){
    if(i){
        $("#clickdata").text("You clicked point "+i.dataIndex+" in "+i.series.label+".");
        z.highlight(i.series,i.datapoint)
        }
    })
}
if($("#flotchart").length){
    var H=[];
    for(var A=0;A<Math.PI*2;A+=0.25){
        H.push([A,Math.sin(A)])
        }
        var F=[];
    for(var A=0;A<Math.PI*2;A+=0.25){
        F.push([A,Math.cos(A)])
        }
        var D=[];
    for(var A=0;A<Math.PI*2;A+=0.1){
        D.push([A,Math.tan(A)])
        }
        $.plot($("#flotchart"),[{
        label:"sin(x)",
        data:H
    },{
        label:"cos(x)",
        data:F
    },{
        label:"tan(x)",
        data:D
    }],{
        series:{
            lines:{
                show:true
            },
            points:{
                show:true
            }
        },
    xaxis:{
        ticks:[0,[Math.PI/2,"\u03c0/2"],[Math.PI,"\u03c0"],[Math.PI*3/2,"3\u03c0/2"],[Math.PI*2,"2\u03c0"]]
        },
    yaxis:{
        ticks:10,
        min:-2,
        max:2
    },
    grid:{
        tickColor:"#dddddd",
        borderWidth:0
    },
    colors:["#FA5833","#2FABE9","#FABB3D"]
    })
}
if($("#stackchart").length){
    var H=[];
    for(var A=0;A<=10;A+=1){
        H.push([A,parseInt(Math.random()*30)])
        }
        var F=[];
    for(var A=0;A<=10;A+=1){
        F.push([A,parseInt(Math.random()*30)])
        }
        var D=[];
    for(var A=0;A<=10;A+=1){
        D.push([A,parseInt(Math.random()*30)])
        }
        var l=0,s=true,b=false,B=false;
    function e(){
        $.plot($("#stackchart"),[H,F,D],{
            series:{
                stack:l,
                lines:{
                    show:b,
                    fill:true,
                    steps:B
                },
                bars:{
                    show:s,
                    barWidth:0.6
                }
            },
        colors:["#FA5833","#2FABE9","#FABB3D"]
        })
    }
    e();
$(".stackControls input").click(function(i){
    i.preventDefault();
    l=$(this).val()=="With stacking"?true:null;
    e()
    });
$(".graphControls input").click(function(i){
    i.preventDefault();
    s=$(this).val().indexOf("Bars")!=-1;
    b=$(this).val().indexOf("Lines")!=-1;
    B=$(this).val().indexOf("steps")!=-1;
    e()
    })
}
var G=[{
    label:"Desktop",
    data:73
},{
    label:"Mobile",
    data:27
}];
if($("#deviceChart").length){
    $.plot($("#deviceChart"),G,{
        series:{
            pie:{
                innerRadius:0.6,
                show:true
            }
        },
    legend:{
        show:true
    },
    colors:["#FA5833","#2FABE9","#FABB3D","#78CD51"]
    })
}
var G=[{
    label:"iOS",
    data:20
},{
    label:"Android",
    data:7
},{
    label:"Linux",
    data:11
},{
    label:"Mac OSX",
    data:14
},{
    label:"Windows",
    data:48
}];
if($("#osChart").length){
    $.plot($("#osChart"),G,{
        series:{
            pie:{
                innerRadius:0.6,
                show:true
            }
        },
    legend:{
        show:true
    },
    colors:["#FA5833","#2FABE9","#FABB3D","#78CD51"]
    })
}
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
if($("#donutchart").length){
    $.plot($("#donutchart"),G,{
        series:{
            pie:{
                innerRadius:0.5,
                show:true
            }
        },
    legend:{
        show:false
    },
    colors:["#FA5833","#2FABE9","#FABB3D","#78CD51"]
    })
}
var G=[],c=300;
function t(){
    if(G.length>0){
        G=G.slice(1)
        }while(G.length<c){
        var K=G.length>0?G[G.length-1]:50;
        var L=K+Math.random()*10-5;
        if(L<0){
            L=0
            }
            if(L>100){
            L=100
            }
            G.push(L)
        }
        var J=[];
    for(var I=0;I<G.length;++I){
        J.push([I,G[I]])
        }
        return J
    }
    var E=30;
$("#updateInterval").val(E).change(function(){
    var i=$(this).val();
    if(i&&!isNaN(+i)){
        E=+i;
        if(E<1){
            E=1
            }
            if(E>2000){
            E=2000
            }
            $(this).val(""+E)
        }
    });
if($("#serverLoad").length){
    var f={
        series:{
            shadowSize:1
        },
        lines:{
            show:true,
            lineWidth:3,
            fill:true,
            fillColor:{
                colors:[{
                    opacity:0.9
                },{
                    opacity:0.9
                }]
                }
            },
    yaxis:{
        min:0,
        max:100,
        tickFormatter:function(i){
            return i+"%"
            }
        },
xaxis:{
    show:false
},
colors:["#FA5833"],
grid:{
    tickColor:"#f9f9f9",
    borderWidth:0
}
};

var z=$.plot($("#serverLoad"),[t()],f);
function m(){
    z.setData([t()]);
    z.draw();
    setTimeout(m,E)
    }
    m()
}
if($("#realtimechart").length){
    var f={
        series:{
            shadowSize:1
        },
        lines:{
            fill:true,
            fillColor:{
                colors:[{
                    opacity:1
                },{
                    opacity:0.1
                }]
                }
            },
    yaxis:{
        min:0,
        max:100
    },
    xaxis:{
        show:false
    },
    colors:["#F4A506"],
    grid:{
        tickColor:"#dddddd",
        borderWidth:0
    }
};

var z=$.plot($("#realtimechart"),[t()],f);
function m(){
    z.setData([t()]);
    z.draw();
    setTimeout(m,E)
    }
    m()
}
};