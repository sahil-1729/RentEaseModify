import React, { useState } from 'react';

const AadharCardVerify = () => {
  const [aadharNo, setAadharNo] = useState('');
  const [message, setMessage] = useState('');

  const d = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
    [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
    [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
    [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
    [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
    [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
    [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
    [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
    [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
  ];

  const p = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
    [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
    [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
    [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
    [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
    [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
    [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]
  ];

  function validate(aadharNumber) {
    let c = 0;
    const invertedArray = aadharNumber.split('').map(Number).reverse();

    invertedArray.forEach((val, i) => {
      c = d[c][p[i % 8][val]];
    });

    return c === 0;
  }

  const verify = () => {
    if (validate(aadharNo)) {
      setMessage('Your Aadhar card number is valid');
    } else {
      setMessage('Your Aadhar card number is not valid');
    }
  };

  return (
    <div className="container">
      <div className="col-md-5" style={{ marginTop: '0px' }}>
        <div className="form-group">
          <label htmlFor="exampleInputAadharCard">Aadhar Card No.</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputAadharCard"
            placeholder="Enter Your Aadhar Card No."
            name="exampleInputAadharCard"
            value={aadharNo}
            onChange={(e) => setAadharNo(e.target.value)}
          />
          <small id="message" className="form-text text-muted">
            {message}
          </small>
        </div>
        <br/>
        <button type="button" className="btn btn-primary" onClick={verify}>
          Verify
        </button>
      </div>
    </div>
  );
};

export default AadharCardVerify;
