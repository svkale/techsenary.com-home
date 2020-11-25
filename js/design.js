if(document.getElementsByClassName('background_img')[0])
{
	var bgimages=document.getElementsByClassName('background_img');
	console.log(bgimages);
	for(var i=0;i<bgimages.length;i++)
	{
		bgimages[i].parentElement.style.position="relative";
	}
}


var nav_elements=document.getElementsByTagName('main')[0].getElementsByTagName('nav')[0].getElementsByTagName('ul')[0].getElementsByTagName('li');
for(var i=0;i<nav_elements.length;i++)
{
	if(nav_elements[i].getAttribute("data-iframe-url"))
	{
		nav_elements[i].addEventListener("click",function()
		{
			window.location.href="https://"+this.getAttribute("data-iframe-url");
		});
	}
}


function request(path,func)
{
	var param=[];
	for(var i=2;i<arguments.length;i++)
	{
		param[i-2]=arguments[i];
	}
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.onreadystatechange=function()
	{
		if (this.readyState==4 && this.status==200)
		{
			window[func](this,param);
		}
	};
	xmlhttp.open('GET',path,true); 
	xmlhttp.send();
	return;
}
function put_hitcount(request_obj,params)
{
	var count=JSON.parse(request_obj.responseText.substring(28,request_obj.responseText.length-2)).feed.entry[0].content.$t;
	params[0].innerHTML=count;
}
for(var i=0;i<document.querySelectorAll("[data-ssheet-url]").length;i++)
{
	request(document.querySelectorAll("[data-ssheet-url]")[i].getAttribute("data-ssheet-url"),"put_hitcount",document.querySelectorAll("[data-ssheet-url]")[i]);
}