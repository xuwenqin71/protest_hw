!function($){
    let $checkednum=0;
    function showlist(sid,num){
        $.ajax({
            url:'http://localhost/project_huawei/php/producedata.php',
            dataType:'json'
        }).done(function(data){
            $.each(data,function(i,v){
                if(sid==v.sid){
                    let $clonebox = $('.moban:hidden').clone(true,true);
                    $clonebox.find('.p-img').attr('src',v.url);
                    $clonebox.find('.p-name').html(v.name);
                    $clonebox.find('.p-price').html(v.price);
                    $clonebox.find('.p-num').html(num);
                    let $count = num*v.price;
                    $clonebox.find('.p-count').html('￥'+$count);
                    $clonebox.css('display','block');
                    $('form').append($clonebox);
                    $checkednum++;
                }
            });
        });
    }
    if(jscookie.get('sid')&&jscookie.get('num')){
        let s=jscookie.get('sid').split(',');
        let n=jscookie.get('num').split(',');
        $.each(s,function(index,value){
            showlist(s[index],n[index]);
        });
    }
    $moban = $('.list');
    $checked = $('.moban input');
    $checkedall = $('.title input');
    $checkedall.on('click',function(){
        if($(this).attr('class')=='checked'){
            $moban.find('input').removeClass();
        }else{ 
           $moban.find('input').addClass('checked');
        }
        
    });
   
    $checked.on('click',function(){
        if($(this).attr('class')=='checked'){
            $checkednum++;
            $(this).removeClass(); 
        }else{
            $checkednum--;
            $(this).addClass('checked');
        }
        if($checkednum==0){
            $checkedall.addClass('checked');
        }else{
            $checkedall.removeClass();
        }
    });
    
}(jQuery)