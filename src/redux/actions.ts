import { TItem } from '../components/Item';

export const ITEM_ADD = 'item-add';
export const ITEM_UPDATE = 'item-update';
export const ITEM_REMOVE = 'item-remove';
export const ITEM_MARK_FOR_EDIT = 'item-edit';

export interface IItemListAction {
  type: string;
  payload?: TItem;
}

type TDispatch = (action: IItemListAction) => void;

export type TItemListActionDispatch = TDispatch;

export const addItem = (dispatch: TDispatch) => (item: TItem) => { 
  const action = {type: ITEM_ADD, payload: item };
  dispatch(action);
}

export const updateItem = (dispatch: TDispatch) => (item: TItem) => { 
  const action = {type: ITEM_UPDATE, payload: item }
  dispatch(action);
}

export const removeItem = (dispatch: TDispatch) => (item: TItem) => { 
  const action = { type: ITEM_REMOVE, payload: item };
  dispatch(action);
}

export const markItemForEdit = (dispatch: TDispatch) => (item?: TItem) => { 
  const action = { type: ITEM_MARK_FOR_EDIT, payload: item };
  dispatch(action);
};
