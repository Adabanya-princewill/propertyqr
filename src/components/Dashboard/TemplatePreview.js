import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectTemplate } from '../redux/listingsSlice';

const TemplatePreview = ({ templates }) => {
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const dispatch = useDispatch();

    const handleTemplateClick = (template) => {
        setSelectedTemplate(template);
    };

    const handleConfirmSelection = () => {
        if (selectedTemplate) {
            dispatch(selectTemplate(selectedTemplate));
            alert(`Template "${selectedTemplate.name}" selected!`);
        }
    };

    return (
        <div className="template-preview">
            <h2>Select a Template for Your Listing</h2>
            <div className="template-list">
                {templates.map((template) => (
                    <div 
                        key={template.id} 
                        className={`template-item ${selectedTemplate?.id === template.id ? 'selected' : ''}`}
                        onClick={() => handleTemplateClick(template)}
                    >
                        <h3>{template.name}</h3>
                        <p>{template.description}</p>
                        <button onClick={() => alert(`Previewing ${template.name}`)}>Preview</button>
                    </div>
                ))}
            </div>
            <button disabled={!selectedTemplate} onClick={handleConfirmSelection}>
                Confirm Template
            </button>
        </div>
    );
};

export default TemplatePreview;
