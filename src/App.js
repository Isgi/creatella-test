import React, { Component } from 'react';

import Header from './components/Header';
import Content from './components/Content';
import loader from './loader.svg';
import './app.css';
import { height } from 'window-size';

const baseUrl = 'http://localhost:3000';

class App extends Component {

  constructor() {
    super();
    this.state = {
      products: [],
      isLoading: false,
      contentHeight: 0,
      sort: 'size',
      endOfCatalogue: false
    }
    this.page = 1;
    this.totalProducts= 0;
  }

  componentDidMount() {
    this.getProducts(this.page, this.state.sort);
    this.refs.content.addEventListener("scroll", this.handleLoadMore);
  }

  getProducts = (page, sort) => {
    this.setState({isLoading: true});
    fetch(`${baseUrl}/api/products?_page=${page}&_limit=15&_sort=${sort}`)
    .then((response) => response.json())
    .then((responseJson) => {
      this.totalProducts = [...this.totalProducts, ...responseJson];
      if (this.totalProducts.length === this.state.products.length) {
        this.refs.content.removeEventListener("scroll", this.handleLoadMore);
        this.setState({endOfCatalogue: true});
      }
      this.setState({products: [...this.state.products, ...responseJson]});
      this.setState({isLoading: false});
    })
    .catch(err => {
      this.setState({isLoading: false});
    })
  }

  handleChangeSort = (sort) => {
    this.setState({ products: [], sort });
    this.page = 1;
    this.getProducts(this.page, sort);
  }

  handleLoadMore = () => {
    if (
      this.refs.content.scrollTop + this.refs.content.clientHeight >=
      this.refs.content.scrollHeight
    ) {
      this.page++;
      this.getProducts(this.page, this.state.sort);
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Header onChangeSort={this.handleChangeSort} sort={this.state.sort} />
        </div>
        <div ref="content" className="App-content" style={height}>
          <Content products={this.state.products}/>
          {this.state.isLoading ? <img src={loader} className="App-loader" alt="logo" /> : null}
          {this.state.endOfCatalogue ? <p className="App-end-message">~ End of catalogue ~</p> : null}
        </div>
      </div>
    );
  }
}

export default App;
