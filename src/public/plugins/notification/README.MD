```javascript
// 配置参数
GrowlNotification.notify({
    width:'100%', // 宽度 默认Null 
    zIndex:1056, // 层级 默认1056
    margin: 20,
    type: 'alert', // 类型 默认 alert, success, error, warning, info
    position:'top-right', // 位置 top-left, top-right, bottom-left, bottom-right, top-center, bottom-center
    title: '',
    description: '',
    image: {
        visible: false, // 显示隐藏图片
        customImage: '' // 自定义图片的路径
    },
    closeTimeout: 0, // 延迟关闭对话框的时间，单位毫秒。
    closeWith: ['click', 'button'], // click, button
    animation: {
        open: 'slide-in', // 如果是 string, 表示使用css类名. 如果是false|null|'none', 不会使用动画效果。 'slide-in', 'fade-in'
        close: 'slide-out' // 同上
    },
    animationDuration: .2,
    showBorder: false,
    showButtons: false,
    buttons: {
        action: {
            text: 'Ok',
            callback: function() {}
        },
        cancel: {
            text: 'Cancel',
            callback: function() {}
        }
    },
    showProgress: false  // 	显示或隐藏进度条
});                 
GrowlNotification.setGlobalOptions({}) // 设置全局参数
GrowlNotification.closeAll() // 关闭所有消息框
```
