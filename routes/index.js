/**
 * Project          : pm2
 * Version      : 1.0
 * Author           :front-end web developer(FED)   zhuyangyang
 * create:2015-1-18
 * last updata :2015-1-18
 */
var http = require('http');
var url = require('url');
var request = require('request');
var logger=require("../module/logHelper.js").helper;
/*处理请求*/
http.createServer(function(req,res){
    var NDT=new Date().getTime();
    var pathname = url.parse(req.url,true).pathname;
    var params =  url.parse(req.url,true).query;
    var path = req.url; 
    var rhh=req.headers.host;
    var rhu=req.headers['user-agent'];
    var cb = params.callback?params.callback:'';
    //logger.writeDebug(req);
    var reqObj={
    	NDT:NDT,
    	path:path,
    	rhh:rhh,
    	rhu:rhu,
    	params:params
    }
    //logger.writeDebug(reqObj);
    //console.log(pathname);
    
    /*处理网站默认图标请求*/
    if(pathname=="/favicon.ico"){
        //
    }
    else if(pathname == "/"){
        request({url:"http://123.57.249.148:9615", oauth:{}, json:true}, function (error, response, body) {
            console.log(error);
            console.log(response.statusCode);
            //console.log(body);
            if (!error && response.statusCode == 200) {
                res.writeHead(200, {"Content-Type": "text/plain"});
                console.log(body.system_info);
                var body=JSON.stringify(body);
                res.write(body);
                res.end();
            }else{
                res.write("请求出错error");
                res.end();
            }
            console.log("respondend-------------------------------------------");
        });
    }
    /*请求地址不存在或者参数错误*/
    else{
        res.end(cb+'({"state":404,"errMsg":"请求的服务不存在"})');
        logger.writeErr(NDT+"请求的服务不存在");
    }   
    
}).listen(3002);
