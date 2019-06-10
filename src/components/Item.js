import React, { Component } from 'react'
import NoImage from '../images/no-image.jpg';

class Item extends Component{

    render(){
        let item = this.props.item
        return(
            <div className="card" key={item.id}>
                            <div className="card-image">
                                {item.img ? <img src={item.img} alt={item.name}/> : <img src={NoImage} alt={item.name}/>}
                                <span className="card-title">{item.name}</span>
                                {item.available ? 
                                <span to="/" className="btn-floating halfway-fab waves-effect waves-light red" title="Add to Cart" onClick={()=>{this.props.handleClick(item.id)}}><i className="material-icons">add</i></span>
                                :
                                <span className="btn-floating halfway-fab waves-effect waves-light grey no-click" title="Out Of Stock"><i className="material-icons">add</i></span>
                                }
                            </div>

                            <div className="card-content">
                                <p>{item.desc}</p>
                                <p>
                                    <b>Price: ${item.price}</b>
                                </p>
                            </div>
                    </div>

        )
    }
}

export default Item