"use client";
import {useEffect, useState} from 'react';
import Danny from "../components/danny";

export default function Hello(){
    const [message, setMessage] = useState('');
    const [reply, setReply] = useState('');
    const [userInput, setUserInput] = useState('');
    const [backendcon, setBackendCon] = useState("");
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

    const url = (e: React.FormEvent<HTMLFormElement>) => {
        fetch("http://localhost:8080/api/crawl", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: userInput }),
        })
            .then(res => res.json())
            .then(data => setBackendCon(data))
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
                <input type = "submit" value = "Submit"></input>
                
                <Danny
                    name = "bakaka"
                    age = "5"
                />
            </form>

            <form onSubmit = {url}>
                <input
                    value = {userInput}
                    onChange = {e => setUserInput(e.target.value)}
                    required
                ></input>
                <input type = "submit" value = "Submit"></input>
            </form>
            
            <p>Response from backend:</p>
            {replyback}
            {backendcon}
       </div>
    );
}