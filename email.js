const email_admin_Html = require('./email_html/emall_admin') //引入通知管理员文件
const nodemailer = require('nodemailer');
const admin_Email = 'asd494235908@qq.com' //管理员接收邮箱
const faker_Email = [] //其他管理员也可以接收有限来确认订单 可以不填
/**@
    * @email_option重点配置
    * @**/
const email_option = {
    service: 'qq', //使用哪个邮箱 如163 qq等
    user: 'asd494235908@qq.com',//发送者的邮箱账号
    pass: 'hyzjiqzaddekcaji',//邮箱的授权码（不会的百度 很简单 POP3/SMTP服务）
    from: 'asd494235908@qq.com',//发送者
    // to: meailnum,//接收者
    // subject: '【DcPay个人收款支付系统】待审核处理',//标题 支持mtml
    // // text: '',//文本 
    // html: email_admin_Html.email_admin(option),//html
}
function meail_administrators(data, token) {
    email_init(admin_Email, data, token)
    if (faker_Email.length === 0) return
    faker_Email.forEach(item => {
        email_init(item, data, token)
    })
}
function email_init(meailnum, data, token) {

    const {
        type,//订单状态
        time,//提交时间
        oder_id,//订单id
        uid,//用户id
        address,//用户地址
        phone,//联系方式
        name,//收货人姓名
        address_info,//地址详情
        email,//用户邮箱
        userNickName,//用户昵称
        play_id,//选择的支付方式 为0是支付宝官方支付 1是支付宝免签支付 2是微信免签支付
        payType,//支付方式
        pirce,//支付金额
        pirce_info,//选择的套餐
        payNum,//本地支付标识号
        mesg,//用户留言
        play_time,//创建支付的时间
        play_callback_time,//支付成功的时间
        device,//支付设备信息
        mobile,//是否为移动设备
        isNum,//是否为自定义金额
        bz,//调用的是第几个支链接
    } = data
    let option = {
        num: Number(pirce).toFixed(2),
        passUrl: `https://www.dcmaomi.com:3000/api/upOrder?token=${token}`,//审核通过
        backUrl: `https://www.dcmaomi.com:3000/api/back?token=${token}`,//驳回 状态设置为400
        passNotShowUrl: `https://www.dcmaomi.com:3000/api/passNotShowUrl?token=${token}`,//通过但不加入捐赠名单
        delUrl: `https://www.dcmaomi.com:3000/api/delUrl?token=${token}`,//删除该支付数据
        title: name,// 尊敬的管理员Mike您好，您收到了来自<span text="${title}"></span>订单，请您及时处理：
        nickName: userNickName,//用户名称
        payType: payType,//支付方式
        payNum: payNum,//支付标识号
        mobile: mobile,//是否为移动端(true是false否)
        custom: false,//是否自定义金额输入
        info: mesg,//留言
        email: email,//通知邮箱
        time: play_time,//支付时间
        device: device,//用户支付设备信息
        pirce_info,//选择的套餐
        address: address + address_info,//地址信息
        phone, //联系方式
        oder_id,//联系方式订单编号
        isNum: isNum === 0 ? '不是' : '是',//是否为自定义输入0为false，1是ture
        bz,//调用的是第几张支付链接
    }


    // ToEmail('【DcPay个人收款支付系统】待审核处理', meailnum, email_admin_Html.email_admin(option))
    const toAdmin = goEmail(meailnum, '【DcPay个人收款支付系统】待审核处理', email_admin_Html.email_admin(option))
    toAdmin.then((err)=>{
        // console.log('发送给管理员成功')
    }).catch(err=>{
        console.log(err)
        console.log('发送给管理员失败,邮箱验证码可能已过期')
    })
}
//发送邮件
// function ToEmail(titel, to, html) {
//     /*
//      * email_option 配置
//      * titel标题
//      * to接收者
//      * html 文件信息
//      */
//     //创建连接池
//     const transporter = nodemailer.createTransport({
//         service: email_option.service,
//         auth: {
//             user: email_option.user,
//             pass: email_option.pass
//         }
//     });
//     const mailOptions = {
//         from: email_option.from,
//         to: to,
//         subject: titel,
//         //text: 'Hello world', // 文本
//         html
//     };
//     transporter.sendMail(mailOptions, function name(err, info) {
//         try {
//             if (err) {
//                 console.log(err)
//                 return
//             }
//         } catch (err) {
//             console.log(err)
//         }

//     })
// }
function goEmail(to, titel, html) {
    return new Promise((resolve, reject) => {
        /*
            * email_option 配置
            * titel标题
            * to接收者
            * html 文件信息
            */
        //创建连接池
        const transporter = nodemailer.createTransport({
            service: email_option.service,
            auth: {
                user: email_option.user,
                pass: email_option.pass
            }
        });
        const mailOptions = {
            from: email_option.from,
            to: to,
            subject: titel,
            //text: 'Hello world', // 文本
            html
        };
        transporter.sendMail(mailOptions, function name(err, info) {
            try {
                if (err) {
                    reject(err)
                    return
                } else {
                    resolve()
                }
            } catch (err) {
                resolve(err)
            }

        })
    })
}
module.exports = {
    meail_administrators,
    goEmail
}