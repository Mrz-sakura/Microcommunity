const sequelize = require('../config/db')
require('./index')
sequelize.authenticate()
    .then(() => {
        console.log('连接成功------>')
        console.log('开始同步------>')
    })
    .catch(e => {
        console.log('连接失败')
    })


sequelize.sync({alter: true})
    .then(() => {
        console.log('同步成功----->')
        setTimeout(() => {
            console.log('进程退出----->')
            process.exit()
        }, 1000)
    })
