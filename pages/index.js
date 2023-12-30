// pages/index.js
import Head from 'next/head';
import { useState } from 'react';
import Router from 'next/router';

const HomePage = () => {
  const [domain, setDomain] = useState('');
  const [result, setResult] = useState('');

  const fetchWhoisData = async (domainName) => {
    console.log('Fetching data for:', domainName); // 确认函数被调用
    // 检查localStorage中是否有缓存数据
    const cachedData = localStorage.getItem(domainName);
    console.log('Cached data:', cachedData); // 检查是否检索到缓存数据
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      const oneDay = 24 * 60 * 60 * 1000; // 毫秒数
      // 检查缓存是否还有效
      if (new Date().getTime() - timestamp < oneDay) {
        console.log(`Using cached data for domain: ${domainName}`);
        setResult(`Domain is registered. Registration Date: ${data.creation_datetime}`);
        return; // 有有效缓存时，不需要查询接口
      }
    }
    // 没有缓存或缓存过期，查询接口
    try {
      const response = await fetch(`/api/proxy?name=${domainName}&suffix=com`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Data fetched from API:', data); // 确认API响应数据
      if (data.available === false) {
        console.log('Storing data to Local Storage'); // 确认数据存储操作
        // 将结果及当前时间戳存储到localStorage
        localStorage.setItem(domainName, JSON.stringify({ data, timestamp: new Date().getTime() }));
        const testCache = localStorage.getItem(domainName);
        console.log('Test cache after setting:', testCache); // 应该显示刚存入的数据
        setResult(`Domain is registered. Registration Date: ${data.creation_datetime}`);
      } else {
        setResult("Domain is not registered.");
      }
    } catch (error) {
      console.error('Error:', error);
      setResult(`An error occurred: ${error.message}`);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/proxy?name=${domain}&suffix=com`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // 使用Router来导航到结果页面，并传递查询参数
      Router.push({
        pathname: '/result',
        query: {
          domain,
          registered: !data.available,
          registrationDate: data.creation_datetime,
        },
      });
    } catch (error) {
      console.error('Error:', error);
      // 在这里处理错误，例如设置状态显示错误信息
    }
  };

  return (
    <>
      <Head>
        <title>Domain Checker</title>
      </Head>
      <div className="container">
        <h1>Domain Checker</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="domainName">Enter Domain Name:</label>
          <input
            type="text"
            id="domainName"
            name="domainName"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            required
          />
          <button type="submit">Check</button>
        </form>
        <div id="result">{result}</div>
      </div>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: Arial, sans-serif;
        }

        * {
          box-sizing: border-box;
        }

        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          text-align: center;
        }
      `}</style>
    </>
  );
};

export default HomePage;
