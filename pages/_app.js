// pages/_app.js
import React from 'react';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
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
}

export default MyApp;
