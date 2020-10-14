import React, { useEffect, useState } from 'react';
import { Button, Col, Form, FormControl } from 'react-bootstrap';
import '../TodoChildItem/style.scss';
import { v4 as uuidv4 } from 'uuid';
const TodoChildItem = ({ listnote , handleRemoveChildetail})=> {
    const [additemchild, setAdditemchild] = useState('');
    const [listnotes, setListnotes] = useState()
    const [isForm, setIsForm] = useState(false);
    useEffect(() => {
        setListnotes([listnote])
    }, [listnote])
    // useEffect(()=> {
    //     setListnotes(listnotes)
    // },[listnotes])
    const handleAddItemchilds = (ids) => {
        const listchild = listnotes.map(el => el.arraylist);
        if (additemchild) {

            listchild[0].push({ id: uuidv4(), titlechild: additemchild });
            const newlistchild = listnotes.map(el => {
                if (el.id === ids) {
                    return { ...el }
                }
                return el;
            })
            setListnotes(newlistchild);
            setAdditemchild('');
        }
    }
    const OpenFormaddChild = () => {
        setIsForm(true)
    }
    const CloseFormaddChild = () => {
        setIsForm(false)
    }
    
    return (
        <div>
            {listnotes ? listnotes.map((itemnote, indexnote) => (
                <div key={indexnote}>
                    {itemnote.arraylist ? itemnote.arraylist.map((itemnotechild, indexnotechild) => (
                        <div className="d-flex" key={indexnotechild}>
                            <div className="w-50 item-detail">
                                {itemnotechild.titlechild}
                            </div>
                        </div>
                    )) : ''}

                    <button type="button" className="icon-add" onClick={OpenFormaddChild}><i className="fas fa-plus-circle"></i></button>
                    {isForm === true ?
                        (<Form className="d-flex w-100">
                            <Col sm="6" className="p-0">
                                <FormControl
                                    placeholder="add item" value={additemchild} onChange={e => setAdditemchild(e.target.value)}
                                />
                            </Col>

                            <Button className="ml-3" onClick={() => handleAddItemchilds(itemnote.id)} type="button">Add Item</Button>

                            <button type="button" onClick={CloseFormaddChild} className="ml-3 pt-2 btn-close"><i className="fas fa-times-circle"></i></button>
                        </Form>) : ("")}
                </div>
            )) : ''}
        </div>
    )
}                    
export default React.memo(TodoChildItem);