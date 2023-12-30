// 使用import语句代替require
import fetch from 'node-fetch';

export default async (req, res) => {
  const { name, suffix } = req.query;
  try {
    const response = await fetch(`https://whois.freeaiapi.xyz/?name=${name}&suffix=${suffix}`);
    if (response.ok) {
      const data = await response.json();
      res.status(200).json(data);
    } else {
      // It's better to return JSON in all cases for consistency
      res.status(response.status).json({ error: 'Error fetching data' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
