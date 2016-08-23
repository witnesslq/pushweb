var app = {
    URL:{
        allapp:function (offset,limit) {
            return "/app/"+$.cookie("developerId")+"/"+$.cookie("developerToken")+"/auth/"+offset+"/"+limit+"/apps";
        },
        app:function (appId) {
            return "/app/" + $.cookie("developerId") + "/" + $.cookie("developerToken") + "/auth/" + appId + "/app";
        },
        broker:function (appKey,appSecretKey) {
            return "/broker/"+$.cookie("developerId") + "/" + $.cookie("developerToken") + "/auth/"+appKey+"/"+appSecretKey+"/broker";
        }
    },
    find:{
        init:function (developerId,developerToken) {
            
        },
        allapp:function (Params) {
            var offset = Params["offset"];
            var limit = Params["limit"];
            app.find.init($.cookie("developerId"),$.cookie("developerToken"));
            $.post(app.URL.allapp(offset,limit),{},function (result) {
                console.log(app.URL.allapp(offset,limit),result);
                if(result.success){
                    console.log("apps={}",result.data);
                    $.each(result.data,function (key,value) {
                        var data = new Date(value.appCreatetime);
                        var data=data.getFullYear()+"-"+data.getMonth()+"-"+data.getDate();
                            $("#apps_container").append("<div style='margin-left:1em;background: #FFF;box-shadow: 0px 0px 1px  2px #eee;margin-top: 1em;padding: 0;padding-bottom: 0.5em;border-radius: 1px;' class='app col-md-2'><img style='border-radius: 1px;' class='col-md-12' src='resources/img/"+value.appType+".png'/><a style='color:#333;font-weight: lighter;font-size: 1em;margin-top: 0.5em;' href='/app/"+value.appId+"' class='col-md-12'>"+value.appName.substr(0,15)+"</a><span style='color: #aaaaaa;font-size: 0.5em;' class='col-md-12'>"+value.appCompany.substr(0,15)+"</span><span style='margin-top:1em;' class='glyphicon glyphicon-time col-md-12'>"+data+"</span></div>")
                    });
                }else{
                    $("#tip").html("<strong>"+result.msg+"</strong>");
                }
            });
        },
        app:function (id) {
            $.post(app.URL.app(id), {}, function (result) {
                console.log(result);
                if(result.success){
                    console.log("appKey={}",result.data.appKey);
                    console.log("appSecretKey={}",result.data.appSecretKey);
                    app.find.broker(result.data.appKey,result.data.appSecretKey);
                }
            });
        },
        broker:function (appKey,appSecretKey) {
            var url=app.URL.broker(appKey,appSecretKey);
            console.log("broker_url={}",url);
            $.post(url,{},function (result) {
                console.log(result);
                if(result.success){
                }
            });
        }
    },
    create:{
        createapp:function (appname) {
            
        }
    }
}