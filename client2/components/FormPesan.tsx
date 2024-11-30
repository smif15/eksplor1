'use client'

import { useState } from 'react';

export default function FormPesan({onSend}) {
    const [input,setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(input.trim() !== '') {
            onSend(input);
            setInput('');
        }
    };



    return (
        <form onSubmit={handleSubmit} className="border border-dashed border-gray-400 rounded-lg p-2 flex bg-gray-100">
            <input
                className="bg-gray-100 text-sm rounded-md block w-full focus:outline-none"
                placeholder="Tuliskan pesanmu di sini"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-base rounded-lg text-sm px-4 py-2"
            >
                Kirim
            </button>
        </form>
    )
}
