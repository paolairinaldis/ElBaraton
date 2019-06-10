import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addToCart } from './actions/cartActions'
import TreeMenu from 'react-simple-tree-menu';
import { categories } from '../data';
import 'react-input-range/lib/css/index.css';
import Item from './Item';
import OrderBy from './OrderBy';
import FilterBy from './FilterBy';

class Home extends Component{

    constructor(props){
        super(props);
        this.myRef = React.createRef();
        this.state = {
            actualCategory: this.props.actualCategory,
            onlyAvailable: false,
            price: { min: 0, max: 20 },
            cant: { min: 0, max: 1000 },
            sortCriterio : 'price',
            searchByName : '',
            products: this.props.items
        }
        
    }
    
    handleClick = (id)=>{
        this.props.addToCart(id); 
    }

    setActualCategory = (props: Item) => {
        this.setState({
            actualCategory : props.key.replace(props.parent + '/', '')
          });
    }
    
    setAvailable = () => {
        this.setState({
            onlyAvailable : true
          });
    }

    clearFilter = () => {
        this.myRef.current.value = '';
        this.setState({
            onlyAvailable : false,
            price: { min: 0, max: 20 },
            cant: { min: 0, max: 1000 },
            sortCriterio : 'price',
            searchByName : '',
          });
    }

    filterByAvailable = (item) => {
        return this.state.onlyAvailable ? item.available : true
    }

    filterByPrice = (item) => {
        return parseFloat(item.price.replace(",",".")) > this.state.price.min && parseFloat(item.price.replace(",",".")) < this.state.price.max
    }
    
    filterByCant = (item) => {
        return item.quantity > this.state.cant.min && item.quantity < this.state.cant.max
    }

    filterByName = (item) => {
            return item.name.toLowerCase().search(
              this.state.searchByName.toLowerCase()) !== -1;
    }

    sortByCriterio = (a, b) => {
        if(this.state.sortCriterio === 'stock')
            return b.quantity - a.quantity;
        else
            return parseFloat(b.price.replace(",",".")) - parseFloat(a.price.replace(",","."));
    }

    setSortCriterio = (sortCriterio) => {
        this.setState({ sortCriterio })
    }

    setSearchByName = (searchByName) => {
        this.setState({ searchByName })
    }

    setPrice = (price) => {
        this.setState({ price })
    }

    setCant = (cant) => {
        this.setState({ cant })
    }

    render(){
        let itemList = this.state.products
            .filter(item => item.sublevel_id === parseInt(this.state.actualCategory))
            .filter(item => this.filterByAvailable(item))
            .filter(item => this.filterByPrice(item))
            .filter(item => this.filterByCant(item))
            .filter(item => this.filterByName(item))
            .sort(this.sortByCriterio)
            .map(item=>{
                return(
                    <Item key={item.id} item={item} handleClick={this.handleClick} />
                )
            })

        return(
            <div className="App">
                <div className="col-md-12">
                    <div className="col-md-2">
                        <h1 className="app-title">
                            Total: {itemList.length}
                        </h1>
                    </div>
                    <div className="col-md-1"></div>
                    <div className="col-md-9 app-filter">
                            <OrderBy setSortCriterio={this.setSortCriterio} sortCriterio={this.state.sortCriterio} setSearchByName={this.setSearchByName} myRef={this.myRef} />
                            <FilterBy 
                                onlyAvailable={this.state.onlyAvailable} 
                                setAvailable={this.setAvailable} 
                                setPrice={this.setPrice} 
                                price={this.state.price} 
                                setCant={this.setCant}
                                cant={this.state.cant}
                                clearFilter={this.clearFilter}
                            />
                    </div>	
                </div>
                <div className="col-md-12">
                    <div className="col-md-2 well well-sm categories">
                        <TreeMenu data={categories} onClickItem={this.setActualCategory} />
                    </div>
                    <div className="col-md-1"></div>
                    <div className="col-md-9 well well-sm box">
                        {itemList.length > 0 ? itemList : "Sin productos"}
                    </div>
                </div>
			</div>


        )
    }
}
const mapStateToProps = (state)=>{
    return {
      items: state.cartReducer.items,
      actualCategory: state.cartReducer.actualCategory
    }
  }
const mapDispatchToProps= (dispatch)=>{
    
    return{
        addToCart: (id)=>{dispatch(addToCart(id))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)