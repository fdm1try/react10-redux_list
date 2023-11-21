import React from 'react'
import Item, { TItem } from './Item';
import { IState } from '../redux/reducers';
import { connect } from 'react-redux';

export type TItemList = Array<TItem>;

export interface IItemList {
  items: TItemList;
  itemToEdit?: TItem;
}

export const ItemList: React.FC<IItemList> = (props) => {
  return (
    <div className='items'>
      {
        props.items.map((item) => (
          <Item key={item.id} item={item} editMode={props.itemToEdit === item} />
        ))
      }
    </div>
  )
}

const mapStateToProps = (state: IState) => ({ itemToEdit: state.itemList.itemToEdit });

export default connect(mapStateToProps)(ItemList);