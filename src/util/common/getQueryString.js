//获取url地址后的参数
export const  getQueryString = (name) => { 
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	  var r = window.location.search.substr(1).match(reg); 
	  if (r != null) return decodeURI(r[2]); return null;
    } 