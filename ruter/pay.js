const fs = require('fs');
const sql = require('../mysql.js')
const components = require('../components/components.js')//引入公用方法文件
const jwt = require('jsonwebtoken')
const dayjs = require('dayjs');
const email = require('../email.js')//引入email.js文件
const email_html = require('../email_html/emall_admin'); //引入通知管理员文件
const alipaySdk = require('../alipaySdk') //引入alipaySdk
const qr = require('qr-image');
const confg = require('../server.config');

function paySqlBack(
    alipayImgArr,
    email,
    play_id,
    payType,
    pirce,
    info,
    payNum,
    mesg,
    time,
    device,
    mobile,
    isNum,
    order_id,
    token,
    res
) {
    const str = `UPDATE orderdate SET type=0, email='${email}',play_id=${play_id},payType='${payType}',pirce=${pirce},pirce_info='${info.id}',payNum=${payNum},mesg='${mesg}',play_time='${time}',device='${device}',mobile='${mobile}',isNum=${isNum},bz=${alipayImgArr.a} WHERE oder_id=${order_id}`
    const sql_a = sql.Up_Mysql_Data(str)
    sql_a.then(() => {
        /**
        @alipayImgArr.url 是当前的支付链接
        @play_id 是当前的支付方式
        @order_id 当前的顶订单编号
        @payNum  生成支付标识号
        @token 加密的token
        @isNum 是否是自定义输入 0不是   1是
        **/
        payBack(payType, alipayImgArr.url, play_id, order_id, token, payNum, isNum, res)
    }).catch((err) => {
    })
}
//免签返回数据
function payBack(payType, alipayImgArr, play_id, order_id, token, payNum, isNum, res) {
    try {
        var img = qr.image(alipayImgArr, { type: 'png', size: 25 });
        const id = components.getRandomString(16) //生成id
        img.pipe(require('fs').createWriteStream(`./pay_img/${payType}/${id}.png`))
        const img_url = `${confg.domain}/pay_img/${payType}/${id}.png`
        //删除图片
        setTimeout(() => {
            fs.unlink(`./pay_img/${payType}/${id}.png`, function (error) {
                if (error) {
                    return false;
                }
            })
        }, 300000)
        if (isNum === 1) {
            res.json({
                cood: 200,
                success: true,
                data: img_url,
                url: alipayImgArr,
                token: token,
                payNum
            })
        } else {
            res.json({
                cood: 200,
                success: true,
                data: img_url,
                url: alipayImgArr,
                token: token
            })
        }

        const str = `SELECT * FROM orderdate WHERE oder_id='${order_id}'`
        const sql_cc = sql.Select_Mysql_Data(str)
        sql_cc.then((results) => {
            let data = results.find(item => item.oder_id == order_id)
            data.play_callback_time = dayjs(data.play_callback_time).format('YYYY-MM-DD HH:mm:ss')
            email.meail_administrators(data, token)
        }).catch(() => { })
    } catch (error) {
        console.log(error)
        res.json({
            cood: 400,
            success: false,
            mesg: '错误信息'
        })
    }
}
function isWeixinUrl(price) {
    //放入支付宝的链接(顺序按照备注的顺序)，二维码解析成链接(方法百度找很多)
    /**
     * case 1:
            url = ['www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com']
            break;
        代码块
     * **/
    let url = [];

    switch (price) {
        case 1:
            url = ['www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com']
            break;
        case 10:
            url = ['www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com']
            break;
        case 168:
            url = ['www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com']
            break;
        default:
            //自定义输入金额
            url = ['www.baidu.com']
    }
    //调用的是第几张支付链接
    const a = components.randomNum_desc(0, url.length - 1)
    const option = {
        url: url[a],
        a
    }
    return option
}
function isPayUrl(price) {
    //放入支付宝的链接(顺序按照备注的顺序)，二维码解析成链接(方法百度找很多)
    /**
     * case 1:
            url = ['www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com']
            break;
        代码块
     * **/
    let url = [];

    switch (price) {
        case 1:
            url = ['www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com']
            break;
        case 10:
            url = ['www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com']
            break;
        case 168:
            url = ['www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com', 'www.baidu.com']
            break;
        default:
            //自定义输入金额
            url = ['www.baidu.com']
    }
    //调用的是第几张支付链接
    const a = components.randomNum_desc(0, url.length - 1)
    const option = {
        url: url[a],
        a
    }
    return option
}
//取货的操作
function pickGood(userEmail,
    userNickName,
    payType,
    pirce,
    pirce_info,
    mesg,
    play_callback_time) {

    const arr = ['我是货物A', '我是货物B', '我是货物C', '我是货物D',]
    let goodLink
    if (pirce_info !== 100) {
        goodLink = arr[pirce_info]
    } else {
        goodLink = arr[arr.length - 1]
    }
    const isPrice = Number(pirce).toFixed(2)
    const backtime = dayjs(play_callback_time).format('YYYY-MM-DD HH:mm:ss')
    //获取html文件传入参数
    const html = email_html.email_user(userNickName, isPrice, payType, mesg, backtime, goodLink)
    //发送邮件
    const ToEmail = email.goEmail(userEmail, '【DcPay个人收款支付系统】支付成功通知', html)
    ToEmail.then(() => {
        console.log('发送给用户成功')
    }).catch(res => {
        console.log('发送失败')
    })

}
//获取订单token
/**@
 * 验证是否收到付款
 * 检查订单状态是否改变
 * jwt token 加密数据
 * 时效259200s =1天
 * 
 * @**/
