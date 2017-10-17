// 上传文件中间件
const multer = require('koa-multer')

// node 服务器
const server = {
    host: 'localhost',
    port: 3000
}

// redis服务器
const redis = {
    port: 6379,          // Redis port
    host: '127.0.0.1',   // Redis host
    // family: 4,           // 4 (IPv4) or 6 (IPv6)
    // password: 'auth',
    // db: 0
}

// mysql服务器
const mysql = {
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'database',
    dialect: 'mysql'
}

// log4日志配置
const log4js = {
    "appenders": [   
        {"type": "console", "category": "console"},   
        {        
            "type": "dateFile", 
            "filename": "cache/log/",  
            "pattern": "yyyy-MM-dd.log",  
            "alwaysIncludePattern": true,
            "category": "default",
            "level" : "INFO"  
        }
    ],
    replaceConsole: true
}

// nunjucks模板配置
const template = {
    noCache: true,
    watch: true
}

// 上传文件配置
const storage = multer.diskStorage({  
    // 文件保存路径
    destination: function (req, file, cb) {  
      cb(null, 'cache/imgs/')  
    },  
    // 修改文件名称
    filename: function (req, file, cb) {  
      var fileFormat = (file.originalname).split(".");  
      cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);  
    }  
  })
  
const upload = multer({ storage: storage }); 

module.exports = {
    server: server,
    redis: redis,
    mysql: mysql,
    log4js : log4js,
    template: template,
    upload: upload
}  