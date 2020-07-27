- jquery.query-object.js
```javascript
// 例如 当前你的URL是：
var url ='http://www.xxx.com/index.php?test=1&kk=2'

// 如果想获取test，则可以引入插件后，
// 用如下方法获取：
var test = $.query.get('test');

// 如果参数有多个相同的名称 ，则可以这样：
var arr = $.query.get('testy');
// 输出：  [ 值1 ,  值2,  值3...]

// 如果要获取多个相同名称中的某一个，可以这样：
var arrayElement = $.query.get('testy[1]');

// 此插件不仅能获取参数，也能设置参数。

// 设置一个参数：
var newUrl = $.query.set("section", 5).toString();
// 输出  ： "?section=5"

// 设置两个参数：
var newUrl1 = $.query.set("section", 5).set("action", "do").toString();
// 输出 :  "?action=do&section=5"

// 删除一个参数：
var oldQueryAgain = $.query.REMOVE("type");

// 清空所有参数：
var emptyQuery = $.query.empty();

// 复制所有参数：
var stillTheSame = $.query.copy();
```