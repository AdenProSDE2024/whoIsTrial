// pages/api/proxy.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { name, suffix } = req.query;

  try {
    const apiResponse = await fetch(`https://whois.freeaiapi.xyz/?name=${name}&suffix=${suffix}`);
    if (apiResponse.ok) {
      const data = await apiResponse.json();
      res.status(200).json(data);
    } else {
      // 如果API响应不是OK的，就直接将状态码和状态文本发送回客户端
      res.status(apiResponse.status).text(apiResponse.statusText);
    }
  } catch (error) {
    // 在服务器端记录错误，并发送错误响应
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
