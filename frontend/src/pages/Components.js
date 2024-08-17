import React, { useEffect, useState } from 'react';
import { getComponents, createComponent, deleteComponent } from '../services/api';
import BulkUploadForm from '../components/BulkUploadForm';
import Modal from '../components/Modal';

const Components = () => {
    const [components, setComponents] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showBulkUpload, setShowBulkUpload] = useState(false);
    const [newComponentName, setNewComponentName] = useState('');
    const [newComponentType, setNewComponentType] = useState('');
    const [newComponentImage, setNewComponentImage] = useState(null);

    useEffect(() => {
        fetchComponents();
    }, []);

    const fetchComponents = async () => {
        const response = await getComponents();
        setComponents(response.data);
    };

    const handleAddComponent = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', newComponentName);
        formData.append('type', newComponentType);
        formData.append('image', newComponentImage);

        await createComponent(formData);
        setNewComponentName('');
        setNewComponentType('');
        setNewComponentImage(null);
        setShowForm(false);
        fetchComponents();  // Refresh the components list
    };

    const handleDeleteComponent = async (id) => {
        await deleteComponent(id);
        fetchComponents();  // Refresh the components list
    };

    return (
        <div>
            <h1>Components</h1>
            <button onClick={() => setShowForm(true)}>
                Add New Component
            </button>
            <button onClick={() => setShowBulkUpload(true)}>
                Bulk Upload Components
            </button>

            {/* Modal for Add New Component */}
            <Modal
                isOpen={showForm}
                onRequestClose={() => setShowForm(false)}
                title="Add New Component"
            >
                <form onSubmit={handleAddComponent}>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            value={newComponentName}
                            onChange={(e) => setNewComponentName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Type:</label>
                        <input
                            type="text"
                            value={newComponentType}
                            onChange={(e) => setNewComponentType(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Image:</label>
                        <input
                            type="file"
                            onChange={(e) => setNewComponentImage(e.target.files[0])}
                        />
                    </div>
                    <button type="submit">Add Component</button>
                </form>
            </Modal>

            {/* Modal for Bulk Upload */}
            <Modal
                isOpen={showBulkUpload}
                onRequestClose={() => setShowBulkUpload(false)}
                title="Bulk Upload Components"
            >
                <BulkUploadForm />
            </Modal>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {components.map(component => (
                        <tr key={component._id}>
                            <td>{component.name}</td>
                            <td>{component.type}</td>
                            <td>
                                {component.image && <img src={`http://localhost:5000/${component.image}`} alt={component.name} width="50" />}
                            </td>
                            <td>
                                <button onClick={() => handleDeleteComponent(component._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Components;
