

var nav_elements=document.getElementsByTagName('main')[0].getElementsByTagName('nav')[0].getElementsByTagName('ul')[0].getElementsByTagName('li');
for(var i=0;i<nav_elements.length;i++)
{
	if(nav_elements[i].getAttribute("data-iframe-url"))
	{
		nav_elements[i].addEventListener("click",function()
		{
			this.parentNode.querySelector(".active").classList.remove("active");
			this.classList.add("active");
			history.pushState('','/'+this.getAttribute("data-iframe-url"),'/'+this.getAttribute("data-iframe-url"));
			document.getElementById('iframe_page').src=window.location+"_f.html";
			iframe_start();
		});
	}
}

function iframe_start()
{
	var iframes_html=document.getElementById('iframe_page');
	if(iframes_html)
	{
		setTimeout(iframe_load,500,iframes_html);
		setTimeout(iframe_load,1000,iframes_html);
		setTimeout(iframe_load,2000,iframes_html);
		setTimeout(iframe_load,5000,iframes_html);
	}
}
iframe_start();
function iframe_load(iframe_obj)
{
	iframe_obj.contentWindow.addEventListener("resize",function(){iframe_set_height(this.frameElement);});
	if(iframe_obj.contentDocument.documentElement)
	{
		iframe_obj.style.height=iframe_obj.contentDocument.documentElement.getElementsByTagName("main")[0].scrollHeight+20+"px";
		iframe_obj.contentDocument.documentElement.getElementsByClassName("background_img")[0].parentNode.style.position="relative";
	}
	else
	{
		iframe_obj.style.height=iframe_obj.contentDocument.getElementsByTagName("main")[0].scrollHeight+20+"px";
		iframe_obj.contentDocument.getElementsByClassName("background_img")[0].parentNode.style.position="relative";
	}
}
function iframe_set_height(iframe_obj)
{
	if(iframe_obj.contentDocument.documentElement)
	{
		iframe_obj.style.height=iframe_obj.contentDocument.documentElement.getElementsByTagName("main")[0].scrollHeight+20+"px";
	}
	else
	{
		iframe_obj.style.height=iframe_obj.contentDocument.getElementsByTagName("main")[0].scrollHeight+20+"px";
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