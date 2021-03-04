
//返回指定区间的随机数字
exports.randomNum_desc = function randomNum_desc(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum);
            break;
        default:
            return 0;
            break;
    }

}
//生成支付标识号
exports.randomNum = function randomNum() {
    let num = Math.floor(Math.random() * 1000000)
    return num
}
// 判断是否为移动设备
exports.getMachine = function getMachine(req) {
    var deviceAgent = req.headers["user-agent"].toLowerCase();
    var agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);
    if (agentID) {
        return "Mobile";
    } else {
        return "PC";
    }
}
// 返回数字
function letterNuber(x) {
    const num1 = Number(parseInt(x))
    return num1
}
//小于0的
function towNum(num) {
    return num < 10 ? '0' + num : num
}
// 返回秒

exports.alls = function alls(arr) {
    const oid = new Date()
    oid.setFullYear(arr[0], arr[1], arr[2])
    oid.setHours(arr[3])
    oid.setMinutes(arr[4])
    oid.setSeconds(arr[5])
    return oid.getTime()
}
// 数组字符串返回数组 数字类型
exports.arrnNuber = function (x) {
    const arr = []
    for (let i = 0; i < x.length; i++) {
        arr.push(letterNuber(x[i]))
    }
    return arr
}
exports.getTime = function () {
    let time = new Date()
    const year = time.getFullYear()
    const Month = time.getMonth() + 1
    const date = time.getDate()
    const Hours = time.getHours()
    const Minutes = time.getMinutes()
    const Seconds = time.getSeconds()
    return `${year}-${towNum(Month)}-${towNum(date)} ${towNum(Hours)}:${towNum(Minutes)}:${towNum(Seconds)}`
}
//获得随机颜色
exports.getRandomColor = function () {
    return '#' +
        (function (color) {
            return (color += '0123456789abcdef'[Math.floor(Math.random() * 16)])
                && (color.length == 6) ? color : arguments.callee(color);
        })('');
}
//初始化
exports.pagingtion = function pagingtion(page, size, allData) {
    // const maxItem = (page - 1) * size;
    // const newData = (maxItem + size) > allData.length ? allData.slice(maxItem, allData.length) : allData.slice(maxItem, size + maxItem)
    const maxItem = page * size
    const newData = maxItem > allData.length ? allData.slice(0, allData.length) : allData.slice(0, maxItem)
    return newData
};
//排序
exports.sortBy = function sortBy(attr, rev) {
    if (rev === undefined) {
        rev = 1
    } else {
        rev = rev ? 1 : -1
    }
    return function (a, b) {
        a = a[attr]
        b = b[attr]
        if (a < b) {
            return rev * -1
        }
        if (a > b) {
            return rev * 1
        }
        return 0
    }
}
//价格排序
exports.section = function section(arr, gt, lte) {
    return arr.filter(item => item.price >= gt && item.price <= lte)
}
exports.getRandomString = function getRandomString(n) {
    var str = "";
    while (str.length < n) {
        str += Math.random().toString(36).substr(2);
    }
    return str.substr(str.length - n)
}
exports.Topagoingtion = function Topagoingtion(page, size, allData) {

    const maxItem = (page - 1) * size;
    const newData = (maxItem + size) > allData.length ? allData.slice(maxItem, allData.length) : allData.slice(maxItem, size + maxItem)
    return newData
};