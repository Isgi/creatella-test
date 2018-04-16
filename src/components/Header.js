import React from 'react';

import './header.css';

export default (props) => (
  <header className="header">
    <div className="header-left">
      <h1 className="logo">P</h1>
      <h1 className="title">Catalogue</h1>
    </div>
    <div>
      <div className="button-sort">
        <p>Sort</p>
        <div className="dropdown-sort">
          <div className="triangle" />
          <div onClick={()=>props.onChangeSort('size')} className="list-item" style={{background: props.sort === 'size' ? '#f8f8f8' : null}}>Size</div>
          <div onClick={()=>props.onChangeSort('price')} className="list-item" style={{background: props.sort === 'price' ? '#f8f8f8' : null}}>Price</div>
          <div onClick={()=>props.onChangeSort('id')} className="list-item" style={{background: props.sort === 'id' ? '#f8f8f8' : null}}>Id</div>
        </div>
      </div>
    </div>
  </header>
)