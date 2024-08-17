const Component = require('../models/Component');
const XLSX = require('xlsx');

// Get all components
const getComponents = async (req, res) => {
    try {
        const components = await Component.find();
        res.json(components);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching components' });
    }
};

// Create a single component
const createComponent = async (req, res) => {
    const { name, type } = req.body;

    const existingComponent = await Component.findOne({ name, type });

    if (existingComponent) {
        return res.status(400).json({ message: 'Component already exists' });
    }

    const component = new Component({ name, type });

    try {
        await component.save();
        res.status(201).json(component);
    } catch (error) {
        res.status(500).json({ message: 'Error creating component' });
    }
};

// Get a component by ID
const getComponentById = async (req, res) => {
    try {
        const component = await Component.findById(req.params.id);
        if (component) {
            res.json(component);
        } else {
            res.status(404).json({ message: 'Component not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching component' });
    }
};

// Update a component
const updateComponent = async (req, res) => {
    const { name, type } = req.body;

    try {
        const component = await Component.findById(req.params.id);
        if (component) {
            component.name = name || component.name;
            component.type = type || component.type;
            await component.save();
            res.json(component);
        } else {
            res.status(404).json({ message: 'Component not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating component' });
    }
};

// Delete a component
const deleteComponent = async (req, res) => {
    try {
        const component = await Component.findByIdAndDelete(req.params.id);
        if (component) {
            res.json({ message: 'Component deleted' });
        } else {
            res.status(404).json({ message: 'Component not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting component' });
    }
};

// Bulk upload components from an Excel file
const bulkUploadComponents = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const createdComponents = [];
    const existingComponents = [];

    for (let row of sheetData) {
        const { Name, Type } = row;

        if (!Name || !Type) {
            continue; // Skip rows that don't have necessary data
        }

        // Check if the component already exists
        const existingComponent = await Component.findOne({ name: Name, type: Type });

        if (existingComponent) {
            existingComponents.push(existingComponent);
        } else {
            // Create the new component
            const newComponent = new Component({
                name: Name,
                type: Type,
            });
            await newComponent.save();
            createdComponents.push(newComponent);
        }
    }

    res.status(201).json({
        message: `${createdComponents.length} components created, ${existingComponents.length} components already existed.`,
        createdComponents,
        existingComponents,
    });
};

module.exports = {
    getComponents,
    createComponent,
    getComponentById,
    updateComponent,
    deleteComponent,
    bulkUploadComponents,
};
