const sql = require('../mysql.js') //引入mysql文件
const components = require('../components/components.js')//引入公用方法文件


exports.submitOrder = function submitOrder(req, res) {
    const { time, type, orid, uid, data, Address, userNickName } = req.body
    const id = components.getRandomString(28) //生成id
    const sentence = `INSERT INTO orderdate(id, type, time, oder_id, uid, address, phone, name, address_info,userNickName) VALUES('${id}', ${type}, '${time}', '${orid}' ,${uid},'${Address.address}','${Address.phone}','${Address.name}','${Address.address_info}','${userNickName}')`
    const sql_a = sql.Insert_Mysql_Data(sentence)
    sql_a.then((results) => {
        data.forEach((item) => {
            const sentence = `INSERT INTO order_list(id, oder_id, suplist_id, style, size ,price , suplist_num, uid, img, name,sup_id) 
    		VALUES(NULL, '${item.order_id}', ${item.suplist_id}, '${item.style}','${item.size}' ,${item.price} ,${item.suplist_num}, ${uid}, '${item.data[0].img_url1}' ,'${item.data[0].spu_title}',${item.sup_id})`
            const sql_b = sql.Insert_Mysql_Data(sentence)
            sql_b.then(() => { }).catch(() => { })
        })
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
exports.getOrder = function getOrder(req, res) {
    const { uid, order_id } = req.body

    let str;
    if (order_id === undefined) {
        str = `SELECT * FROM orderdate WHERE uid=${uid} ORDER BY time DESC`
    } else {
        str = `SELECT * FROM orderdate WHERE oder_id=${order_id} ORDER BY time DESC`
    }
    if (uid === undefined) {
        res.json({
            cood: 400,
            success: false,
        })
        return
    }
    const sql_a = sql.Select_Mysql_Data(str)
    sql_a.then((results) => {
        let order = results
        const str1 = `SELECT * FROM order_list WHERE uid=${uid}`
        const sql_b = sql.Select_Mysql_Data(str1)
        sql_b.then((resultsb) => {
            let order_list = resultsb
            order.forEach(item => {
                if (!item.data_list) {
                    item.data_list = []
                }
                order_list.forEach(list => {
                    if (item.oder_id === list.oder_id) {
                        item.data_list.push(list)
                    }
                })
            })
            res.json({
                cood: 200,
                success: true,
                data: order
            })
        }).catch(() => {
            res.json({
                cood: 400,
                success: false,
            })
        })
    }).catch(() => {
        res.json({
            cood: 400,
            success: false,
        })
    })
}
exports.getScrollOrder = function getScrollOrder(req, res) {
    const page = Number(req.body.page)
    const size = Number(req.body.size)
    const idx = Number(req.body.idx)
    const uid = req.body.uid
    const str = `SELECT * FROM orderdate WHERE uid=${uid} ORDER BY time DESC`
    const sql_a = sql.Select_Mysql_Data(str)
    sql_a.then((data) => {
        let newdata = data.filter(item => item.type === idx)
        let num = newdata.length
        newdata = components.Topagoingtion(page, size, newdata)
        const str1 = `SELECT * FROM order_list WHERE uid=${uid}`
        const sql1 = sql.Select_Mysql_Data(str1)
        sql1.then((results) => {
            let order_list = results
            newdata.forEach(item => {
                if (!item.data_list) {
                    item.data_list = []
                }
                order_list.forEach(list => {
                    if (item.oder_id === list.oder_id) {
                        item.data_list.push(list)
                    }
                })
            })
            res.json({
                cood: 200,
                success: true,
                data: newdata,
                allData: num
            })
        }).catch((err) => {
            res.json({
                cood: 400,
                success: false,
            })
        })

    }).catch(err => {
        res.json({
            cood: 400,
            success: false,
        })
    })
}
exports.dellOrder = function dellOrder(req, res) {
    const { data } = req.body
    const a = `DELETE FROM orderdate WHERE oder_id='${data.oder_id}'`
    const sql_a = sql.Dell_Mysql_Data(a)
    sql_a.then(() => {
        data.data_list.forEach(item => {
            const a = `DELETE FROM order_list WHERE id='${item.id}'`
            sql.mysqlSentenceb(a)
        })
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