function myOrder_Token(id) {
    const token = jwt.sign({
        order_id: id
    }, 'abcd', {
        expiresIn: "259200s"
    })
    return token
}
//DcPya 申请地址
exports.DcPlay = function DcPlay(req, res) {
    const { play_id, order_id, userNickName, pirce_info, info, pirce, email, address, mesg, isNum } = req.body
    const id = components.getRandomString(28) //生成id
    const device = req.headers['user-agent'] //支付设备信息
    const time = components.getTime() //订单创建的时间
    const mobile = components.getMachine(req) // 判断是否为移动设备
    const payNum = components.randomNum() //生成支付标识号
    const token = myOrder_Token(order_id)
    const sentence = `INSERT INTO orderdate(id, type, time, oder_id, uid, address, phone, name, address_info,userNickName) VALUES('${id}', ${0}, '${time}', '${order_id}' ,${1001},'${address.address}','${address.phone}','${userNickName}','${address.address_info}','${userNickName}')`
    const sql_a = sql.Select_Mysql_Data(sentence)
    sql_a.then((results) => {
        if (play_id === 0) {
            payType = 'alipay'
            const id = order_id
            const num = '0.01'
            const titel = info.titel
            const body = info.desc
            let str = `UPDATE orderdate SET email='${email}',play_id=${play_id},payType='${payType}',pirce=${pirce},pirce_info='${info.id}',payNum=${payNum},mesg='${mesg}',play_time='${time}',device='${device}',mobile='${mobile}',isNum=${isNum} WHERE oder_id=${order_id}`
            const sql_b = sql.Up_Mysql_Data(str)
            sql_b.then(() => { //调用支付宝官方支付方式
                alipaySdk.play(id, titel, num, body, token, payType, res)
            }).catch(() => { })


        } else if (play_id === 1) {
            payType = 'alipay'
            const alipayImgArr = isPayUrl(pirce)
            //调用支付宝免签方式

            paySqlBack(
                alipayImgArr,
                email,
                play_id,
                payType,
                pirce,
                info,
                payNum,
                mesg,
                time,
                device,
                mobile,
                isNum,
                order_id,
                token,
                res
            )


        } else if (play_id === 2) {
            payType = 'wechat'
            const alipayImgArr = isWeixinUrl(pirce)
            //调用微信免签方式
            paySqlBack(
                alipayImgArr,
                email,
                play_id,
                payType,
                pirce,
                info,
                payNum,
                mesg,
                time,
                device,
                mobile,
                isNum,
                order_id,
                token,
                res
            )
        }
    }).catch(() => {
        res.json({
            cood: 400,
            success: false,
        })
    })
}
exports.play = function play(req, res) {
    /**
     * @play_id 为0是支付宝官方支付 1是支付宝免签支付 2是微信免签支付
     * @order_id 订单编号
     * @pirce 订单价格
     * @email 客户的邮箱
     * @info 套餐说明
     * @mesg 留言
     * @token 加密 
     * @isNum 是否为自定义输入0为false，1是ture
     * **/
    const { play_id, order_id, pirce, email, info, mesg, isNum } = req.body
    const device = req.headers['user-agent'] //支付设备信息
    const time = components.getTime() //订单创建的时间
    const mobile = components.getMachine(req) // 判断是否为移动设备
    const payNum = components.randomNum() //生成支付标识号
    let payType;
    //数据加密
    const token = myOrder_Token(order_id)
    if (play_id === 0) {
        payType = 'alipay'
        const id = order_id
        const num = '0.01'
        const titel = info.titel
        const body = info.desc
        let str = `UPDATE orderdate SET email='${email}',play_id=${play_id},payType='${payType}',pirce=${pirce},pirce_info='${info.id}',payNum=${payNum},mesg='${mesg}',play_time='${time}',device='${device}',mobile='${mobile}',isNum=${isNum} WHERE oder_id=${order_id}`
        const sql_a = sql.Up_Mysql_Data(str)
        sql_a.then(() => {
            //调用支付宝官方支付方式
            alipaySdk.play(id, titel, num, body, token, payType, res)
        }).catch(() => { })


    } else if (play_id === 1) {
        payType = 'alipay'

        //调用支付宝免签方式
        const alipayImgArr = isPayUrl(pirce)


        paySqlBack(
            alipayImgArr,
            email,
            play_id,
            payType,
            pirce,
            info,
            payNum,
            mesg,
            time,
            device,
            mobile,
            isNum,
            order_id,
            token,
            res
        )

    } else if (play_id === 2) {
        payType = 'wechat'

        //调用微信免签方式
        const alipayImgArr = isWeixinUrl(pirce)

        paySqlBack(
            alipayImgArr,
            email,
            play_id,
            payType,
            pirce,
            info,
            payNum,
            mesg,
            time,
            device,
            mobile,
            isNum,
            order_id,
            token,
            res
        )
    }
}
exports.orderType = function orderType(req, res) {
    const { token } = req.body
    jwt.verify(token, 'abcd', function (err, decode) {
        if (err) {
            res.json({
                cood: 401,
                success: false,
                mesg: 'token解析失败'
            })
        } else {
            const str = `SELECT * FROM orderdate WHERE oder_id='${decode.order_id}'`
            const sql_a = sql.Select_Mysql_Data(str)
            sql_a.then((results) => {
                let data = results.find(item => item.oder_id == decode.order_id)
                if (data === undefined) {
                    res.json({
                        cood: 402,
                        success: false,
                        mesg: '未检测到数据'
                    })
                    return
                }
                if (data.type === 1) {
                    res.json({
                        cood: 200,
                        success: true,
                        mesg: '支付成功'
                    })

                } else if (data.type === 500) {
                    res.json({
                        cood: 500,
                        success: false,
                        mesg: '请求被驳回'
                    })
                } else {
                    res.json({
                        cood: 400,
                        success: false,
                        mesg: '未检测到支付'
                    })
                }
            }).catch(() => {
                res.json({
                    cood: 400,
                    success: false,
                    mesg: '未检测到支付'
                })
            })
        }
    })
}
//支付宝回调
exports.dcpay = function dcpay(req, res) {
    const order_id = req.body.out_trade_no
    const time = req.body.notify_time
    const str1 = `SELECT * FROM orderdate WHERE oder_id='${order_id}'`
    const selt = sql.Select_Mysql_Data(str1)
    selt.then((orderData) => {
        //支付宝会返回的很多支付成功的回调 先判断订单是否已经支付成功了，成功订单就不做任何操作 
        //orderData[0].type ===0 的就是未支付的订单
        if (orderData[0].type !== 0) return
        const {
            email,//用户邮箱
            userNickName,//用户昵称
            payType,//支付方式
            pirce,//支付金额
            pirce_info,//选择的套餐
            mesg,//用户留言
            play_callback_time,//支付成功的时间
        } = orderData[0]
        const str = `UPDATE orderdate SET type=1, play_callback_time='${time}' WHERE oder_id=${order_id}`

        const isMySql = sql.back_Mysql_Data(str)
        isMySql.then((data) => {

        }).catch(err => {

        })
        //取货的操作
        pickGood(
            email,
            userNickName,
            payType,
            pirce,
            pirce_info,
            mesg,
            play_callback_time
        )
    }).catch(() => {
        console.log('查找失败')
    })
}
exports.AuditProcess = function AuditProcess(req, res, type) {
    const { token } = req.query
    const appRes = res
    const time = components.getTime()
    jwt.verify(token, 'abcd', function (err, decode) {
        if (err) {
            appRes.sendfile('./email_html/token_error.html')
        } else {
            const order_id = decode.order_id
            let isData = sql.back_orderData(order_id)

            isData
                .then(res => {
                    const str = `UPDATE orderdate SET type=${type}, play_callback_time='${time}' WHERE oder_id=${order_id}`
                    let isMySql = sql.back_Mysql_Data(str)
                    isMySql.then(data => {
                        const {
                            email,//用户邮箱
                            userNickName,//用户昵称
                            payType,//支付方式
                            pirce,//支付金额
                            pirce_info,//选择的套餐
                            mesg,//用户留言
                            play_callback_time,//支付成功的时间
                        } = res
                        //取货的操作
                        pickGood(
                            email,
                            userNickName,
                            payType,
                            pirce,
                            pirce_info,
                            mesg,
                            play_callback_time
                        )
                        appRes.sendfile('./email_html/success.html')
                    }).catch(err => {
                        appRes.sendfile('./email_html/error.html')
                    })
                })
                .catch(err => {
                    if (err === '未找到数据') {
                        appRes.sendfile('./email_html/error.html')
                    } else {
                        appRes.sendfile('./email_html/stop.html')
                    }
                    //返回失败 还是已经被操作了
                })
        }
    })
}
exports.passNotShowUrl = function passNotShowUrl(req, res) {
    const { token } = req.query
    const time = components.getTime()
    const appRes = res
    jwt.verify(token, 'abcd', function (err, decode) {
        if (err) {
            appRes.sendfile('./email_html/token_error.html')
        } else {
            const order_id = decode.order_id
            let isData = sql.back_orderData(order_id)
            isData
                .then(res => {
                    const str = `UPDATE orderdate SET type=1, play_callback_time='${time}' WHERE oder_id=${order_id}`
                    let isMySql = sql.back_Mysql_Data(str)
                    isMySql.then(data => {
                        appRes.sendfile('./email_html/success.html')
                        setTimeout(() => {
                            const a = `DELETE FROM orderdate WHERE oder_id='${order_id}'`
                            const sql_a = sql.Dell_Mysql_Data(a)
                            sql_a.then(() => { }).catch(() => { })
                            const b = `DELETE FROM order_list WHERE oder_id='${order_id}'`
                            const sql_b = sql.Dell_Mysql_Data(b)
                            sql_b.then(() => { }).catch(() => { })
                        }, 10000);
                    }).catch(err => {
                        appRes.sendfile('./email_html/error.html')
                    })
                })
                .catch(err => {
                    if (err === '未找到数据') {
                        appRes.sendfile('./email_html/error.html')
                    } else {
                        appRes.sendfile('./email_html/stop.html')
                    }
                    //返回失败 还是已经被操作了
                })
        }
    })
}
exports.delUrl = function delUrl(req, res) {
    const { token } = req.query
    jwt.verify(token, 'abcd', function (err, decode) {
        if (err) {
            res.sendfile('./email_html/token_error.html')
        } else {
            const order_id = decode.order_id
            const str = `SELECT * FROM orderdate WHERE oder_id='${order_id}'`
            let isData = sql.back_Data(str)
            isData.then(() => {
                const a = `DELETE FROM orderdate WHERE oder_id='${order_id}'`
                const sql_a = sql.Dell_Mysql_Data(a)
                sql_a.then(() => { }).catch(() => { })
                const b = `DELETE FROM order_list WHERE oder_id='${order_id}'`
                const sql_b = sql.Dell_Mysql_Data(b)
                sql_b.then(() => { }).catch(() => { })
                res.sendfile('./email_html/success.html')
            }).catch(() => {
                res.sendfile('./email_html/error.html')
            })


        }
    })
}
exports.payType = function payType(req, res) {
    const str = `SELECT * FROM pay_type`
    const sql_a = sql.back_Data(str)
    sql_a.then((data) => {
        res.json({
            cood: 200,
            success: true,
            data
        })
    })
        .catch(err => {
            res.json({
                cood: 400,
                success: false,
                meg: '错误'
            })
        })
}
