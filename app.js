const express = require('express')
const fs = require('fs');
const sql = require('./mysql.js') //引入mysql文件
const components = require('./components/components.js')//引入公用方法文件
const cors = require('cors');
const bodyParser = require('body-parser');
const https = require('https');

const path = require('path');
const dayjs = require('dayjs');
const dataBaseOperate = require('./ruter/router');
const app = express()
const swaggerUi = require('swagger-ui-express'); // swagger包
const email = require('./email')//引入email.js文件
const email_html = require('./email_html/emall_admin'); //引入通知管理员文件
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}))
app.use('/pay_img', express.static('pay_img'))
app.use('/serverImage', express.static(path.join(__dirname, 'serverImage')));

app.all('*', function (req, res, next) {
	// 设置请求头为允许跨域
	res.header('Access-Control-Allow-Origin', '*');
	// 设置服务器支持的所有头信息字段
	res.header('Access-Control-Allow-Headers',
		'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild, sessionToken');
	// 设置服务器支持的所有跨域请求的方法
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
	if (req.method.toLowerCase() == 'options') {
		res.send(200); // 让options尝试请求快速结束
	} else {
		next();
	}
});
const page_home = require('./ruter/home_page.js')
const login = require('./ruter/login.js')
const cart = require('./ruter/cart.js')
const order = require('./ruter/order.js')
const address = require('./ruter/address.js')
const pay = require('./ruter/pay.js')
const options = require('./swagger/swagger.json');
app.use('/api/swagger', swaggerUi.serve, swaggerUi.setup(options));
const schedule = require('node-schedule');


app.use('/api', dataBaseOperate);

//DcPlay提交支付
app.post('/api/DcPlay', (req, res) => {
	pay.DcPlay(req, res)

})
app.post('/api/play', (req, res) => {
	pay.play(req, res)
})

//是否已经支付
app.post('/api/orderType', (req, res) => {
	pay.orderType(req, res)

})
/**@
 *  https://www.dcmaomi.com:3000/api/dcpay 支付宝回调地址
 *               域名      端口号   接口
 * 
 * @**/
app.post('/api/dcpay', (req, res) => {
	pay.dcpay(req, res)
})
/*
*@passUrl: `https://www.dcmaomi.com:3000/api/upOrder?token=${token}`,//审核通过
*@passUrl2: `https://www.dcmaomi.com:3000/api/upWeb_Administration?token=${token}`,//审核通过 发送后台管理
*@passUrl3: `https://www.dcmaomi.com:3000/api/upApp?token=${token}`,//审核通过 发送UNI-app
*@papssUrl4: `https://www.dcmaomi.com:3000/api/upWeb?token=${token}`,//审核通过  发送web
*@papckUrl: `https://www.dcmaomi.com:3000/api/back?token=${token}`,//驳回 状态设置为400
*@passNotShowUrl: `https://www.dcmaomi.com:3000/api/passNotShowUrl?token=${token}`,//通过但不加入捐赠名单
*@delUrl: `https://www.dcmaomi.com:3000/api/delUrl?token=${token}`,//删除该支付数据 
*/
//审核通过
app.get('/api/upOrder', (req, res) => {
	pay.AuditProcess(req, res, 1)
})
//驳回 状态设置为500
app.get('/api/back', (req, res) => {
	pay.AuditProcess(req, res, 500)
})
//通过但不加入名单
app.get('/api/passNotShowUrl', (req, res) => {
	pay.passNotShowUrl(req, res)
})
//删除该支付数据
app.get('/api/delUrl', (req, res) => {
	pay.delUrl(req, res)
})
//下载 app 安卓
app.get('/api/downloadApp', (req, res) => {
	res.download('./app/__UNI__24FE3A3_20210129164144.apk')
})
app.post('/api/Donation', (req, res) => {
	page_home.Donation(req, res)
})
app.post('/api/getHistory', (req, res) => {
	page_home.getHistory(req, res)
})
//修改用户信息
app.post('/api/modifyUserInfo', (req, res) => {
	page_home.modifyUserInfo(req, res)
})

//删除用户收获地址
app.post('/api/dellAddress', (req, res) => {
	address.dellAddress(req, res)
})
//获取城市地址
app.get('/api/city', (req, res) => {
	page_home.city(req, res)
})
//提交用户地址
app.post('/api/subAddress', (req, res) => {
	address.subAddress(req, res)
})
//获取套餐
app.post('/api/payType', (req, res) => {
	pay.payType(req, res)

})
//删除订单
app.post('/api/dellOrder', (req, res) => {
	order.dellOrder(req, res)

})
//滑动用户获取订单
app.post('/api/getScrollOrder', (req, res) => {
	order.getScrollOrder(req, res)
})
//获取用户订单
app.post('/api/getOrder', (req, res) => {
	order.getOrder(req, res)
})
//提交用户订单
app.post('/api/submitOrder', (req, res) => {
	order.submitOrder(req, res)
})
app.get('/api/getOrderId', (req, res) => {
	const str = 'select MAX(oder_id)FROM orderDate'
	connection.query(str, function (error, results, fields) {
		if (error) throw error;
		let id = results[0]['MAX(oder_id)']
		id = id === null ? 1000 : id
		res.json({
			cood: 200,
			success: true,
			id
		})

	});
})
//根据id获取商品的信息
app.post('/api/getItem', (req, res) => {
	page_home.getItem(req, res)
})
//删除一个购物数据
app.post('/api/dellGoodItem', (req, res) => {
	cart.dellGoodItem(req, res)
})
//添加和删除购物车Item
app.post('/api/GoodItem', (req, res) => {
	cart.GoodItem(req, res)
})
//获取热搜数据
app.get('/api/getSerchHot', (req, res) => {
	page_home.getSerchHot(req, res)
})
//搜索商品
app.get('/api/search', (req, res) => {
	page_home.search(req, res)
})
//获取分类商品
app.get('/api/listgood', (req, res) => {
	page_home.listgood(req, res)
})


