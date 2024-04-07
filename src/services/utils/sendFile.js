const http = require('http');  
const fs = require('fs');  
const path = require('path');  
  
// 接收文件的URL  
const fileUrl = 'http://example.com/upload';  
  
// 要发送的文件的路径  
const filePath = path.join(__dirname, 'file-to-send.txt');  
  
// 读取文件内容  
const fileContent = fs.readFileSync(filePath);  
  
// 设置请求头  
const requestHeaders = {  
  'Content-Type': 'application/octet-stream', // 根据文件类型设置合适的 Content-Type  
  'Content-Length': fileContent.length  
};  
  

const requestOptions = {  
  hostname: 'example.com', // 接收文件的服务器主机名  
  port: 80, // 端口号，如果是 HTTPS 则使用 443  
  path: '/upload', // 路径  
  method: 'POST', // 请求方法，通常是 POST 用于上传文件  
  headers: requestHeaders  
};  
  
// 创建请求对象  
const req = http.request(requestOptions, (res) => {  
  // 处理响应数据  
  let data = '';  
  
  res.on('data', (chunk) => {  
    data += chunk;  
  });  
  
  res.on('end', () => {  
    console.log(`Response from server: ${data}`);  
  });  
});  
  
// 处理请求错误  
req.on('error', (error) => {  
  console.error(`Problem with request: ${error.message}`);  
});  
  
// 发送文件内容  
req.write(fileContent);  
req.end();