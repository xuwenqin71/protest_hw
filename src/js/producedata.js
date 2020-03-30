!function($){
    let $sid = location.search.substring(1).split("=")[1];
    const $spic = $("#spic");
    const $bpic = $("#bpic");
    const $name = $(".p-name");
    const $price = $(".p-price");
    const $sf =$(".sf");
    const $bf =$(".bf");
    $.ajax({
        url:"http://localhost/project_huawei/php/getdata.php",
        data:{
            sid:$sid
        },
        dataType:"json"
    }).done(function(data){
        console.log(data);
        $bpic.attr("src",data.url);
        $spic.attr("src",data.url);
        $spic.attr("sid",data.sid);
        $name.html(data.name);
        $price.html(data.price);
        let $picarr = data.picurl.split(",");
        let $strhtml ="";
        $.each($picarr,function(i,v){
            $strhtml +=`<li><a href="javascript:;"><img src="`+v+`"/></a></li>`;
        });
        $(".list ul").html($strhtml);
    });
    // 放大镜
    $pic = $('.pic');
    $bpic.width($pic.width()*$bf.width()/$sf.width());
    $bpic.height($pic.height()*$bf.height()/$sf.height());
    $bili = $bf.width()/$sf.width();
    $pic.hover(function(){
        $sf.css('visibility',"visible");
        $bf.css('visibility',"visible");
        $(this).on('mousemove',function(ev){
           let $left=ev.pageX-$('.pic').offset().left-$sf.width()/2;
           let $top=ev.pageY-$('.pic').offset().top-$sf.height()/2;
           if($left<0){
               $left=0;
           }else if($left>$spic.width()-$sf.width()){
               $left=$spic.width()-$sf.width();
           }
           if($top<0){
            $top=0;
        }else if($top>$spic.height()-$sf.height()){
            $top=$spic.height()-$sf.height();
        }
            $sf.css({ 
                // 鼠标位置
                left:$left,
                top:$top,
            });
            $bpic.css({
                left:-$left*$bili,
                top:-$top*$bili,
            });
        })
    },function(){
        $sf.css('visibility',"hidden");
        $bf.css('visibility',"hidden");
    });

    //图片切换 (事件委托)ajax渲染的东西没法加事件
    $('.list ul').on('click','li',function(){
        let $imgurl=$(this).find('img').attr('src');
        // alert($imgurl);
        $spic.attr('src',$imgurl);
        $bpic.attr('src',$imgurl);
    });
    // 箭头事件
    let $num = 5;
    $right = $('.right-btn');
    $left = $('.left-btn');
    $right.on('click',function(){
        let $lists = $('.list ul li');
        $listnum=$('.list ul li').size();
        if($num<$listnum){
            $num++;
            $('.list ul').animate({
                left:-($num-5)*$lists.eq(0).outerWidth(true)
            });
        }
    });
    $left.on('click',function(){
        let $lists = $('.list ul li');
        $listnum=$('.list ul li').size();
        if($num>5){
            $num--;
            $('.list ul').animate({
                left:-($num-5)*$lists.eq(0).outerWidth(true)
            });
        }
    });

    //加入购物车，本地存储
    let arrsid = [];//商品编号
    let arrnum = [];//商品数量
    if(jscookie.get('sid')&&jscookie.get('num')){
        arrsid=jscookie.get('sid').split(',');
        arrnum=jscookie.get('num').split(',');
    }
    $('.p-btn a').on('click',function(){
        //判断是否是第一次点击
        let $sid = $(this).parents('.contance').find('#spic').attr('sid');
        if($.inArray($sid,arrsid)!=-1){
            let $num=parseInt(arrnum[$.inArray($sid,arrsid)])+parseInt($('#count').val());
            arrnum[$.inArray($sid,arrsid)] = $num;
            jscookie.add('num',arrnum,10);
        }else{
            arrsid.push($sid);
            jscookie.add('sid',arrsid,10);
            arrnum.push($('#count').val());
            jscookie.add('num',arrnum,10);
        }
    });
}(jQuery);