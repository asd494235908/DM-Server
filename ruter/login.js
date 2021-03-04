const axios = require('axios')
const sql = require('../mysql.js') //引入mysql文件
const components = require('../components/components.js')//引入公用方法文件
const jwt = require('jsonwebtoken')//引入jsonwebtoken
var svgCaptcha = require('svg-captcha');//验证码
const isValidate = false

//保存访问次数
visitLogIn = function (username, time, req, res) {
    const ip = req.ip.match(/\d+\.\d+\.\d+\.\d+/)
    if (ip === null || ip === undefined || ip === "") return
    const newtime = components.alls(components.arrnNuber(components.getTime().match(/\d+/g))) // 数组字符串返回数组 数字类型
    const ms = newtime - time
    const name = components.getMachine(req) // 判断是否为移动设备
    const device = req.headers['user-agent'] //设备信息
    const mobile = components.getMachine(req) // 判断是否为移动设备
    const nowTime = components.getTime()

    axios({
        url: 'https://www.tianqiapi.com/free/day?appid=47935549&appsecret=wAeXd8yf&ip=' + ip
    }).then(function (result) {
        const city = result.data.city || '未知'
        const str = `SELECT * FROM visit_list WHERE ip LIKE '%${ip}%'`
        const sql_a = sql.Select_Mysql_Data(str)
        sql_a.then((results) => {
            if (results.length !== 0) {
                let letterNum = Number(results[0].num) + 1
                const str2 = `UPDATE visit_list SET ms='${ms}', time='${nowTime}', num=${letterNum} ,mobile='${mobile}', device='${device}'  WHERE ip='${ip}'`
                const sql_b = sql.Select_Mysql_Data(str2)
                sql_b.then((data) => {
                }).catch(() => {
                })
            } else {
                const str1 = `INSERT INTO visit_list(id, user, ip, name, ms, time, city, num, mobile, device) VALUES(NULL, '${username}', '${ip}', '${name}','${ms}','${nowTime}','${city}',${1}, ${mobile}, '${device}')`
                const sql_c = sql.Insert_Mysql_Data(str1)
                sql_c.then(data => {
                    // console.log(data)
                }).catch(() => {
                })
            }
        }).catch(() => {
            console.log('查询数据库失败')
        })
    })

}
exports.qqlogin_mesg = function (req, res) {
    const list_res = res
    const appId = 101937754,
        appKey = '75011351f6d597dd5ab03a260eb90ad9',
        authCode = req.body.authCode,
        state = 'get_user_info',
        redirectUrl = encodeURIComponent(
            req.body.backurl
        );
    console.log(req.body.authCode, req.body.backurl)
    const url = `https://graph.qq.com/oauth2.0/token?grant_type=authorization_code&client_id=${appId}&client_secret=${appKey}&code=${authCode}&state=${state}&redirect_uri=${redirectUrl}`
    // console.log(req.query.code)
    axios({ url }).then((data) => {
        const str = data.data
        const res = str.match(/(?<=access_token=).*?(?=&)/)
        if (res[0] === null) {
            list_res.json({
                cood: 400,
                success: false,
            })
            return
        }
        let accessToken = res[0]
        const OpenID_url = `https://graph.qq.com/oauth2.0/me?access_token=${accessToken}`
        axios({ url: OpenID_url })
            .then((OpenID_callBack) => {
                const OpenID_callBack_str = OpenID_callBack.data
                const res_client_id = OpenID_callBack_str.match(/(?<="client_id":").*?(?=")/)
                const res_openid = OpenID_callBack_str.match(/(?<="openid":").*?(?=")/)
                const client_id = res_client_id[0]
                const openid = res_openid[0]
                const qqinfo_url = `https://graph.qq.com/user/get_user_info?access_token=${accessToken}&oauth_consumer_key=${client_id}&openid=${openid}`
                axios({ url: qqinfo_url }).then((qqinfo) => {
                    const nickName = qqinfo.data.nickname
                    const pic = qqinfo.data.figureurl_qq_2
                    list_res.json({
                        cood: 200,
                        success: true,
                        nickName,
                        pic
                    })
                }).catch((err) => {
                    list_res.json({
                        cood: 400,
                        success: false,
                    })
                })

            })
            .catch((err) => {
                list_res.json({
                    cood: 400,
                    success: false,
                })
            })

    }).catch((err) => {
        list_res.json({
            cood: 400,
            success: false,
        })
    })
}
exports.submit_mesg = function (req, res) {
    const nickename = req.body.nickename,
        pic = req.body.pic,
        mesg = req.body.mesg
    const str = `INSERT INTO mesg(id, nickename, pic, mesg) VALUES(NULL, '${nickename}', '${pic}', '${mesg}')`
    const sql_A = sql.Insert_Mysql_Data(str)
    sql_A.then(() => {
        res.json({
            cood: 200,
            success: true,
        })
    }).catch(() => {
        res.json({
            cood: 400,
            success: false,
        })
    })
}
exports.login = function (req, res) {
    // console.log(req.body)
    const {
        username,
        pwd
    } = req.body.userInfo
    if (username === undefined || pwd === undefined || username === "" || pwd === "") {
        res.json({
            message: '账号密码有误',
            success: false,
            isValidate,
        })
        return
    }

    const time = components.alls(components.arrnNuber(components.getTime().match(/\d+/g)))

    const str = `SELECT * FROM users WHERE username='${username}'`
    const sql_A = sql.Select_Mysql_Data(str)
    sql_A.then((results) => {
        if (results[0] === undefined) {
            res.json({
                message: '账号密码有误',
                success: false,
                isValidate,
            })
            visitLogIn(username, time, req, res)
        } else {
            const {
                id,
                username,
                password,
                uid,
                userinfo,
                add,
                dell
            } = results[0]
            visitLogIn(username, time, req, res)
            if (pwd === password) {
                const str = `SELECT * FROM user_address WHERE uid=${uid}`
                const sql_b = sql.Select_Mysql_Data(str)
                sql_b.then((resultsa) => {
                    results[0].address = resultsa
                    const stra = `SELECT * FROM user_cart WHERE uid=${uid}`
                    const sql_c = sql.Select_Mysql_Data(stra)
                    sql_c.then((resultsb) => {
                        if (resultsb.length === 0) {
                            results[0].user_cart = resultsb
                            results[0].password = ''
                            res.json({
                                token: jwt.sign({
                                    id: id,
                                    username: username,
                                    uid: uid,
                                    userinfo: userinfo,
                                    add: add,
                                    dell: dell
                                }, 'abcd', {
                                    expiresIn: "3000s"
                                }),
                                code: 200,
                                success: true,
                                isValidate,
                                data: results[0]
                            })
                        } else {
                            resultsb.forEach((item, index) => {
                                item.data = {}
                                const stra = `SELECT * FROM suplist WHERE id=${item.suplist_id}`
                                const sql_d = sql.Select_Mysql_Data(stra)
                                sql_d.then((resultsc) => {
                                    item.data = resultsc
                                    results[0].user_cart = resultsb
                                    if (resultsb.length - 1 === index) {

                                        res.json({
                                            token: jwt.sign({
                                                id: id,
                                                username: username,
                                                uid: uid,
                                                userinfo: userinfo,
                                                add: add,
                                                dell: dell
                                            }, 'abcd', {
                                                expiresIn: "3000s"
                                            }),
                                            code: 200,
                                            success: true,
                                            isValidate,
                                            data: results[0]
                                        })
                                        visitLogIn(username, time, req, res)
                                    }
                                }).catch((err) => {
                                    // console.log(err)
                                    res.json({
                                        message: '账号密码有误',
                                        isValidate,
                                        success: false
                                    })
                                })
                            })
                        }

                    }).catch((err) => {
                        // console.log(err)
                        res.json({
                            message: '账号密码有误',
                            isValidate,
                            success: false
                        })
                    })
                }).catch((err) => {
                    // console.log(err)
                    res.json({
                        message: '账号密码有误',
                        isValidate,
                        success: false
                    })
                })


            } else {
                res.json({
                    message: '账号密码有误',
                    isValidate,
                    success: false
                })
            }
        }
    }).catch((err) => {
        // console.log(err)
        res.json({
            message: '账号密码有误',
            isValidate,
            success: false
        })
    })
}
exports.validate = function (req, res) {
    let token = req.headers.token || req.headers.authorization;
    jwt.verify(token, 'abcd', function (err, decode) {
        if (err) {
            // console.log(err)

            res.json({
                code: 400,
                msg: '当前用户未登录',
                isValidate,
                success: false
            })
        } else {
            const str = `SELECT * FROM users WHERE username='${decode.username}'`
            const sql_a = sql.Select_Mysql_Data(str)
            sql_a.then((results) => {
                const str = `SELECT * FROM user_address WHERE uid=${decode.uid}`
                const sql_b = sql.Select_Mysql_Data(str)
                sql_b.then((resultsa) => {

                    results[0].address = resultsa
                    const stra = `SELECT * FROM user_cart WHERE uid=${decode.uid}`
                    const sql_c = sql.Select_Mysql_Data(stra)
                    sql_c.then((resultsb) => {
                        if (resultsb.length === 0) {
                            results[0].user_cart = resultsb
                            results[0].password = ''
                            res.json({
                                token: jwt.sign({
                                    id: decode.id,
                                    username: decode.username,
                                    uid: decode.uid,
                                    userinfo: decode.userinfo,
                                    add: decode.add,
                                    dell: decode.dell
                                }, 'abcd', {
                                    expiresIn: "3000s"
                                }),
                                code: 200,
                                success: true,
                                isValidate,
                                data: results[0]
                            })
                        } else {
                            resultsb.forEach((item, index) => {
                                item.data = {}
                                const stra = `SELECT * FROM suplist WHERE id=${item.suplist_id}`
                                const sql_d = sql.Select_Mysql_Data(stra)
                                sql_d.then((resultsc) => {
                                    item.data = resultsc
                                    results[0].user_cart = resultsb
                                    results[0].password = ''
                                    if (resultsb.length - 1 === index) {
                                        res.json({
                                            token: jwt.sign({
                                                id: decode.id,
                                                username: decode.username,
                                                uid: decode.uid,
                                                userinfo: decode.userinfo,
                                                add: decode.add,
                                                dell: decode.dell
                                            }, 'abcd', {
                                                expiresIn: "12000s"
                                            }),
                                            code: 200,
                                            success: true,
                                            isValidate,
                                            data: results[0]
                                        })
                                    }
                                }).catch(() => {
                                    console.log(1)
                                    res.json({
                                        code: 400,
                                        msg: '当前用户未登录',
                                        isValidate,
                                        success: false
                                    })
                                })
                            })
                        }
                    }).catch(() => {
                        res.json({
                            code: 400,
                            msg: '当前用户未登录',
                            isValidate,
                            success: false
                        })
                    })
                }).catch(() => {
                    res.json({
                        code: 400,
                        msg: '当前用户未登录',
                        isValidate,
                        success: false
                    })
                })
            }).catch(() => {
                res.json({
                    code: 400,
                    msg: '当前用户未登录',
                    isValidate,
                    success: false
                })
            })
        }
    })
}
exports.Otherlogins = function (req, res) {
    const { id, name, img } = req.body
    const time = components.alls(components.arrnNuber(components.getTime().match(/\d+/g)))
    const str = `SELECT * FROM users WHERE username='${id}'`
    const sql_a = sql.Select_Mysql_Data(str)
    sql_a.then((results) => {
        if (results[0] === undefined) {
            //储存id
            const str = 'select MAX(uid)FROM users'
            const sql_b = sql.Select_Mysql_Data(str)
            sql_b.then((results) => {
                let uid = results[0]['MAX(uid)']
                const sentence = `INSERT INTO users(id, username, uid, user_name, user_img) VALUES(NULL, '${id}',${uid + 1}, '${name}', '${img}')`
                const sql_c = sql.Insert_Mysql_Data(sentence)
                sql_c.then((results) => {
                    const str = `SELECT * FROM users WHERE username='${id}'`
                    const sql_d = sql.Select_Mysql_Data(str)
                    sql_d.then((results) => {
                        const {
                            id,
                            username,
                            password,
                            uid,
                            userinfo,
                            add,
                            dell
                        } = results[0]
                        visitLogIn(username, time, req, res)
                        const str = `SELECT * FROM user_address WHERE uid=${uid}`
                        const sql_e = sql.Select_Mysql_Data(str)
                        sql_e.then((resultsa) => {
                            results[0].address = resultsa
                            const stra = `SELECT * FROM user_cart WHERE uid=${uid}`
                            const sql_f = sql.Select_Mysql_Data(stra)
                            sql_f.then((resultsb) => {
                                if (resultsb.length === 0) {
                                    results[0].user_cart = resultsb
                                    res.json({
                                        token: jwt.sign({
                                            id: id,
                                            username: username,
                                            uid: uid,
                                            userinfo: userinfo,
                                            add: add,
                                            dell: dell
                                        }, 'abcd', {
                                            expiresIn: "3000s"
                                        }),
                                        code: 200,
                                        success: true,
                                        isValidate,
                                        data: results[0]
                                    })
                                } else {
                                    resultsb.forEach((item, index) => {
                                        item.data = {}
                                        const stra = `SELECT * FROM suplist WHERE id=${item.suplist_id}`
                                        const sql_g = sql.Select_Mysql_Data(stra)
                                        sql_g.then((resultsc) => {
                                            item.data = resultsc
                                            results[0].user_cart = resultsb
                                            if (resultsb.length - 1 === index) {
                                                res.json({
                                                    token: jwt.sign({
                                                        id: id,
                                                        username: username,
                                                        uid: uid,
                                                        userinfo: userinfo,
                                                        add: add,
                                                        dell: dell
                                                    }, 'abcd', {
                                                        expiresIn: "3000s"
                                                    }),
                                                    code: 200,
                                                    success: true,
                                                    isValidate,
                                                    data: results[0]
                                                })
                                            }
                                        }).catch(() => {
                                            res.json({
                                                message: '账号密码有误',
                                                success: false,
                                                isValidate,
                                            })
                                        })
                                    })
                                }
                            }).catch(() => { })
                        }).catch(() => {
                            res.json({
                                message: '账号密码有误',
                                success: false,
                                isValidate,
                            })
                        })
                    }).catch(() => {
                        res.json({
                            message: '账号密码有误',
                            success: false,
                            isValidate,
                        })
                    })
                }).catch(() => {
                    res.json({
                        message: '账号密码有误',
                        success: false,
                        isValidate,
                    })

                })
            }).catch(() => {
                res.json({
                    message: '账号密码有误',
                    success: false,
                    isValidate,
                })
            })

        } else {
            const {
                id,
                username,
                password,
                uid,
                userinfo,
                add,
                dell
            } = results[0]
            visitLogIn(username, time, req, res)
            const str = `SELECT * FROM user_address WHERE uid=${uid}`
            const sql_h = sql.Select_Mysql_Data(str)
            sql_h.then((resultsa) => {
                results[0].address = resultsa
                const stra = `SELECT * FROM user_cart WHERE uid=${uid}`
                const sql_i = sql.Select_Mysql_Data(stra)
                sql_i.then((resultsb) => {
                    if (resultsb.length === 0) {
                        results[0].user_cart = resultsb
                        res.json({
                            token: jwt.sign({
                                id: id,
                                username: username,
                                uid: uid,
                                userinfo: userinfo,
                                add: add,
                                dell: dell
                            }, 'abcd', {
                                expiresIn: "3000s"
                            }),
                            code: 200,
                            success: true,
                            isValidate,
                            data: results[0]
                        })
                    } else {
                        resultsb.forEach((item, index) => {
                            item.data = {}
                            const stra = `SELECT * FROM suplist WHERE id=${item.suplist_id}`
                            const sql_j = sql.Select_Mysql_Data(stra)
                            sql_j.then((resultsc) => {
                                item.data = resultsc
                                results[0].user_cart = resultsb
                                if (resultsb.length - 1 === index) {
                                    res.json({
                                        token: jwt.sign({
                                            id: id,
                                            username: username,
                                            uid: uid,
                                            userinfo: userinfo,
                                            add: add,
                                            dell: dell
                                        }, 'abcd', {
                                            expiresIn: "3000s"
                                        }),
                                        code: 200,
                                        success: true,
                                        isValidate,
                                        data: results[0]
                                    })
                                }
                            }).catch(() => {
                                res.json({
                                    message: '账号密码有误',
                                    success: false,
                                    isValidate,
                                })
                            })
                        })
                    }
                }).catch(() => {
                    res.json({
                        message: '账号密码有误',
                        success: false,
                        isValidate,
                    })
                })
            }).catch(() => {
                res.json({
                    message: '账号密码有误',
                    success: false,
                    isValidate,
                })
            })
        }
    }).catch(() => {
        res.json({
            message: '账号密码有误',
            success: false,
            isValidate,
        })
    })
}
exports.verification = function (req, res) {
    const cap = svgCaptcha.createMathExpr({
        mathMin: 1,
        mathMax: 9,
        noise: 3,
        background: components.getRandomColor(),
        color: true,
        width: 150,
        height: 36
    })
    res.send(cap);
}