import React from 'react';
// import TextField from '@mui/material/TextField';
import './InputBox.css';

const ID = () => {
  return (
    <div className="int-area">
      <input type="text" name="username" id="username" autoComplete="off" required onInput="this.value = this.value.replace(/[^a-zA-Z0-9.]/g, '').replace(/(\..*)\./g, '$1');" />
      <label htmlFor="id">ID</label>
    </div>
  );
};

export default ID;
