"use client";
import { useEffect, useState } from 'react';

export default function Hello() {
    const [message, setMessage] = useState('');
    const [reply, setReply] = useState('');
    const [userInput, setUserInput] = useState('');
    const [backendCon, setBackendCon] = useState<string[] | string>('');
    const [replyBack, setReplyBack] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/api/hello')
            .then(res => res.text())
            .then(data => setMessage(data));
    }, []);

    const front_input = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch('http://localhost:8080/api/echo', {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: reply,
        })
            .then(res => res.text())
            .then(data => setReplyBack(data));
    }

    const url = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch("http://localhost:8080/api/crawl", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: userInput }),
        })
            .then(res => res.json())
            .then(data => setBackendCon(data))
            .catch(err => setBackendCon("Error: " + err.message));
    }

    return (
        <div className = "flex flex-col items-center gap-10">
            <div className = "flex flex-col items-center gap-10">
              <h1 className = "text-4xl font-bold">Imporant Web Cralwer</h1>
              <form onSubmit = {front_input} className = "flex flex-row gap-2">
                <label className = "flex flex-row gap-2">
                    Label for Input Box: (Good Practice)

                  <input
                    value={reply}
                    onChange={e => setReply(e.target.value)}
                    required

                  />
                  <input type="submit" value="Submit" />
                </label>
            </form>
            </div>

            <p>{replyBack}</p>

            <form onSubmit={url}>
                <label> Submit
                <input
                    value={userInput}
                    onChange={e => setUserInput(e.target.value)}
                    required
                />
                </label>
                <label> 
                <input type="submit" value="Submit" />
                </label>
            </form>

            <p>Links Found:</p>
            {Array.isArray(backendCon) ? (
                <ul>
                    {backendCon.map((link, idx) => (
                        <li key={idx}>{link}</li>
                    ))}
                </ul>
            ) : (
                <p>{backendCon}</p> // error string or default
            )}
        </div>

    );
}
