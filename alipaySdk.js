const fs = require('fs');
const qr = require('qr-image');
const config = require('./server.config');
const AlipaySdk = require('alipay-sdk').default;
const alipaySdk = new AlipaySdk({
    /** 支付宝网关 **/
    gateway: 'https://openapi.alipay.com/gateway.do',

    /** 应用id，如何获取请参考：https://opensupport.alipay.com/support/helpcenter/190/201602493024 **/
    appId: '',

    /** 应用私钥，密钥格式为pkcs1，如何获取私钥请参考：https://opensupport.alipay.com/support/helpcenter/207/201602469554  **/
    privateKey: fs.readFileSync('密钥文件地址(private-key.pem)', 'ascii'),

    /** 支付宝公钥，如何获取请参考：https://opensupport.alipay.com/support/helpcenter/207/201602487431 **/
    alipayPublicKey: fs.readFileSync('宝公钥文件地址(public-key.pem)', 'ascii'),

    /** 签名算法类型 **/
    signType: 'RSA2',
});
function getRandomString(n) {
    var str = "";
    while (str.length < n) {
        str += Math.random().toString(36).substr(2);
    }
    return str.substr(str.length - n)
}
function play(order_id, title, num, body, token, payType, res) {
    const result = alipaySdk.exec('alipay.trade.precreate', {
        /** 设置业务参数  **/
        bizContent: {
            /** 商户订单号，商户自定义，需保证在商户端不重复，如：20200612000001 **/
            OutTradeNo: order_id,

            /** 销售产品码，固定值 FACE_TO_FACE_PAYMENT **/
            ProductCode: 'FACE_TO_FACE_PAYMENT',

            /**订单标题 **/
            Subject: title,

            /** 订单金额，精确到小数点后两位 **/
            TotalAmount: num,

            /** 订单描述 **/
            Body: body,

            /** 业务扩展参数  **/
            //extendParams:{ 

            /** 系统商编号，填写服务商的PID，返佣参数传值前提：传值账号需要签约返佣协议，用于isv商户。 **/
            // SysServiceProviderId:'2088****000',

            /** 花呗参数，传值前提：必须有该接口花呗收款准入条件，且需签约花呗分期 **/
            /** 指定可选期数，只支持3/6/12期，还款期数越长手续费越高 **/
            // HbFqNum:'3',

            /** 指定手续费承担方式，手续费可以由用户全承担（该值为0），也可以商户全承担（该值为100），但不可以共同承担，即不可取0和100外的其他值。 **/
            // HbFqSellerPercent:'0',
            //},
        },

        /** 异步通知地址，商户外网可以post访问的异步地址，用于接收支付宝返回的支付结果，如果未收到该通知可参考该文档进行确认：https://opensupport.alipay.com/support/helpcenter/193/201602475759 **/
        notifyUrl: '您的支付回调地址',

        /**第三方调用（服务商模式），传值app_auth_token后，会收款至授权token对应商家账号，如何获传值app_auth_token请参考文档：https://opensupport.alipay.com/support/helpcenter/79/201602494631 **/
        //appAuthToken:" ",   

        /**validateSign设置为true校验支付宝公钥是否正确； 如果不传递 默认为false**/
    }, { validateSign: true }).then(result => {

        /** 获取接口调用结果，如果调用失败，可根据返回错误信息到该文档寻找排查方案：https://opensupport.alipay.com/support/helpcenter/101 **/
        try {
            // 支付链接生成二维码图片
            var img = qr.image(result.qrCode, { type: 'png', size: 25 });
            const id = getRandomString(16) //生成id
            img.pipe(require('fs').createWriteStream(`./pay_img/${payType}/${id}.png`))//图片存入路径

            const img_url = `${config.domain}/pay_img/${payType}/${id}.png` //二维码图片链接 服务器如果不是https 要修改为http
            //删除图片
            setTimeout(() => {
                fs.unlink(`./pay_img/${payType}/${id}.png`, function (error) {
                    if (error) {
                        return false;
                    }
                })
            }, 300000)
            res.json({
                cood: 200,
                success: true,
                data: img_url,
                url: result.qrCode,
                token: token
            })
        } catch (error) {
            console.log(error)
            res.json({
                cood: 400,
                success: false,
                mesg: '错误信息'
            })
        }
    });
}
module.exports = {
    play
}