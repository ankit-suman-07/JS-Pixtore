const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const Image = require('./model/ImageModel');
const cors = require('cors');

const MONGO_DB_URI = process.env.MONGO_DB_URI;
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_DB_URI, {
});

app.post('/', async (request, response) => {
    try {
        const { email, imgURL } = request.body;

        if (!email || !imgURL) {
            return response.status(400).send({
                message: 'Required fields missing!!!',
            });
        }

        const newImage = {
            email,
            imgURL
        };

        const image = await Image.create(newImage);

        return response.status(201).send(image);
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message });
    }
});


app.get('/', async (request, response) => {
    try {
        const images = await Image.find({});



        return response.status(200).json({
            count: images.length,
            data: images,
        });
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message });
    }
});


app.get('/:email', async (request, response) => {
    try {
        const { email } = request.params;
        const image = await Image.findById(email);

        return response.status(200).json(image);
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message });
    }
});



app.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Image.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Image not found' });
        }

        return response.status(200).send({ message: 'Image deleted successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});


module.exports = app;
