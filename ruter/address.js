const sql = require('../mysql.js') //引入mysql文件
const components = require('../components/components.js')//引入公用方法文件
function orderAddress(data, id) {
    if (id === null || id === undefined) return
    const str = `UPDATE orderdate SET address='${data.address}',phone='${data.phone}',name='${data.name}' WHERE oder_id=${id}`
    const sql_a = sql.Up_Mysql_Data(str)
    sql_a.then(() => { }).catch(() => { })
}
function initAddress(data) {
    const str = `UPDATE user_address SET difall=${1} WHERE uid=${data.uid}`
    const sql_a = sql.Up_Mysql_Data(str)
    sql_a.then(() => { }).catch(() => { })
}
exports.subAddress = function subAddress(req, res) {
    const { data, order_id } = req.body
    //判断是否修改地址，修改地址就有ID 添加地址就没有ID
    if (data.id !== null) {
        //判断是否设置未默认地址 是默认地址初始化地址默认状态
        if (data.difall === 0) {
            initAddress(data)
        }
        //修改订单的地址
        orderAddress(data, order_id)
        const str = `UPDATE user_address SET uid=${data.uid},address='${data.address}',phone='${data.phone}',name='${data.name}',difall=${data.difall},address_info='${data.address_info}' WHERE id=${data.id}`
        const sql_a = sql.Up_Mysql_Data(str)
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
        //判断是否设置未默认地址 是默认地址初始化地址默认状态
        if (data.difall === 0) {
            initAddress(data)
        }
        //修改订单的地址
        orderAddress(data, order_id)
        const str = `INSERT INTO user_address(id, uid, address, phone, name, difall, address_info) VALUES(NULL, ${data.uid}, '${data.address}', '${data.phone}', '${data.name}', ${data.difall},'${data.address_info}')`
        const sql_b = sql.Insert_Mysql_Data(str)
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

    }
}
exports.dellAddress = function dellAddress(req, res) {
    const { data } = req.body
    const str = `DELETE FROM user_address WHERE id=${data.id}`
    const sql_a = sql.Delete_Mysql_Data(str)
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
}