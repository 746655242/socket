require.config({
    baseUrl: location.origin+"/js/",
    waitSeconds : 30,   //请求等待的秒数，默认是7秒
    urlArgs : "r=" +  (new Date()).getTime(),   //附加在URL上参数，防止客户端缓存
    paths: {
        jquery:'lib/jquery.min',
		hammer:'lib/hammer.min',
		exif:'lib/exif'
    },
    shim: {
        underscore  : { exports : "_" },
        backbone    : {
            deps    : ["underscore","jquery"],
            exports : "Backbone"
        },
        localstorage: {
            deps    : ["underscore",'backbone'],
            exports : "localstorage"
        }
    }
});