//获取分类数据
app.get('/api/navData', (req, res) => {
	page_home.navData(req, res)
})
//获取首页数据
app.get('/api/home', (req, res) => {
	page_home.homeData(req, res)
})

//web qq登录请求用户信息
app.post('/api/webqq', (req, res) => {
	login.qqlogin_mesg(req, res)
})
//用户留言api
app.post('/api/submit_mesg', (req, res) => { login.submit_mesg(req, res) })
//登录验证码
app.post('/api/verification', (req, res) => {
	login.verification(req, res)
})
//微信qq登录
app.post('/api/Otherlogins', (req, res) => {
	login.Otherlogins(req, res)
})

//登录
app.post('/api/Login', (req, res) => {
	login.login(req, res)
})

//登录持久化验证
app.post('/api/validate', (req, res) => {
	login.validate(req, res)

})
const scheduleCronstyle = () => {
	//每天的11点执行一次:
	schedule.scheduleJob('0 0 11 * * *', () => {
		DailyTasks()
	});
}

scheduleCronstyle();
//定时任务
function DailyTasks() {
	const time = components.getTime()
	const arr = components.arrnNuber(time.match(/\d+/g))
	const oldTime = `${arr[0]}-${components.towNum(arr[1])}-${components.towNum(Number(arr[2]) - 1)}`
	const str = `SELECT * FROM orderdate WHERE play_time LIKE '%${oldTime}%' and type=0`
	const sql_a = sql.Select_Mysql_Data(str)
	sql_a.then((results) => {
		let data = results
		data.forEach(item => {
			if (item.email !== '' && item.email !== null) {
				let time = dayjs(item.play_time).format('YYYY-MM-DD HH:mm:ss')
				const html = email_html.meail_err(item.userNickName, Number(item.pirce).toFixed(2), item.payType, item.mesg, time)
				// console.log(html)
				const ToEmail = email.goEmail(item.email, '【DcPay个人收款支付系统】支付失败通知', html)

				ToEmail.then(() => {
					console.log('发送支付失败给用户,成功')
				}).catch(res => {
					console.log('发送支付失败给用户,失败')
				})
			}

		})

	}).catch((err) => { })
}


function setOrderType() {
	const str = `SELECT * FROM orderdate WHERE type=0`
	const sql_a = sql.Select_Mysql_Data(str)
	sql_a.then((results) => {
		if (results.length === 0) return
		results.forEach(item => {
			item.time = dayjs(item.time).format('YYYY-MM-DD HH:mm:ss')
			timeNum(item.time, item.id)
		})
	}).catch((() => { }))
}
setInterval(() => {
	setOrderType()
}, 1000);
function timeNum(time, id) {
	// console.log(id)
	const arr = components.arrnNuber(time.match(/\d+/g)) // 数组字符串返回数组 数字类型
	const nowTime = components.arrnNuber(components.getTime().match(/\d+/g)) // 数组字符串返回数组 数字类型
	const arrs = components.alls(arr)
	const nowTimes = components.alls(nowTime)
	const nowLaer = nowTimes - arrs
	//判断订单是否大于1天
	if (nowLaer >= 86400000) {
		console.log('订单大于1天')
		const str = `UPDATE orderdate SET type=3 WHERE id='${id}'`
		const sql_a = sql.Up_Mysql_Data(str)
		sql_a.then(() => { }).catch(() => { })
	} else {

		const num = 86400000 - nowLaer
		if (num === 0) {
			console.log('订单大于1天')
			// return '订单大于一天'
			const str = `UPDATE orderdate SET type=3 WHERE id='${id}'`
			const sql_b = sql.Up_Mysql_Data(str)
			sql_b.then(() => { }).catch(() => { })

		} else {
			// console.log('订单不大于1天')
		}
	}
}
app.listen(3000)
//证书
// let key = fs.readFileSync('ssl/4765496_www.dcmaomi.com.key', 'utf8'),
// 	cert = fs.readFileSync('ssl/4765496_www.dcmaomi.com.pem', 'utf8');
// 	let credentials = { key, cert };

// let server = https.createServer(credentials, app);

// server.listen(3000, '0.0.0.0');
