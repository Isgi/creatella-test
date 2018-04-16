import React from 'react';

import './content.css';

const formatCurrency = (num) => {
  const formatDolar = '$' + Number(num).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  return formatDolar
}

const formatDate = (date) => {
  const today = new Date();
  const dateOfProduct = new Date(date);
  const timeDiff = Math.abs(dateOfProduct.getTime() - today.getTime());
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  if (diffDays > 7) {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return `${days[dateOfProduct.getDay()]}, ${dateOfProduct.getMonth()+1} ${dateOfProduct.getFullYear()}`;
  } else if(diffDays === 1) {
    return `${diffDays} day ago`
  }
  return `${diffDays} days ago`
}

export default (props) => (
  <div className="content">
    <div className="content-list">
      {props.products.map(product => (
        <div key={product.id} className="content-list-item">
          <div className="content-face" style={{fontSize: product.size}}>
            {product.face}
          </div>
          <div className="content-info">
            <h3 style={{color: '#444'}}>{formatCurrency(product.price)}</h3>
            <p style={{color: '#bebebe'}}>{formatDate(product.date)}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
)