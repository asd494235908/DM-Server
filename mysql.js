const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'www.dcmaomi.com',
    user: 'data',
    password: 'dc494235908',
    database: 'data'
});
connection.connect((err) => {
    if (err) throw err;
    console.log('连接mysql成功')
});
exports.mysqlSentenceb = function mysqlSentenceb(a) {
    const str = a;
    connection.query(str, function (error, results, fields) {
        if (error) throw error;
    });

}
exports.Up_Mysql_Data = function Dell_Mysql_Data(str) {
    return new Promise((resolve, reject) => {
        connection.query(str, function (error, results, fields) {
            if (error) throw error;
            // console.log(results)
            if (results.affectedRows !== 0) {
                resolve(results)
            } else {
                reject(undefined)

            }
        })
    })
}
exports.Delete_Mysql_Data = function Dell_Mysql_Data(str) {
    return new Promise((resolve, reject) => {
        connection.query(str, function (error, results, fields) {
            if (error) throw error;
            if (results.affectedRows === 1) {
                resolve(results)
            } else {
                reject(undefined)

            }
        })
    })
}
exports.Dell_Mysql_Data = function Dell_Mysql_Data(str) {
    return new Promise((resolve, reject) => {
        connection.query(str, function (error, results, fields) {
            if (error) throw error;
            if (results.affectedRows !== 0) {
                resolve(results)
            } else {
                reject(undefined)

            }
        })
    })
}
exports.Select_Mysql_Data = function Select_Mysql_Data(str) {
    return new Promise((resolve, reject) => {
        connection.query(str, function (error, results, fields) {
            if (error) {
                reject()
            } else {
                resolve(results)
            }

        })
    })
}
exports.Insert_Mysql_Data = function (str) {
    return new Promise((resolve, reject) => {
        connection.query(str, function (error, results, fields) {
            if (error) reject(error);
            if (results) {
                resolve(results)
            }
        })
    })
}
exports.back_Mysql_Data = function back_Mysql_Data(str) {
    return new Promise((resolve, reject) => {
        connection.query(str, function (error, results, fields) {
            if (error) throw error;
            if (results.length !== 0) {
                resolve(results)
            } else {
                reject(undefined)
            }
        })
    })
}
exports.back_Data = function back_Data(str) {
    return new Promise((resolve, reject) => {
        connection.query(str, function (error, results, fields) {
            if (error) { reject(error) }
            if (results.length === 0) {
                reject(results)
            } else {
                resolve(results)
            }
        })
    })
}
exports.back_orderData = function back_orderData(order_id) {
    return new Promise((resolve, reject) => {
        const str = `SELECT * FROM orderdate WHERE oder_id='${order_id}'`
        connection.query(str, function (error, results, fields) {
            if (error) throw error;
            let data = results.find(item => item.oder_id == order_id)
            if (data === undefined) {
                reject('未找到数据')
            } else if (data.type === 0) {
                resolve(data)
            } else {
                reject(data)
            }
        })

    })
}