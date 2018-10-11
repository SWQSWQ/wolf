window.onload=function(){
    //游戏规则
    $(".rules").click(function () {
       $(".rule").fadeIn(1000);
    });

    $(".close").click(function () {
        $(".rule").fadeOut(1000);
    });

    //开始游戏按钮点击
    $(".start").click(function () {
        $(this).css({display:"none"});
        progressHandle();
        WolfAnimate();
    });

    //重新开始按钮点击
    $(".reStart").click(function () {
        $(".over").stop().fadeOut(100);
        $(".score").html(0);
        progressHandle();
        WolfAnimate();

    });




function progressHandle()   {
    var progressW=180;
    var timer=setInterval(function () {
        progressW-=1;
        $(".progress").css({width:progressW}) ;
        if(progressW <= 0){
            clearInterval(timer);
            $(".over").stop().fadeIn(100);
            stopWolfAnimate();
        }
    },300);
}

    var wolfTimer=null;
function WolfAnimate() {
    // 1.定义两个数组保存所有灰太狼和小灰灰的图片
    var bigWolf=['./images/h0.png','./images/h1.png','./images/h2.png','./images/h3.png','./images/h4.png','./images/h5.png','./images/h6.png','./images/h7.png','./images/h8.png','./images/h9.png'];
    var smallWolf=['./images/x0.png','./images/x1.png','./images/x2.png','./images/x3.png','./images/x4.png','./images/x5.png','./images/x6.png','./images/x7.png','./images/x8.png','./images/x9.png'];
    // 2.定义一个数组保存所有可能出现的位置
    var arrPos = [
        {left:"100px",top:"115px"},
        {left:"20px",top:"160px"},
        {left:"190px",top:"142px"},
        {left:"105px",top:"193px"},
        {left:"19px",top:"221px"},
        {left:"202px",top:"212px"},
        {left:"120px",top:"275px"},
        {left:"30px",top:"295px"},
        {left:"209px",top:"297px"}
    ];

    var randomPos=Math.round((Math.random()*8));
    var img=$("<img src='' class='wolfImg'>");
    img.css({
        position:"absolute",
        left:arrPos[randomPos].left,
        top:arrPos[randomPos].top
    });
    var type=( Math.round(Math.random()) ==0 ? bigWolf:smallWolf);
    var index=0;
    var endIndex=5;
    wolfTimer=setInterval(function () {
        img.attr("src",type[index]);
        index++;
        if (index > endIndex) {
            img.remove();
            clearInterval(wolfTimer);
            WolfAnimate();
        }
    },140);
    $(".bg").append(img);


    //当点击图片的时候
    $(".wolfImg").one("click",function () {
        //判断打的是小灰灰还是灰太狼，减分加分
        var src=$(this).attr("src");
        var char=src.indexOf("h");
        if(char > 0){
            $(".score").html(parseInt($(".score").html())+10);
        }else{
            $(".score").html(parseInt($(".score").html())-10);
        }
        index=6;
        endIndex=9;
    })


}

function stopWolfAnimate() {
    $(".wolfImg").remove();
    clearInterval(wolfTimer);
}






};
