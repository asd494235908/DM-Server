const sql = require('../mysql.js')
const components = require('../components/components.js')//引入公用方法文件
const dayjs = require('dayjs');
const axios = require('axios')
function setSearchHot(val) {
    const str = `SELECT * FROM search_hot`
    const sql_a = sql.Select_Mysql_Data(str)
    sql_a.then((results) => {
        let hot = results
        let isAdd = false
        hot.forEach((item, index) => {
            if (item.search_name === val) {
                isAdd = true
                const str = `UPDATE search_hot SET num=${item.num + 1} WHERE id=${item.id}`
                const str_b = sql.Select_Mysql_Data(str)
                str_b.then(() => {
                    // console.log('跟新数据成功')
                }).catch(() => {
                    // console.log('跟新数据失败')
                })
            }
        })
        if (isAdd === false) {
            const a = `INSERT INTO search_hot(id, search_name) VALUES(NULL, '${val}')`
            const sql_c = sql.Insert_Mysql_Data(a)
            sql_c.then(() => {
                // console.log('储存成功')
            }).catch(() => {
                // console.log('储存失败')
            })
        }
    }).catch(() => { })
}
exports.city = function (req, res) {
    const url = 'https://restapi.amap.com/v3/config/district?keywords=&subdistrict=3&extensions=base&key=6dae34602eba34a1dffa8f63e47ed033'
    axios.get(url).then((data) => {
        let list = data.data.districts[0].districts
        res.json({
            cood: 200,
            success: true,
            data: list
        })
    }).catch((err) => {
        res.json({
            cood: 400,
            success: false,
        })
        // console.log(err)
    })
}
exports.homeData = function (req, res) {
    let data = {}
    const str = `SELECT * FROM swiper_img`
    const A_sql = sql.Select_Mysql_Data(str)
    A_sql.then((results) => {
        data.swiper = results

        const str1 = `SELECT * FROM hot_surface`
        const B_sql = sql.Select_Mysql_Data(str1)
        B_sql.then((resultsa) => {
            let hot = resultsa
            const str5 = `SELECT * FROM hot_list`
            const C_sql = sql.Select_Mysql_Data(str5)
            C_sql.then((resultsx) => {
                hot.forEach(element => {
                    element.list = []
                    resultsx.forEach(item => {
                        if (element.hot_id === item.hot_id) {
                            element.list.push(item)
                        }
                    })
                });
                const str3 = `SELECT * FROM sup`
                const D_sql = sql.Select_Mysql_Data(str3)
                D_sql.then((resultsc) => {
                    let sup = resultsc
                    const str9 = `SELECT * FROM suplistimg`
                    const E_sql = sql.Select_Mysql_Data(str9)
                    E_sql.then((resultsp) => {
                        sup.forEach(item => {
                            resultsp.forEach(o => {
                                if (item.spec_id === o.spec_id) {
                                    item.listImg = o
                                }
                            })
                        })
                    }).catch((err) => {
                        res.json({
                            cood: 400,
                            success: false,
                        })
                    })

                    const str4 = `SELECT * FROM suplist`
                    const F_sql = sql.Select_Mysql_Data(str4)
                    F_sql.then((resultsd) => {

                        const str8 = `SELECT * FROM supdetail`
                        const G_sql = sql.Select_Mysql_Data(str8)
                        G_sql.then((resultsi) => {
                            resultsd.forEach(item => {
                                resultsi.forEach(x => {
                                    if (item.detal_id === x.detal_id) {
                                        if (!item['size']) {
                                            item['size'] = []
                                        }
                                        item['size'].push(x)
                                    }
                                })
                            })
                            sup.forEach(element => {
                                element.list = []
                                resultsd.forEach(item => {
                                    if (element.spec_id === item.spec_id) {
                                        element.list.push(item)
                                    }
                                })

                            });
                            hot.forEach(item => {
                                sup.forEach(x => {
                                    if (item.hot_id === x.hot_id) {
                                        item.list.push(x)
                                    }
                                })
                            })
                            data.hot = hot
                            res.json({
                                cood: 200,
                                success: true,
                                data
                            })
                        }).catch((err) => {
                            res.json({
                                cood: 400,
                                success: false,
                            })
                        })
                    }).catch((err) => {
                        res.json({
                            cood: 400,
                            success: false,
                        })
                    })
                }).catch((err) => {
                    res.json({
                        cood: 400,
                        success: false,
                    })
                })
            }).catch((err) => {
                res.json({
                    cood: 400,
                    success: false,
                })
            })
        }).catch((err) => {
            res.json({
                cood: 400,
                success: false,
            })
        })
    }).catch((err) => {
        res.json({
            cood: 400,
            success: false,
        })
    })
}
exports.listgood = function (req, res) {
    let { val } = req.query
    const page = parseInt(req.query.page);//当前页数 2
    // const size = parseInt(req.query.size);//当前页数显示的个数 8
    const srot = parseInt(req.query.srot);//是否升降排序 1升序 -1 倒序
    const gt = parseInt(req.query.gt);//价格最小
    const lte = parseInt(req.query.lte);//价格最大
    const size = 8
    let str = `SELECT * FROM sup WHERE search LIKE '%${val}%'`;
    const sql_a = sql.Select_Mysql_Data(str)
    sql_a.then((resultsc) => {
        let sup = components.pagingtion(page, size, resultsc)
        const str9 = `SELECT * FROM suplistimg`
        const sql_b = sql.Select_Mysql_Data(str9)
        sql_b.then((resultsp) => {
            sup.forEach(item => {
                resultsp.forEach(o => {
                    if (item.spec_id === o.spec_id) {
                        item.listImg = o
                    }
                })
            })
        }).catch(() => {
            res.json({
                cood: 400,
                success: false,
            })
        })
        const str4 = `SELECT * FROM suplist`
        const sql_c = sql.Select_Mysql_Data(str4)
        sql_c.then((resultsd) => {
            const str8 = `SELECT * FROM supdetail`
            const sql_d = sql.Select_Mysql_Data(str8)
            sql_d.then((resultsi) => {
                resultsd.forEach(item => {
                    resultsi.forEach(x => {
                        if (item.detal_id === x.detal_id) {
                            if (!item['size']) {
                                item['size'] = []
                            }
                            item['size'].push(x)
                        }
                    })
                })
                sup.forEach(element => {
                    element.list = []
                    resultsd.forEach(item => {
                        if (element.spec_id === item.spec_id) {
                            element.list.push(item)
                        }
                    })

                });

                if (resultsc.length !== 0) {
                    setSearchHot(val)
                }
                if (srot === 1) {
                    sup = sup.sort(components.sortBy('price', false))
                } else if (srot === -1) {
                    sup = sup.sort(components.sortBy('price', true))
                }
                if (gt && lte) {
                    sup = components.section(sup, gt, lte)
                }
                res.json({
                    cood: 200,
                    success: true,
                    data: sup,
                    allData: resultsc.length
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
    }).catch(() => {
        res.json({
            cood: 400,
            success: false,
        })
    })
}
exports.navData = function (req, res) {
    const str = `SELECT * FROM nav`
    const sql_a = sql.Select_Mysql_Data(str)
    sql_a.then((results) => {
        const str1 = `SELECT * FROM nav_list`
        const sql_b = sql.Select_Mysql_Data(str1)
        sql_b.then((results1) => {
            const str2 = `SELECT * FROM nav_list_dtail`
            const sql_c = sql.Select_Mysql_Data(str2)
            sql_c.then((results2) => {
                results1.forEach(element => {
                    element.dtail_list = []
                    results2.forEach(item => {
                        if (element.dtail_id === item.dtail_id) {
                            element.dtail_list.push(item)
                        }
                    })
                });
                results.forEach(element => {
                    element.list = []
                    results1.forEach(item => {
                        if (element.nav_id === item.nav_id) {
                            element.list.push(item)
                        }
                    })
                });
                res.json({
                    success: true,
                    code: 200,
                    data: results
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
    }).catch(() => {
        res.json({
            cood: 400,
            success: false,
        })
    })
}
exports.search = function (req, res) {
    const { val } = req.query
    const str = `SELECT * FROM sup WHERE spu_title LIKE '%${val}%'`
    const sql_a = sql.Select_Mysql_Data(str)
    sql_a.then((resultsc) => {
        let sup = resultsc
        const str9 = `SELECT * FROM suplistimg`
        const sql_b = sql.Select_Mysql_Data(str9)
        sql_b.then((resultsp) => {
            sup.forEach(item => {
                resultsp.forEach(o => {
                    if (item.spec_id === o.spec_id) {
                        item.listImg = o
                    }
                })
            })
        }).catch(() => {
            res.json({
                cood: 400,
                success: false,
            })
        })
        const str4 = `SELECT * FROM suplist`
        const sql_c = sql.Select_Mysql_Data(str4)
        sql_c.then((resultsd) => {
            const str8 = `SELECT * FROM supdetail`
            const sql_d = sql.Select_Mysql_Data(str8)
            sql_d.then((resultsi) => {
                resultsd.forEach(item => {
                    resultsi.forEach(x => {
                        if (item.detal_id === x.detal_id) {
                            if (!item['size']) {
                                item['size'] = []
                            }
                            item['size'].push(x)
                        }
                    })
                })
                sup.forEach(element => {
                    element.list = []
                    resultsd.forEach(item => {
                        if (element.spec_id === item.spec_id) {
                            element.list.push(item)
                        }
                    })

                });
                if (resultsc.length !== 0) {
                    setSearchHot(val)
                }
                res.json({
                    cood: 200,
                    success: true,
                    data: sup,
                    allData: resultsc.length
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
    }).catch(() => {
        res.json({
            cood: 400,
            success: false,
        })
    })
}
exports.getSerchHot = function (req, res) {
    const str = `SELECT * FROM search_hot ORDER BY num DESC`
    const sql_a = sql.Select_Mysql_Data(str)
    sql_a.then((resultsc) => {
        res.json({
            cood: 200,
            success: true,
            data: resultsc.slice(0, 9)
        })

    }).catch(() => {
        res.json({
            cood: 400,
            success: false,
        })
    })
}
exports.getItem = function (req, res) {
    const { id } = req.body
    if (id === undefined) {
        res.json({
            cood: 400,
            success: false,
        })
        return
    }
    const str = `SELECT * FROM sup WHERE spec_id=${id}`
    const D_sql = sql.Select_Mysql_Data(str)
    D_sql.then((resultsc) => {
        let sup = resultsc
        const str9 = `SELECT * FROM suplistimg`
        const E_sql = sql.Select_Mysql_Data(str9)
        E_sql.then((resultsp) => {
            sup.forEach(item => {
                resultsp.forEach(o => {
                    if (item.spec_id === o.spec_id) {
                        item.listImg = o
                    }
                })
            })
        }).catch((err) => {
            res.json({
                cood: 400,
                success: false,
            })
        })

        const str4 = `SELECT * FROM suplist`
        const F_sql = sql.Select_Mysql_Data(str4)
        F_sql.then((resultsd) => {

            const str8 = `SELECT * FROM supdetail`
            const G_sql = sql.Select_Mysql_Data(str8)
            G_sql.then((resultsi) => {
                resultsd.forEach(item => {
                    resultsi.forEach(x => {
                        if (item.detal_id === x.detal_id) {
                            if (!item['size']) {
                                item['size'] = []
                            }
                            item['size'].push(x)
                        }
                    })
                })
                sup.forEach(element => {
                    element.list = []
                    resultsd.forEach(item => {
                        if (element.spec_id === item.spec_id) {
                            element.list.push(item)
                        }
                    })

                });
                res.json({
                    cood: 200,
                    success: true,
                    data: sup
                })
            }).catch((err) => {
                res.json({
                    cood: 400,
                    success: false,
                })
            })
        }).catch((err) => {
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
    // connection.query(str, function (error, resultsc, fields) {
    //     if (error) throw error;
    //     let sup = resultsc
    //     const str9 = `SELECT * FROM suplistimg WHERE spec_id=${id}`
    //     connection.query(str9, function (error, resultsp, fields) {
    //         if (error) throw error;
    //         sup.forEach(item => {
    //             resultsp.forEach(o => {
    //                 if (item.spec_id === o.spec_id) {
    //                     item.listImg = o
    //                 }
    //             })
    //         })
    //     })
    //     const str4 = `SELECT * FROM suplist`
    //     connection.query(str4, function (error, resultsd, fields) {
    //         if (error) throw error;
    //         const str8 = `SELECT * FROM supdetail`
    //         connection.query(str8, function (error, resultsi, fields) {
    //             if (error) throw error;
    //             resultsd.forEach(item => {
    //                 resultsi.forEach(x => {
    //                     if (item.detal_id === x.detal_id) {
    //                         if (!item['size']) {
    //                             item['size'] = []
    //                         }
    //                         item['size'].push(x)
    //                     }
    //                 })
    //             })
    //             sup.forEach(element => {
    //                 element.list = []
    //                 resultsd.forEach(item => {
    //                     if (element.spec_id === item.spec_id) {
    //                         element.list.push(item)
    //                     }
    //                 })

    //             });
    //             res.json({
    //                 cood: 200,
    //                 success: true,
    //                 data: sup
    //             })
    //         })

    //     })
    // })
}
exports.modifyUserInfo = function (req, res) {
    const { data } = req.body
    const str = `UPDATE users SET user_name='${data.user_name}',sex='${data.sex}',user_autograph='${data.user_autograph}',user_time='${data.user_time}' WHERE uid=${data.uid}`
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

}
exports.getHistory = function getHistory(req, res) {
    const { data } = req.body
    let sup = []
    data.forEach((item, index) => {
        const str = `SELECT * FROM sup WHERE id=${Number(item)}`
        const sql_a = sql.Select_Mysql_Data(str)
        sql_a.then((results) => {
            sup.push(results[0])
            if (index === data.length - 1) {
            }
        }).catch(() => { })
    })

    const str9 = `SELECT * FROM suplistimg`
    const sql_b = sql.Select_Mysql_Data(str9)
    sql_b.then((resultsp) => {
        sup.forEach(item => {
            resultsp.forEach(o => {
                if (item.spec_id === o.spec_id) {
                    item.listImg = o
                }
            })
        })
    }).catch(() => { })
    const str4 = `SELECT * FROM suplist`
    const sql_c = sql.Select_Mysql_Data(str4)
    sql_c.then((resultsd) => {
        const str8 = `SELECT * FROM supdetail`
        const sql_d = sql.Select_Mysql_Data(str8)
        sql_d.then((resultsi) => {
            resultsd.forEach(item => {
                resultsi.forEach(x => {
                    if (item.detal_id === x.detal_id) {
                        if (!item['size']) {
                            item['size'] = []
                        }
                        item['size'].push(x)
                    }
                })
            })
            sup.forEach(element => {
                element.list = []
                resultsd.forEach(item => {
                    if (element.spec_id === item.spec_id) {
                        element.list.push(item)
                    }
                })

            });
            res.json({
                cood: 200,
                success: true,
                data: sup,
                allData: sup.length
            })
        }).catch(() => {
            res.json({
                cood: 400,
                success: false,
            })
        })
    }).catch(() => {
        res.json({
            cood: 200,
            success: false,
        })
    })
}
exports.Donation = function Donation(req, res) {
    let { page, size, index } = req.body
    page = Number(page)
    size = Number(size)
    index = Number(index)

    const str = `SELECT * FROM orderdate ORDER BY time DESC`
    const sql_a = sql.back_Mysql_Data(str)
    sql_a.then((data) => {
        let newData = data.filter(item => item.type === 1 || item.type === 2)
        let num = newData.length

        newData.forEach(item => {
            item.time = dayjs(item.time).format('YYYY-MM-DD HH:mm:ss')
            item.play_time = dayjs(item.play_time).format('YYYY-MM-DD HH:mm:ss')
        })
        newData = components.Topagoingtion(page, size, newData)

        switch (index) {
            case 0:
                break;
            case 1:
                newData = newData.sort((a, b) => a.userNickName.localeCompare(b.userNickName, 'zh'))
                break;
            case 2:
                newData = newData.sort((a, b) => b.userNickName.localeCompare(a.userNickName, 'zh'))
                break;
            case 3:
                newData = newData.sort((a, b) => a.payType.localeCompare(b.payType, 'zh'))
                break;
            case 4:
                newData = newData.sort((a, b) => b.payType.localeCompare(a.payType, 'zh'))
                break;
            case 5:
                newData = newData.sort((a, b) => a.pirce - b.pirce)
                break;
            case 6:
                newData = newData.sort((a, b) => b.pirce - a.pirce)
                break;
            case 7:
                newData = newData.sort((a, b) => a.time < b.time ? 1 : -1)
                break;
            case 8:
                newData = newData.sort((a, b) => a.time < b.time ? -1 : 1)
                break;
            default:
                return
        }

        res.json({
            cood: 200,
            success: true,
            data: newData,
            total: num
        })
    }).catch((err) => {
        res.json({
            cood: 400,
            success: false,
        })
    })
}