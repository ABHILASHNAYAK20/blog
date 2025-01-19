import { ChangeEvent } from 'react';
import { useState } from 'react';
import { Appbar } from '../components/Appbar';
import { BACKEND_URL } from '../config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-300 via-white to-blue-200">
            <Appbar />
            <div className="flex justify-center items-center w-full pt-8">
                <div className="max-w-screen-lg w-full space-y-6 bg-white rounded-lg p-8 shadow-xl">
                    {/* Title Input */}
                    <input 
                        onChange={(e) => setTitle(e.target.value)} 
                        type="text" 
                        value={title}
                        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-4 focus:ring-blue-300 focus:outline-none block p-3 transition-transform transform hover:scale-105"
                        placeholder="Title" 
                    />

                    {/* Text Editor */}
                    <TextEditor onChange={(e) => setDescription(e.target.value)} />

                    {/* Publish Button */}
                    <button 
                        onClick={async () => {
                            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                                title,
                                content: description
                            }, {
                                headers: {
                                    Authorization: localStorage.getItem("token")
                                }
                            });
                            navigate(`/blog/${response.data.id}`);
                        }} 
                        type="submit" 
                        className="mt-4 inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800 hover:scale-105 transition-transform"
                    >
                        Publish post
                    </button>
                </div>
            </div>
        </div>
    );
};

function TextEditor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
    return (
        <div className="mt-6">
            <label htmlFor="editor" className="sr-only">Write your post content</label>
            <textarea 
                onChange={onChange} 
                id="editor" 
                rows={8} 
                className="w-full bg-gray-100 text-gray-800 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-300 focus:outline-none text-lg p-4 transition-transform transform hover:scale-105"
                placeholder="Write your article..."
                required 
            />
        </div>
    );
}
