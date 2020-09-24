import React, { useState } from 'react';
import { Button, Col, Form, FormControl } from 'react-bootstrap';
import '../TodoChildItem/style.scss'
export default function TodoChildItem({handleAddItemchild ,arrayitemchild}) {
    const [additemchild,setAdditemchild] = useState('');
    const [isForm, setIsForm] = useState(false);
   console.log(arrayitemchild);
    const handleAddItemchilds = (e) => {
        e.preventDefault();
        console.log(arrayitemchild);
     handleAddItemchild(additemchild,arrayitemchild);
     setAdditemchild('')
    }
    const handleFormAdd = () => {
       
        setIsForm(true)
    }
    const handleClose = () => {
        setIsForm(false)
       
    }
    return (
        <div>
            {arrayitemchild?arrayitemchild.map((item,index)=>(
                <div className="item-detail w-50" key={index}>{item.valuechilds}</div>
            )):''}
           <a type="button" className="icon-add" onClick={handleFormAdd}><i className="fas fa-plus-circle"></i></a>
           {isForm === true ?
            (<Form onSubmit={handleAddItemchilds} className="d-flex w-100">
                <Col sm="6" className="p-0">
                    <FormControl
                        placeholder="add item" value={additemchild} onChange={e => setAdditemchild(e.target.value)}
                    />
                </Col>
                
                    <Button className="ml-3" type="submit">Add Item</Button>
                
                <a type="button" onClick={handleClose} className="ml-3 pt-2"><i className="fas fa-times-circle"></i></a>
            </Form>):("")}
        </div>

    )
}