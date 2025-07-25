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
        <div>
            <p>{message}</p>

            <form onSubmit={front_input}>
                <input
                    value={reply}
                    onChange={e => setReply(e.target.value)}
                    required
                />
                <input type="submit" value="Submit" />
            </form>

            <p>{replyBack}</p>

            <form onSubmit={url}>
                <input
                    value={userInput}
                    onChange={e => setUserInput(e.target.value)}
                    required
                />
                <input type="submit" value="Crawl URL" />
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
