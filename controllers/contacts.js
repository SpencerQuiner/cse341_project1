const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags =['Contacts']
    const result = await mongodb.getDatabase().collection('contacts').find();
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts)
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags =['Contacts']
    const contactId = new ObjectId(req.params.id)
    const result = await mongodb.getDatabase().collection('contacts').findOne({_id: contactId});
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result)  
};

const createContact = async(req, res) => {
    //#swagger.tags =['Contacts']
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthDate
    };
    const response = await mongodb.getDatabase().collection('contacts').insertOne(contact);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'some error occurred while creating the contact.');
    }
};

const updateContact = async(req, res) => {
    //#swagger.tags =['Contacts']
    const contactId = new ObjectId(req.params.id);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthDate
    };
    const response = await mongodb.getDatabase().collection('contacts').replaceOne({_id: contactId}, contact);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'some error occurred while updating the contact.');
    }
};

const deleteContact = async(req, res) => {
    //#swagger.tags =['Contacts']
    const contactId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().collection('contacts').deleteOne({_id: contactId}, true);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'some error occurred while deleting the contact.');
    }
};

module.exports = {
    getAll, 
    getSingle, 
    createContact, 
    updateContact, 
    deleteContact
};