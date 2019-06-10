import React, { Component } from 'react'
import InputRange from 'react-input-range';

class FilterBy extends Component{

    render(){
        return(
            <div className="col-md-12">
                                <div className="col-md-1">
                                Filter: 
                            </div>
                            <div className="col-md-2">
                                {this.props.onlyAvailable ? 'En Stock' : 
                                <button className="waves-effect waves-light btn" onClick={() => this.props.setAvailable(true)}>En stock</button>}
                            </div>
                            <div className="col-md-4">
                                <label> Rango de Precio</label>
                                <InputRange
                                    formatLabel={price => `$${price}`}
                                    maxValue={20}
                                    minValue={0}
                                    value={this.props.price}
                                    onChange={price => this.props.setPrice(price)} />
                            </div>
                            <div className="col-md-4">
                                <label> Rango de Stock</label>
                                <InputRange
                                    formatLabel={cant => `${cant}`}
                                    maxValue={1000}
                                    minValue={0}
                                    value={this.props.cant}
                                    onChange={cant => this.props.setCant(cant)} />
                            </div>
                            <div className="col-md-1">
                                <button className="btn-floating btn-small waves-effect waves-light red" onClick={() => this.props.clearFilter()}><i className="material-icons">remove</i></button>
                            </div>
                            </div>
        )
    }
}

export default FilterBy