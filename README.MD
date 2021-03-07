# DM商城,DM商城(移动端),Dcpay个人收款支付系统 后端
[![](https://img.shields.io/badge/version-1.0-brightgreen)](https://github.com/asd494235908/DM-Server)
[![GitHub stars](https://img.shields.io/github/stars/asd494235908/DM-Server.svg?style=social&label=Stars)](https://github.com/asd494235908/DM-Server)
[![GitHub forks](https://img.shields.io/github/forks/asd494235908/DM-Server.svg?style=social&label=Fork)](https://github.com/asd494235908/DM-Server)
- [若图片显示不完整请跳转码云](https://gitee.com/dcmaomi/Dm)
### 前台项目已部署，在线Demo
- DM商城：https://www.dcmaomi.com
- Dcpay前台：https://dcpay.dcmaomi.com
 [![WX20190924-234416@2x.png](https://www.dcmaomi.com:3010/serverImage/20210306141208_16064.png)](https://github.com/asd494235908/DcPay)
 - [DM微信小程序 APP前端 现已开源！](https://github.com/asd494235908/DM-Mobile-terminal)
    
    [![WX20190924-234416@2x.png](https://www.dcmaomi.com:3010/serverImage/20210305010710_12523.png)](https://github.com/asd494235908/DM-Mobile-terminal)
    - [DM-TM后端(前台页面)](https://github.com/asd494235908/TerMinal)

    ![](https://www.dcmaomi.com:3010/serverImage/20210305011146_16923.png)
    - [DM-TM后端(后端页面)](https://github.com/asd494235908/TerMinal-serve)
### v1.0  项目功能
 - 持支付宝当面付(官方) 未支持微信(需要营业执照等)
 - 订单半自动收款
 - 实现订单支付标识 解决无法识别支付人问题
 - 发送邮件
 - 定时任务
 - 用户的订单管理
 - 用户的信息管理
 - 用户的购物车管理
 - 向前台页面提供渲染数据
#### 注：v1.0源码（最新）获取方式 
- 进入[DcPay](https://dcpay.dcmaomi.com/pay)成功支付捐赠测试后 将自动发至你所填写的邮箱中
### 声明
> 此系统只针对个人开发收款支付，实际可应用到实现，无法商用~~！可勉强供真正个人商用！日入百万千万的请绕道！当然你还可将此项目当作入门级的vue.js javascript练习项目

### 后端所用技术(https://github.com/asd494235908/DM-Server) 
- 主要
   - [Node Js](https://nodejs.org/zh-cn/)：Node.js
   - [express](https://www.expressjs.com.cn/)：基于 Node.js 平台， Web 开发框架
   - [mysql](https://www.mysql.com/)：基于 Node.js 平台， Web 开发框架
   - [Swagger2](https://www.dcmaomi.com:3000/api/swagger/#/)：Api文档生成
   - [svg-captcha](https://www.npmjs.com/package/svg-captcha)：登录验证码
   - [silly-datetime](https://www.npmjs.com/package/silly-datetime)：时间格式化工具
   - [qr-image](https://www.npmjs.com/package/silly-datetime)：链接生成二维码
- 第三方接口
  - 高德地图城市列表API：获取全国省/市/县(区)三级列表 需要注册appid
  - [天气api](http://www.tianqiapi.com/index/doc?version=day)：根据Ip地址获取城市天气（服务器主要用来获取城市）需要注册appid
- 第三方SDK
  - [alipay-sdk](http://www.tianqiapi.com/index/doc?version=day)：支付宝支付Sdk
- 服务器
  - [宝塔建站](https://www.bt.cn/)：宝塔建站
  - [Apache](http://httpd.apache.org/)

  ### 本地运行
- node.js 版本(v12.18.3) 
- 下载zip直接解压或安装git后执行克隆命令 `https://github.com/asd494235908/DcPay.git`
- 右键进入PowerShell  切换到当前路径
- 初始化项目
```
npm install
```

```javascript
//app.js
//若未部署ssl证书请开启此选项 请访问 接口访问 http://localhost:3000
app.listen(3000) 
//部署ssl证书请开启此选项 接口访问 https://您的域名:3000 服务器上运行开启此选项才能运行成功
let key = fs.readFileSync('ssl/证书.key', 'utf8'),
	cert = fs.readFileSync('ssl/证书.pem', 'utf8');
	let credentials = { key, cert };

let server = https.createServer(credentials, app);

server.listen(3000, '0.0.0.0');
```
```javascript
//server.config.js 配置你的服务器
const config = {
    domain = "您的域名加端口号" // http://localhost:3000
}
```
- 支付功能配置文件 alipaySdk.js 要配置都做好了注释
运行项目
```
node app.js
```
### 技术疑问交流
- 免费交流群 `949139553` [![](http://pub.idqqimg.com/wpa/images/group.png)](https://qm.qq.com/cgi-bin/qm/qr?k=dtD6X04E3q7v3C8wuOnUENoW5S7hdGHO&jump_from=webapi)
- 作者邮箱 asd494235908@qq.com
### 商用授权
- 个人学习使用遵循GPL开源协议
- 商用需联系作者低价授权
### [捐赠](https://dcpay.dcmaomi.com/pay)