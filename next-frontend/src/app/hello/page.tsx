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
       <div className = "flex flex-col items-center gap-10">
            <h1 className = "text-4xl font-bold">Imporant Web Cralwer</h1>
            <form onSubmit = {front_input} className = "flex flex-row gap-2">
                <label className = "flex flex-row gap-2">
                    Label for Input Box: (Good Practice)
                <input
                    value = {reply}
                    onChange = {e => setReply(e.target.value)}
                    required
                >
                </input>
                </label>
                <input type = "submit" value = "Submit" ></input>
                <p className = "bg-sky-600"></p>
                <div className = "bg-sky-600">
                <Danny
                    name = "bakaka"
                    age = "5"
                />
                </div>
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