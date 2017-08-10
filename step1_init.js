var fs = require('fs');

function writeToTxt() {
    fs.writeFileSync('./data/baidu.txt', '');
    fs.writeFileSync('./record.txt', '');
    console.log('baidu.txt/record.txt 已经置空完毕！接下来请执行 phantomjs step2_baidusearch.js获取数据');
}
writeToTxt();