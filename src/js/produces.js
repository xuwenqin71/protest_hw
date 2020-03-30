!function($){
    const $list = $(".produce");
    $.ajax({
        url:'http://localhost/project_huawei/php/producedata.php',
        dataType:'json',
        
    }).done(function(data){
        console.log(data);
        let strhtml="<ul>";
        $.each(data,function(i,v){
            strhtml+=
            `
                <li>
                    <a href="produce1.html?sid=${v.sid}" target="_blank">
                    <img src="${v.url}">
                    <p class="p_name">${v.name}</p>
                    <p class="p_price">￥${v.price}</p>
                    <p class="p_comment"><span>999人评价</span>
                    <span>100%好评</span></p>
                    </a>
                </li>
            `;
        });
        strhtml+='</ul>';
        $list.html(strhtml);


    });
}(jQuery);