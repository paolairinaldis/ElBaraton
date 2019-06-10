import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Navbar extends Component{
    render(){
        return(
            <nav className="nav-wrapper">
                <div className="container">
                    <Link to="/" className="brand-logo">El Baratón</Link>
                    
                    <ul className="right">
                        <li><Link to="/">Shop</Link></li>
                        <li className="icon-cart">
                            <Link to="/cart" titke="My Cart"><i className="material-icons">shopping_cart</i> {this.props.addedItems.length} Items</Link>
                        </li>
                    </ul>
                </div>
            </nav>  
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        addedItems: state.cartReducer.addedItems
    }
}
export default connect(mapStateToProps,null)(Navbar)