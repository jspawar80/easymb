import React, { useState } from 'react';
import axios from 'axios';

const BulkUploadForm = () => {
    const [file, setFile] = useState(null);
    const [responseMessage, setResponseMessage] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5000/api/components/bulk-upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setResponseMessage(response.data.message);
        } catch (error) {
            setResponseMessage('Failed to upload file.');
        }
    };

    return (
        <div>
            <h2>Bulk Upload Components</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Select Excel File:</label>
                    <input type="file" onChange={handleFileChange} />
                </div>
                <button type="submit">Upload</button>
            </form>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
};

export default BulkUploadForm;
