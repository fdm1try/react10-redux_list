import { IItemListAction, ITEM_ADD, ITEM_UPDATE, ITEM_REMOVE, ITEM_MARK_FOR_EDIT } from './actions';
import { TItem } from '../components/Item';

export interface IItemListState {
  lastItemId: number;
  items: Array<TItem>;
  itemToEdit?: TItem;
}

const itemListInitialState : IItemListState = {
  lastItemId: 0,
  items: [],
  itemToEdit: undefined
}

export interface IState {
  itemList: IItemListState
}

export const itemListReducer = (
  state: IItemListState = itemListInitialState, 
  action: IItemListAction
) => {
  let id: number;
  let item: TItem | undefined;
  const { type, payload } : IItemListAction = action;
  switch (type) {
    case ITEM_ADD:
      if (!payload) throw new Error('Item not defined!');
      id = ++state.lastItemId;
      return { ...state, items: [...state.items, {...payload, id }], lastItemId: id };
    case ITEM_UPDATE:
      if (!payload) throw new Error('Item not defined!');
      item = state.items.find((listItem) => listItem.id === payload.id);
      if (!item) throw new Error('Item is not exist!')
      return { ...state, items: state.items.map((listItem) => listItem.id === payload.id ? payload : listItem) };
    case ITEM_REMOVE:
      if (!payload) throw new Error('Item not defined!');
      item = state.itemToEdit;
      if (item && item.id === payload.id) {
        item = undefined
      }
      return { ...state, itemToEdit: item, items: state.items.filter((item) => item.id !== payload.id) };
    case ITEM_MARK_FOR_EDIT:
      if (!payload) return { ...state, itemToEdit: payload }
      item = state.items.find((listItem) => listItem.id === payload.id);
      if (!item) throw new Error('Item is not exist!')
      return { ...state, itemToEdit: item };
    
    default:
      console.warn(`itemListReducer: unknown action type: ${action.type}`);
      return state;
  }  
}