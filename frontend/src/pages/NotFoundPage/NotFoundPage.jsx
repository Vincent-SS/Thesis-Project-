import React from 'react';
import { Button } from '@mui/material';

const NotFoundPage = () => {
  return (
    <div>
      NotFound Page
      <Button variant="contained" onClick={() => { window.location.href = '#'; }}>
        Add
      </Button>
    </div>
  )
};

export default NotFoundPage;
