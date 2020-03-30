!function($){
    let $menuli = $(".menu ul li");
    let $items = $('.cartlist');
    $menuli.on('mouseover',function(){
        $(this).addClass("active");
        $items.eq($(this).index()).show();
    });
    $menuli.on("mouseout",function(){
        $(this).removeClass("active");
        $items.eq($(this).index()).hide();
    });

}(jQuery);