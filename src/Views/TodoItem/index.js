import React, { useEffect, useState } from 'react';
import { Button, Col, Form, FormControl } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import TodoChildItem from './TodoChildItem';
import '../TodoItem/style.scss';
import { v4 as uuidv4 } from 'uuid';
export default function ItemDetail({ list , deletedetail}) {
    const [additem, setAdditem] = useState('');

    let query = new URLSearchParams(useLocation().search);
    const id = query.get("id");
    const [listdetail,setListdetail] = useState(list)

    useEffect(() => {
        setListdetail(listdetail)
    }, [list])
    const lists = listdetail.filter(item => item.id === id);
    const listnote = lists.map(item => item.note);
    console.log(listnote);
    const l = [...listnote];
    
    const handleAdd = (e) => {
        e.preventDefault();
        if (additem) {
            l[0].push({id:uuidv4(), titleitem: additem, arraylist: [] });
            setAdditem('')
        }
         console.log(lists);
    }

    const handleAddItemchild = (valuechild, arrchild) => {
        console.log(arrchild);
        if (valuechild) {
            console.log(arrchild);
            arrchild.push({id: uuidv4(),valuechilds: valuechild})
        }
    }
    const handleClose = (listnotess) => {
        console.log(listnotess);
        deletedetail(listnotess,listnote)
       
       
    }
  
    return (
        <div>
            {lists ? lists.map((item, index) => (
                <div key={index}>
                    <h3 className="note-title">Note (<span>{item.title}</span>)</h3>
                    <div className="d-flex mt-3">
                        <Form onSubmit={handleAdd} className="d-flex w-100 justify-content-between">
                            <Col sm="10" className="p-0">
                                <FormControl
                                    placeholder="add item" value={additem} onChange={e => setAdditem(e.target.value)}
                                />
                            </Col>

                            <Button className="" type="submit">Add Item</Button>

                        </Form>
                    </div>
                    <div className="w-100">
                        {item.note.map((item, index) => (
                            <div key={index} className="div-item-detail">
                                <div className="d-flex">
                                    <div className="w-50 item-detail">
                                        {item.titleitem}

                                    </div>
                                    <a type="button" onClick={()=>handleClose(item)} className="ml-3 pt-4"><i className="fas fa-times-circle"></i></a>
                                </div>
                                <TodoChildItem handleAddItemchild={handleAddItemchild} arrayitemchild={item.arraylist}  />
                            </div>
                        ))}

                    </div>
                </div>
            )) : ""}
        </div>
    )
}