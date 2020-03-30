let jscookie={
	add:function (key,value,days){
	let d= new Date();
	d.setDate(d.getDate()+days)
	document.cookie = `${key}=${encodeURIComponent(value)};expires=${d}`;
	},
	get:function (key){
			let cookiearr = decodeURIComponent(document.cookie).split('; ');//注意空格
			for(let i = 0;i<cookiearr.length;i++){
					console.log(cookiearr[i].split('='));
					let newarr=cookiearr[i].split('=');
					if (key==newarr[0]){
						return newarr[1];
					}
				}
			},
	del:function (key){
	add(key,'',-1);
}
}