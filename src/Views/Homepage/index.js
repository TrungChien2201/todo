import React, { useEffect, useState } from 'react';
import { Button, Col, Form, FormControl, Navbar } from 'react-bootstrap';
import { Link, Route } from 'react-router-dom';
import '../Homepage/style.scss';
import { v4 as uuidv4 } from 'uuid';
import Switch from 'react-bootstrap/esm/Switch';
import ItemDetail from '../TodoItem';
export default function Homepage() {
    const [list, setList] = useState([]);
    const [keysearch, setKeysearch] = useState('');
    const [additem, setAdditem] = useState('');
    const [additemchild, setAdditemchild] = useState('');
    const [itemdetail, setItemDetail] = useState();

    const handleSearch = (e) => {
        e.preventDefault();
        if (keysearch) {
            var lists = list.filter(item => item.title === keysearch);
            setKeysearch('');
            console.log(lists);
            if (lists != '') {
                setList(lists)
            }

        }


    }

    const handleAdd = (e) => {

        e.preventDefault();
        if (additem)
            list.push({ id: uuidv4(), title: additem, note: [] });
        setAdditem('')
    }
    const handleClose = (ids) => {
        const newlist = list.filter(i => i.id !== ids)
        setList(newlist)

    }
    const gotoDetail = (itemDetail) => {
        setItemDetail([itemDetail])
    }
    const removeDetail = (listDetail,itemId) => {
        // console.log(itemId);
        // const noteList = itemdetail.map(el=> el.note)
        // console.log(noteList);
        // const filterDetail = noteList[0].filter(ln => ln.id !== listDetail.id);
        // console.log(filterDetail);
       
        const newList = list.map(nl => {
            const filterDetail = nl.note.filter(ln => ln.id !== listDetail.id);
           if(nl.id === itemId){
               console.log('k');
               return {...nl, note: filterDetail}
           }
            
        })
        console.log(newList);
        setItemDetail(newList)
     
    }
    useEffect(()=>{
     console.log(list);
    },[])
    console.log(list);
    const handleAddItem = (e) => {
        console.log(e);
        if (additemchild) {
            e.push({id:uuidv4(), titleitem: additemchild, arraylist: [] });
            setAdditemchild('')
        }
         console.log(itemdetail);
    }
    return (
        <div className="homepage">


            <div className="d-flex">
                <div className="col-3">
                    <div>
                        <Form onSubmit={handleSearch} className="d-flex justify-content-between">
                            <Col sm="9" className="p-0">
                                <FormControl
                                    placeholder="key search" value={keysearch} onChange={e => setKeysearch(e.target.value)}
                                />
                            </Col>

                            <Button className="ml-3" type="submit">Search</Button>

                        </Form>
                    </div>

                    <h3 className="mt-3 mb-3 note-title">All Note</h3>
                    <Form onSubmit={handleAdd} className="d-flex justify-content-between w-100">
                        <Col sm="9" className="p-0">
                            <FormControl
                                placeholder="add item" value={additem} onChange={e => setAdditem(e.target.value)}
                            />
                        </Col>

                        <Button className="ml-3" type="submit">Add Item</Button>

                    </Form>

                    <div>
                        {list ? list.map((item, index) => (
                            <div key={index} className="d-flex w-100">

                                <a className="notelink" type="button" onClick={() => gotoDetail(item)}>{item.title}</a>

                                <a type="button" onClick={() => handleClose(item.id)} className="ml-3 pt-3"><i className="fas fa-times-circle"></i></a>
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
                                            placeholder="add item" value={additemchild} onChange={e => setAdditemchild(e.target.value)}
                                        />
                                    </Col>

                                    <Button className="" onClick={()=>handleAddItem(items.note)} type="button">Add Item</Button>

                                </Form>
                            </div>
                            <div className="w-100">
                                {items.note?items.note.map((itemdetail, indexdetail) => (
                                    <div key={indexdetail} className="div-item-detail">
                                        <div className="d-flex">
                                            <div className="w-50 item-detail">
                                                {itemdetail.titleitem}
                                            </div>
                                            <a type="button" onClick={()=> removeDetail(itemdetail,items.id)} className="ml-3 pt-4"><i className="fas fa-times-circle"></i></a>
                                        </div>
                                        {/* <TodoChildItem handleAddItemchild={handleAddItemchild} arrayitemchild={item.arraylist} /> */}
                                    </div>
                                )):''}

                            </div>
                        </div>
                    )) : ""}
                </div>
            </div>
        </div>

    )
}


