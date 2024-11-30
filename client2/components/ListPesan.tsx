import Pesan from './Pesan';

export default function ListPesan({messages}) {
    return (
        <div className="border border-gray-400 rounded-lg h-full overflow-y-auto flex flex-col gap-4 p-4">
            {messages.map((msg,index) => (
                <Pesan key={index} message={msg.text} isUser={msg.isUser} />
            ))}
        </div>
    )
}
