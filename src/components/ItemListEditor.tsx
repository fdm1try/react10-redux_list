import { FC, useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { TItem } from './Item'
import ItemList, { TItemList } from './ItemList'
import { IState} from '../redux/reducers';
import { TItemListActionDispatch as TDispatch, updateItem, addItem, markItemForEdit } from '../redux/actions';

export interface IItemListEditor {
  items: TItemList;
  itemToEdit?: TItem;
  addItem?: (item: TItem) => void;
  updateItem?: (item: TItem) => void;
  markItemForEdit?: (item?: TItem) => void;
}

export const ItemListEditor: FC<IItemListEditor> = (props) => {
  const [nameValue, setNameValue] = useState<string>('');
  const [priceValue, setPriceValue] = useState<string>('');
  const prevItemToEditProp = useRef<TItem>();
  const inputName = useRef<HTMLInputElement>(null);
  const inputPrice = useRef<HTMLInputElement>(null);


  useEffect( () => {
    if (prevItemToEditProp.current !== props.itemToEdit) {
      setNameValue(props.itemToEdit?.name || '');
      setPriceValue(`${props.itemToEdit?.price}` || '');
    }
    prevItemToEditProp.current = props.itemToEdit;
  }, [props.itemToEdit]);

  function resetForm() {
    setNameValue('');
    setPriceValue('');
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNameValue(e.target.value);
  }

  function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPriceValue(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const name = inputName.current?.value || '';
    const price = +(inputPrice.current?.value || 0);
    if (props.itemToEdit) {
      const { id } = props.itemToEdit;      
      props.updateItem && props.updateItem({id, name, price});
      props.markItemForEdit && props.markItemForEdit();
      return;
    }
    props.addItem && props.addItem({id: -1, name, price});
    resetForm();
  }

  function handleCancelClick() {
    if (props.itemToEdit) {
      props.markItemForEdit && props.markItemForEdit();
    }
    resetForm();
  }

  return (
    <div className='editor'>
      <div className='editor__header'>
        <form className='editor__form' onSubmit={handleSubmit}>
          <input placeholder='Наименование' ref={inputName} onChange={handleNameChange} className='editor__form_name' required type='text' name='name' value={nameValue} />
          <input placeholder='Стоимость' ref={inputPrice} onChange={handlePriceChange} className='editor__form_price' required type='number' name='price' value={priceValue} />
          <button className='editor__form_submit'>Save</button>
          <button className='editor__form_reset' onClick={handleCancelClick} type='button'>Cancel</button>
        </form>
      </div>
      <div className='editor__body'>
        <ItemList items={props.items} />
      </div>
    </div>
  )
}

const mapStateToProps = (state: IState) => ({ 
  itemToEdit: state.itemList.itemToEdit, 
  items: state.itemList.items
});

const mapDispatchToProps = (dispatch: TDispatch) => {
  return {
    addItem: addItem(dispatch),
    updateItem: updateItem(dispatch),
    markItemForEdit: markItemForEdit(dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemListEditor);