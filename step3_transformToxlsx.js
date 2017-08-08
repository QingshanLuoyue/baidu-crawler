var xlsx = require('node-xlsx');
var fs = require('fs');
var tmpData;
var solveData = [];
var keyWordArr = ['金融', '互联网', '直播', '社交'];

var readTxt = fs.readFileSync('./data/baiduData.txt', 'utf-8');
tmpData = readTxt.toString().split('\n');
for (var i = 0; i < tmpData.length; i++) {
    var solveUrl = tmpData[i].split('[,]');
    var currKeyList = [];
    if (solveUrl.length === 1) {
        break;
    }
    for (var j = 0; j < keyWordArr.length; j++) {
        if (solveUrl[1].indexOf(keyWordArr[j]) > -1) {
            currKeyList.push(keyWordArr[j]);
        }
    }
    solveUrl[3] = solveUrl[3].match(/(https:\/\/|http:\/\/|)(\w|\.|-)+(\/|)/)[0]; // 处理网址
    solveUrl.push(currKeyList.join(','));
    solveData.push(solveUrl)
}
// console.log(solveData)

var filePath = './data/baidu.xlsx';
writeToexcel(solveData)


// 写进excel文件
function writeToexcel(data) {
    var xlsxHead = ['序号', '标题', '时间', '网址', '关键词'];
    data.unshift(xlsxHead);
    console.log(data)
    var buffer = xlsx.build([{
        name: 'sheet1',
        data: data
    }]);
    //将文件内容插入新的文件中
    fs.writeFileSync(filePath, buffer, { 'flag': 'w' });
    // fs.writeFileSync('langrensha-back.xlsx',buffer,{'flag':'w'});
    console.log('已经将转换过后的文本数据写入' + filePath + '文件！');
}