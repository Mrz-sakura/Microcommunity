const validateData = (data = {}, arr = []) => {
    for (let i = 0; i < arr.length; i++) {
        const current = arr[i]
        if (current.reg) {
            if (current.reg === 'email') {
                const emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
                if (!emailReg.test(data[current.key])) {
                    return current.msg
                }
            }
        } else if (!data[current.key]) {
            return current.msg
        }
    }
    return false
}
module.exports = {
    validateData
}
