
import React from 'react';

const AddNotes: React.FC = () => (
    <div className="border-t border-gray-800 mt-6 pt-4">
        <button className="w-full flex justify-between items-center text-left text-white py-2">
            <span className="text-lg">Add Notes</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
        </button>
    </div>
);

export default AddNotes;
