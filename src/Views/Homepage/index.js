import React, { useEffect, useState } from 'react';
import { Button, Col, Form, FormControl } from 'react-bootstrap';
import '../Homepage/style.scss';
import { v4 as uuidv4 } from 'uuid';
import TodoChildItem from '../TodoItem/TodoChildItem';
import Fuse from 'fuse.js'
export default function Homepage() {
    const [list, setList] = useState();
    const [listSearch, setListSearch] = useState([]);
    const [keysearch, setKeysearch] = useState('');
    const [additem, setAdditem] = useState('');
    const [additemdetail, setAdditemDetail] = useState('');
    const [itemdetail, setItemDetail] = useState();
    const [isSearch,setIsSearch] = useState('')

    const handleChange= (e) => {
        setKeysearch(e)
       if(e === ''){
        setList(listSearch)
        setIsSearch('')
       }
    }
    const handleSearch = (e) => {
        e.preventDefault();
        setIsSearch(true)
        console.log(listSearch);
    
        if (keysearch !== '' && listSearch!='') {
            console.log(keysearch);
            setIsSearch(true)
            const options = {
                includeScore: true,
                // equivalent to `keys: [['author', 'tags', 'value']]`
                keys: ['title']
            }
            const fuse = new Fuse(listSearch, options)
            const result = fuse.search(keysearch);
            const listResult = [];
            listResult.push(result.map(el => el.item));
            setList(listResult[0]);
        }
        else {
            setList(listSearch);
            setIsSearch('')
        }
    }

    const handleAdd = (e) => {
        e.preventDefault();
        if (additem) {
           listSearch.push({ id: uuidv4(), title: additem, note: [] });
          
            setList(listSearch)
            setAdditem('');
            
        }

    }
    const handleClose = (ids) => {
        const newlist = list.filter(i => i.id !== ids)
        setList(newlist);
        setListSearch(listSearch.filter(i => i.id !== ids))
        
        setItemDetail('')
    }
    const gotoDetail = (itemDetail) => {
        setItemDetail([itemDetail])
        localStorage.setItem('id', itemDetail.id)
    }
    const removeDetail = (listDetail, itemId) => {
        const lists = [...list]
        const noteList = itemdetail.map(el => el.note)

        const filterDetail = noteList[0].filter(ln => ln.id !== listDetail.id);
        console.log(filterDetail);

        const newList = lists.map(nl => {

            if (nl.id === itemId) {
                return { ...nl, note: filterDetail }
            }
            return nl;
        })

        const newDetail = itemdetail.map(el => {
            if (el.id === itemId) {
                return { ...el, note: filterDetail }
            }
            return el;
        })
        setItemDetail(newDetail);
        setList(newList)

    }

    const handleAddItem = (e) => {
        if (additemdetail) {
            e.push({ id: uuidv4(), titleitem: additemdetail, arraylist: [] });
            setAdditemDetail('')
        }
    }

    //  const handleRemoveChildetail = (listFilter,ids) => {
    //     console.log(listFilter);
    //     console.log(ids);
    //     const newnote = itemdetail.map(el => el.note);
    //     const idNote = localStorage.getItem('id');
    //     console.log(idNote);
    //     const newDetail = newnote.map(el => {
    //         if(el[0].id === ids){
    //             return {...el[0], arraylist: listFilter}
    //         }
    //         return el[0];

    //     })
    //     const newNote = itemdetail.map(el => {
    //         if(el.id === idNote){
    //             return {
    //                 ...el, note: newDetail
    //             }
    //         }
    //         return el;
    //     })
    //     console.log(newDetail);
    //     setItemDetail(newNote)
    //  }
    return (
        <div className="homepage">


            <div className="d-flex">
                <div className="col-3">
                    <div>
                        <Form onSubmit={handleSearch} className="d-flex justify-content-between">
                            <Col sm="9" className="p-0">
                                <FormControl
                                    placeholder="key search" value={keysearch} onChange={e => handleChange(e.target.value)}
                                />
                            </Col>

                            <Button className="ml-3" type="submit">Search</Button>

                        </Form>
                    </div>

                    <h3 className="mt-3 mb-3 note-title">All Note</h3>
                    <Form className="d-flex justify-content-between w-100">
                        <Col sm="9" className="p-0">
                            <FormControl
                                placeholder="add item" value={additem} onChange={e => setAdditem(e.target.value)}
                            />
                        </Col>

                        {isSearch?<Button className="ml-3 "  type="button" disabled>Add Item</Button>:<Button className="ml-3 "  type="button" onClick={handleAdd}>Add Item</Button>}

                    </Form>

                    <div>
                        {list ? list.map((item, index) => (
                            <div key={index} className="d-flex w-100">

                                <Button className="notelink" type="button" onClick={() => gotoDetail(item)}>{item.title}</Button>

                                <button type="button" onClick={() => handleClose(item.id)} className="ml-3 pt-3 btn-close"><i className="fas fa-times-circle"></i></button>
                            </div>

                        )) : ""}
                    </div>
                </div>
                <div className="col-6">

                    {itemdetail ? itemdetail.map((items, indexs) => (
                        <div key={indexs}>
                            <h3 className="note-title">Note (<span>{items.title}</span>)</h3>
                            <div className="d-flex mt-3">
                                <Form className="d-flex w-100 justify-content-between">
                                    <Col sm="10" className="p-0">
                                        <FormControl
                                            placeholder="add item" value={additemdetail} onChange={e => setAdditemDetail(e.target.value)}
                                        />
                                    </Col>

                                    <Button className="" onClick={() => handleAddItem(items.note)} type="button">Add Item</Button>

                                </Form>
                            </div>
                            <div className="w-100">
                                {items.note ? items.note.map((itemdetail, indexdetail) => (
                                    <div key={indexdetail} className="div-item-detail">
                                        <div className="d-flex">
                                            <div className="w-50 item-detail">
                                                {itemdetail.titleitem}
                                            </div>
                                            <button type="button" onClick={() => removeDetail(itemdetail, items.id)} className="ml-3 pt-4 btn-close"><i className="fas fa-times-circle"></i></button>
                                        </div>
                                        {/* {itemdetail ? itemdetail.map((itemchild, indexchild) => (
                                            <div className="item-detail w-50" key={indexchild}>{itemchild.valuechilds}</div>
                                        )) : ''} */}
                                        <TodoChildItem listnote={itemdetail} />
                                    </div>
                                )) : ''}

                            </div>
                        </div>
                    )) : ""}
                </div>
            </div>
        </div>

    )
}


