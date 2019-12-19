import React, { useState, useEffect, useContext  } from 'react';
import './LinkedListComponent.css';
import {ThemeContext} from './Contexts.js'

import {LinkedList} from './scripts/LinkedList.js'

let list = new LinkedList();

function LinkedListDisplay() {
    const [subject, setSubject] = useState("");
    const [amount, setAmount] = useState("");
    const [focus, setFocus] = useState("subject");

    const context = useContext (ThemeContext);
    let target = context.LinkedListTarget;
    let setTarget = context.changeTarget;
    
    useEffect(() => {
        document.getElementById(focus).focus();
    });

    function InsertatStart () {
        if (subject === "" || amount === "") return;
        list.insertAtBeginning(subject, amount);
        setSubject("");
        setAmount("");
        setTarget(list.current);
        setFocus("subject");
    }

    function InsertatEnd () {
        if (subject === "" || amount === "") return;
        list.insertAtEnd(subject, amount);
        setSubject("");
        setAmount("");
        setTarget(list.current);
        setFocus("subject");
    }

    function Insert () {
        if (subject === "" || amount === "") return;
        if (list.current === null) return;
        list.insertAfterCurrent(subject, amount)
        setSubject("");
        setAmount("");
        setFocus("subject");
    }
    
    function enter (e) {
        if (e.key === 'Enter') {
            InsertatEnd();
        }
    }
    
    function Delete () {
        if (list.current === null) return;
        list.deleteCurrent()
        setTarget(list.current);
    } 

    function FindStart () {
        list.current = list.head
        setTarget(list.current);
    }
    
    function FindEnd () {
        list.current = list.tail
        setTarget(list.current);
    }

    function Next () {
        let current = list.current;
        if (current === null) return;
        if (current.next === null) return;
        list.current = current.next
        setTarget(list.current);
    }

    function Prev () {
        let current = list.current
        if (current === null) return;
        if (current.prev === null) return;
        list.current = current.prev;
        setTarget(list.current);
    }
  
    return (
        <div className = "LinkedListCntroller">
            <p className = "currentNode">{target? `Current ${target.show()}` : "Nothing to Show"}</p>
            <div>
                <button onClick = {InsertatStart} className = "allButtons">Insert at Start</button>
                <button onClick = {FindStart} className = "allButtons">{"<<"}</button>
                <button onClick = {Prev} className = "allButtons">{"<"}</button>
                <button onClick = {Insert} className = "allButtons">Insert</button>
                <button onClick = {Delete} className = "allButtons">Delete</button>
                <button onClick = {Next} className = "allButtons">{">"}</button>
                <button onClick = {FindEnd} className = "allButtons">{">>"}</button>
                <button onClick = {InsertatEnd} className = "allButtons">Insert at End</button>
            </div>
            <div>
                <input type="text" placeholder="Subject" id="subject"
                value={subject} onChange={(e) => {setSubject(e.target.value); setFocus("subject")}} onKeyPress={enter}></input>
                <input type="number" placeholder="Amount" id="amount"
                value={amount} onChange={(e) => {setAmount(e.target.value); setFocus("amount")}} onKeyPress={enter}></input>
            </div>
            <p className = "allNodes">{list.show()}</p>
        </div>
    );
}

export {LinkedListDisplay}

