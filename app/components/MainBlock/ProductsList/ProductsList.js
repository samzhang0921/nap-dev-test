import React from 'react';
import { render } from 'react-dom';
import Product from './Product/Product';
import style from './ProductsList.css'

export default class ProductsList extends React.Component {
  constructor (props){
    super(props)
  }


    render (){
      if(!this.props.data.products) {return <div className= {style.productsList}> <p className= {style.loading}>Loading</p></div>};
      const products = this.props.data.products;
      return  (
        <div className= {style.productsList}>
        <ul>
        {products.map((pid) =>{
           return <Product productViewChecked={this.props.productViewChecked} key={pid.sku} product={pid}/>
        })}
        </ul>
        </div>
      )
    }





  }
