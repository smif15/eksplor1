'use client'

import { useState } from 'react';
import FormPesan from './FormPesan';
import ListPesan from './ListPesan';

export default function ContainerPesan() {
    const [messages, setMessages] = useState([
        // { text: 'Ini dari user', isUser: true },
        // { text: 'Ini dari sistem', isUser: false },
        // { text: 'Ini dari user', isUser: true },
        // { text: 'Ini dari sistem', isUser: false },
        // { text: 'Ini dari user', isUser: true },
        // { text: 'Ini dari sistem', isUser: false },
        // { text: 'Ini dari user', isUser: true },
        // { text: 'Ini dari sistem', isUser: false },
        // { text: 'Ini dari user', isUser: true },
        // { text: 'Ini dari sistem', isUser: false },
        // { text: 'Ini dari user', isUser: true },
        // { text: 'Ini dari sistem', isUser: false },
        // { text: 'Ini dari user', isUser: true },
        // { text: 'Ini dari sistem', isUser: false },
        // { text: 'Ini dari user', isUser: true },
        // { text: 'Ini dari sistem', isUser: false },
        // { text: 'Ini dari user', isUser: true },
        // { text: 'Ini dari sistem', isUser: false },
        // { text: 'Ini dari user', isUser: true },
        // { text: 'Ini dari sistem', isUser: false },
        // { text: 'Ini dari user', isUser: true },
        // { text: 'Ini dari sistem', isUser: false }
    ]);

    const sendMessage = async (userMessage : Text) => {
        const newMessages = [...messages, {text: userMessage, isUser: true}];
        setMessages(newMessages);

        try{
            const response = await fetch('http://localhost:5000/api/gemini', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({question: userMessage})
            });
            const data = await response.json();

            setMessages(prevMessages => [
                ...prevMessages, 
                { text: data.answer, isUser: false }
            ]);
        } catch(error) {
            console.log('Error dalam mengambil data. Sebab:', error);
            setMessages(prevMessages => [
                ...prevMessages, 
                { text: 'Maaf, terjadi kesalahan pada sistem.', isUser: false }
            ]);
        };
    }

    return (
        <div>
            <h1 className="font-semibold text-2xl mb-4">Tanya</h1>
            <div className="border border-gray-400 border-dashed rounded-lg h-96 mb-2 p-4">
                {/* Riwayat pesan */}
                <ListPesan messages={messages} />
            </div>
            {/* Form kirim pesan */}
            <FormPesan onSend={sendMessage} />
        </div>
    )
}
