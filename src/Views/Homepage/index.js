import React, { useState } from 'react';
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
    const [query, setQuery] = useState('');
  
    const handleSearch = (e) => {
        e.preventDefault();
        if (keysearch) {
            var lists = list.filter(item => item.title === keysearch);
            setKeysearch('');
            console.log(lists);
            if(lists != '' ){
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
       const newlist =  list.filter(i => i.id !== ids)
        setList(newlist)
        
    }
    const deletedetail = (listss,arrayList) => {
        console.log(arrayList[0]);
        console.log(listss);
     const newarrayList = arrayList[0].filter(i => i.id != listss.id);
     console.log(newarrayList);
      const newSetlist = list.map(el=> {
          
          return {
              ...el,
              note: newarrayList
          }}
         
      )
      console.log(newSetlist);
      setList(newSetlist)
    }
    console.log(list);
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
                    <Form onSubmit={handleAdd} className="d-flex justify-content-between">
                        <Col sm="9" className="p-0">
                            <FormControl
                                placeholder="add item" value={additem} onChange={e => setAdditem(e.target.value)}
                            />
                        </Col>

                        <Button className="ml-3" type="submit">Add Item</Button>

                    </Form>

                    <div>
                        {list ? list.map((item, index) => (
                            <div key={index} className="notelink">
                                <Navbar >
                                    <Link to={`/item/detail?id=${item.id}`}>{item.title}</Link>
                                </Navbar>
                                <a type="button" onClick={()=>handleClose(item.id)} className="ml-3 pt-2"><i className="fas fa-times-circle"></i></a>
                            </div>
                            
                        )) : ""}
                    </div>
                </div>
                <div className="col-6">
                    <Switch>
                        <Route path="/item/detail">
                            <ItemDetail list={list} deletedetail={deletedetail}></ItemDetail>
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
    )
}


