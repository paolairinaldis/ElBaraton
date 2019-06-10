
import { EMPTY_CART, ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING, SET_ACTUAL_CATEGORY } from '../actions/cartActions'
import { products } from '../../data'
import {combineReducers} from 'redux';

const initState = {
    items: products,
    actualCategory: 1,
    addedItems:JSON.parse(localStorage.getItem('addedItems')) || [],
    total: localStorage.getItem('totalAddedItems') || 0

}
const cartReducer= (state = initState,action)=>{

    if(action.type=== EMPTY_CART){
        localStorage.setItem('addedItems', JSON.stringify([]))
        localStorage.setItem('totalAddedItems', 0)
        return{
            ...state,
            addedItems:[],
            total: 0
        }
    }
   
    if(action.type === ADD_TO_CART){
          let addedItem = state.items.find(item=> item.id === action.id)
         let existed_item= state.addedItems.find(item=> action.id === item.id)
         if(existed_item) {
            addedItem.quantity += 1; 
            let pr = parseFloat(addedItem.price.replace(",","."))
             return{
                ...state,
                 total: state.total + pr 
                  }
        }
         else{
            addedItem.quantity = 1;
            let newTotal = state.total + parseFloat(addedItem.price.replace(",",".")) 
            localStorage.setItem('addedItems', JSON.stringify([...state.addedItems, addedItem]))
            localStorage.setItem('totalAddedItems', newTotal)
            return{
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : newTotal
            }
            
        }
    }
    if(action.type === REMOVE_ITEM){
        let itemToRemove= state.addedItems.find(item=> action.id === item.id)
        let new_items = state.addedItems.filter(item=> action.id !== item.id)
        let newTotal = state.total - (parseFloat(itemToRemove.price.replace(",",".")) * itemToRemove.quantity )
        localStorage.setItem('addedItems', JSON.stringify(new_items))
        localStorage.setItem('totalAddedItems', newTotal)
        return{
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }
    if(action.type=== ADD_QUANTITY){
        let addedItem = state.items.find(item=> item.id === action.id)
          addedItem.quantity += 1 
          let newTotal = state.total + parseFloat(addedItem.price.replace(",","."))
          localStorage.setItem('totalAddedItems', newTotal)
          return{
              ...state,
              total: newTotal
          }
    }
    if(action.type=== SUB_QUANTITY){  
        let addedItem = state.items.find(item=> item.id === action.id) 
        if(addedItem.quantity === 1){
            let new_items = state.addedItems.filter(item=>item.id !== action.id)
            let newTotal = state.total - parseFloat(addedItem.price.replace(",","."))
            localStorage.setItem('addedItems', JSON.stringify(new_items))
            localStorage.setItem('totalAddedItems', newTotal)
            return{
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        else {
            addedItem.quantity -= 1
            let newTotal = state.total - parseFloat(addedItem.price.replace(",","."))
            localStorage.setItem('totalAddedItems', newTotal)
            return{
                ...state,
                total: newTotal
            }
        }
        
    }

    if(action.type=== ADD_SHIPPING){
          localStorage.setItem('totalAddedItems', state.total + 6)
          return{
              ...state,
              total: state.total + 6
          }
    }

    if(action.type=== 'SUB_SHIPPING'){
        localStorage.setItem('totalAddedItems', state.total - 6)
        return{
            ...state,
            total: state.total - 6
        }
  }

    return state
}

const productsReducer = (state = initState, action) => {
	switch (action.type) {
    case SET_ACTUAL_CATEGORY:
        return {
            ...state,
            actualCategory: action.category
        };
	default:
		return state;
	}
};

const rootReducer = combineReducers({productsReducer, cartReducer});
export default rootReducer;