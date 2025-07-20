"use client";
import {useEffect, useState} from 'react';
import Danny from "../components/danny";

export default function Hello(){
    const [message, setMessage] = useState('');
    const [reply, setReply] = useState('');
    const [replyback, setReplyBack] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/hello')
            .then(res => res.text())
            .then(data => setMessage(data));
    }, []);

    const front_input = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch('http://localhost:8080/echo', {
            method: "POST",
            headers: {"Content-Type": "text/plain"},
            body: reply,
        })
            .then(res => res.text())
            .then(data => setReplyBack(data))
    }

    return (
       <div>
            {message}
            <form onSubmit = {front_input}>
                <input
                    value = {reply}
                    onChange = {e => setReply(e.target.value)}
                    required
                >
                </input>
                <input type = "submit" value = "Submit" ></input>
                <p className = "bg-sky-600"></p>
                <div className = "bg-sky-600">
                <Danny
                    name = "bakaka"
                    age = "5"
                />
                </div>
            </form>
            
            <p>Response from backend:</p>
            {replyback}
       </div>
    );
}