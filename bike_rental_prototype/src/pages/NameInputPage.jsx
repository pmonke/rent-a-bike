import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFullName } from '../contexts/FullNameContext';

export default function NamePage() {
    const { setFullName } = useFullName();
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim()) {
            setFullName(name.trim());
            navigate('/home'); 
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
            <h1 className="text-3xl font-bold mb-4">Welcome to the Study Portal</h1>
            <p className="mb-6 text-gray-700 max-w-md">
                Before we begin, we’d love to know your full name — just to keep track of your responses
                (nothing will be shared).
                <br />
                Please enter your name to continue:
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
                <input
                    type="text"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 w-64 text-center"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white rounded-md p-2 w-32 hover:bg-blue-700 transition"
                >
                    Continue →
                </button>
            </form>
        </div>
    );
}