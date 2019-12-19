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

    let show = [];
    let text = ``;
    let total = 0;
    let counter = 1;
    let tail = list.head;
    while(tail !== null){
        text = `${tail.subject}:${tail.amount}`
        if (tail === list.current) {
            show.push(<p className="cnode" key={counter}>{text}</p>);
        } else {
            show.push(<p className="node" key={counter}>{text}</p>);
        }
        total = total + Number(tail.amount);
        tail = tail.next;
        counter = counter+1;
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
            <div className = "allNodes">{show}</div>
            <div className = "total">{list.head ? `total amount: ${total}`  : ""}</div>
        </div>
    );
}

export {LinkedListDisplay}

