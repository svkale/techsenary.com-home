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

function request_log(request_obj)
{
	console.log(request_obj);
}

// google integrations

// spreadsheets
function request_gsheet(request_obj)
{
	return JSON.parse(request_obj.responseText.substring(28,request_obj.responseText.length-2)).feed.entry;
}

// docs
function request_gdoc(request_obj)
{
	return request_obj.responseText;
}
function request_gdoc_show(request_obj,params)
{
	var put_target=params[0];
	var response_doc=new DOMParser().parseFromString(request_gdoc(request_obj),"text/html");
	var response_doc_headtags=response_doc.getElementsByTagName('head')[0].children;
	var put_data="";
	for(var i=0;i<response_doc_headtags.length;i++)
	{
		if(response_doc_headtags[i].tagName=="STYLE")
		{
			put_data+=response_doc_headtags[i].outerHTML;
			console.log(response_doc_headtags[i]);
		}
	}
	put_data+=response_doc.getElementsByTagName('body')[0].outerHTML.replace(/body/,"div");
	put_target.insertAdjacentHTML("beforeend",put_data);
	put_target.classList.add("gdoc_contents");
}

// scripts web app
 window.addEventListener("message", message_operate);
function message_operate(message)
{
	window[message.data.function_name](message.data.function_parameters);
}
