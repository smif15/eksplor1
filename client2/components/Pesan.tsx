export default function Pesan({ message, isUser }:{message: string, isUser: boolean}) {
    return (
        <div className={`border text-sm rounded-lg h-auto w-fit max-w-3/4 p-2 ${
            isUser ? 'self-end bg-gray-100 border-gray-400' : 'self-start bg-gray-200 border-gray-400'
            }`}>
            {message}
        </div>
    );
}