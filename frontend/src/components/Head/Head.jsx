import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import './head.css'

const Head = () => {
  return (
    <div className="container">
      <div className="content">
        <h1>Text Mining for U.S Stock Market Forecasting</h1>
        <h2>a simple Text Mining visualisation tool</h2>
      </div>
      <HomeIcon onClick={() => window.location.href="/input"} className="homeIcon" />
    </div>
  )
}

export default Head;