const sql = require('../mysql.js') //引入mysql文件
const components = require('../components/components.js')//引入公用方法文件
exports.GoodItem = function (req, res) {
    const { isWeb, isAdd, id, uid, data } = req.body
    if (isAdd) {

        let sentence
        if (isWeb) {
            sentence = `INSERT INTO user_cart(id, suplist_id, suplist_num, uid, size, price, style, sup_id) VALUES(NULL, ${data.suplist_id}, ${data.suplist_num}, ${uid} ,'${data.size}' ,${data.price} ,'${data.style}', ${data.sup_id})`
        } else {
            sentence = `INSERT INTO user_cart(id, suplist_id, suplist_num, uid, size, price, style, sup_id) VALUES(NULL, ${id}, ${data.num}, ${uid} ,'${data.size}' ,${data.price} ,'${data.list}', ${data.sup_id})`
        }
        const sql_a = sql.Insert_Mysql_Data(sentence)
        sql_a.then(() => {
            res.json({
                cood: 200,
                success: true
            })
        }).catch(() => {
            res.json({
                cood: 400,
                success: false
            })
        })


    } else {
        data.forEach(item => {
            const str = `DELETE FROM user_cart WHERE id=${item.id}`

            const sql_b = sql.Dell_Mysql_Data(str)
            sql_b.then(() => {
                res.json({
                    cood: 200,
                    success: true
                })
            }).catch(() => {
                res.json({
                    cood: 400,
                    success: false
                })
            })
        })

    }
}
exports.dellGoodItem = function dellGoodItem(req, res) {
    const { isWeb, isAdd, uid, data } = req.body
    if (isWeb === true) {
        if (isAdd === false) {
            const str = `DELETE FROM user_cart WHERE id=${data.id}`
            const isSucc = sql.Dell_Mysql_Data(str)
                .then(() => {
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
    }
}
// "parameters": [
//     {
//         "name": "id",
//         "in": "body",
//         "description": "提交用户订单",
//         "required": true,
//         "type": "object",
//         "schema": {
//             "properties": {
//                 "time": {
//                     "type": "string"
//                 },
//                 "orid": {
//                     "type": "string"
//                 },
//                 "type": {
//                     "type": "number"
//                 },
//                 "uid": {
//                     "type": "number"
//                 },
//                 "userNickName": {
//                     "type": "string"
//                 },
//                 "Address": {
//                     "type": "object",
//                     "properties": {
//                         "address": {
//                             "type": "string"
//                         },
//                         "phone": {
//                             "type": "string"
//                         },
//                         "name": {
//                             "type": "string"
//                         },
//                         "address_info": {
//                             "type": "string"
//                         }
//                     }
//                 },
//                 "data": {
//                     "type": "Array",
//                     "items": {
//                         "type": "object",
//                         "id": {
//                             "type": "number"
//                         }
//                     }
//                 }
//             }
//         }
//     }
// ],