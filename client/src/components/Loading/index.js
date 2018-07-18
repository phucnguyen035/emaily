import React from 'react';
import Loader from './Loading.gif';

const Loading = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
    <img src={Loader} alt="loading" />
  </div>
);

export default Loading;
