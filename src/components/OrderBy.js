import React, { Component } from 'react'

class Item extends Component{

    render(){
        return(
            <div className="col-md-12">
                                <div className="col-md-8">
                                    Order By: 
                                    <form action="#">
                                        <p>
                                        <label>
                                            <input name="group1" type="radio" onClick={() => this.props.setSortCriterio('price')} defaultChecked={this.props.sortCriterio === 'price' ? "checked" : undefined} />
                                            <span>Precio</span>
                                        </label>
                                        </p>
                                        <p>
                                        <label>
                                            <input name="group1" type="radio" onClick={() => this.props.setSortCriterio('stock')} defaultChecked={this.props.sortCriterio === 'stock' ? "checked" : undefined}  />
                                            <span>Cantidad</span>
                                        </label>
                                        </p>
                                    </form>
                                </div>
                                <div className="col-md-4 search-by-name">
                                    <input ref={this.props.myRef} placeholder="Search by name" id="name" type="text" className="validate" />
                                    <button className="waves-effect waves-light btn" onClick={() => this.props.setSearchByName(this.props.myRef.current.value)}>Search</button>
                                </div>
                            </div>
        )
    }
}

export default Item