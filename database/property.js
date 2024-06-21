
const express = require('express');
const Router = express.Router();
const multer = require('multer');
const { authenticate } = require('./user');
const Property = require('./propertySchema');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { User } = require('./database');

const propertySecretKey = process.env.PROPERTYSECURITYKEY;
// Define a storage strategy for multer to handle file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public'); // Destination folder
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname); // Set the filename
    },
});

const upload = multer({ storage });

Router.get('/api/user/property', authenticate, (req, res) => {
    res.render('uploadRentDetails');
});

Router.post('/api/user/property', authenticate, upload.array('images'), async (req, res) => {
    try {
        const email = req.email;
        const findUser = await User.find({ email: email });
        console.log(req.body)
        if (findUser.length === 0) {
            return res.status(400).send('User not found');
        }

        const contactNo = findUser[0].phonenumber;

        const {
            propertyType,
            buildingName,
            facing,
            squareFeet,
            securityDeposit,
            furnishing,
            flooring,
            floor,
            ageOfConstruction,
            waterAvailability,
            numberOfLifts,
            electricityStatus,
            landmark,
            noOfBedroom,
            noOfBathroom,
            rentalValue,
            description,
            availableFor,
            availableFrom,
            noOfBalconies,
        } = req.body;

        const images = req.files.map(file => ({
            fileName: file.path,
        }));

        const address = {
            street: req.body['address.street'],
            area: req.body['address.area'],
            city: req.body['address.city'],
            state: req.body['address.state'],
            postalCode: req.body['address.postalCode'],
            country: req.body['address.country'],
        };

        // Check for missing or empty fields
        if (!propertyType ||
            !buildingName ||
            !facing ||
            !squareFeet ||
            !securityDeposit ||
            !furnishing ||
            !flooring ||
            !ageOfConstruction ||
            !waterAvailability ||
            !numberOfLifts ||
            !electricityStatus ||
            !landmark ||
            !noOfBedroom ||
            !noOfBathroom ||
            !rentalValue ||
            !description ||
            !availableFor ||
            !availableFrom ||
            !noOfBalconies ||
            !floor||
            !address.street ||
            !address.area ||
            !address.city ||
            !address.state ||
            !address.postalCode ||
            !address.country) {
            return res.status(400).send('Please fill out all the details.');
        }

        const propertyDetails = new Property({
            images,
            propertyType,
            buildingName,
            facing,
            contactNo,
            squareFeet,
            securityDeposit,
            furnishing,
            floor,
            flooring,
            ageOfConstruction,
            waterAvailability,
            numberOfLifts,
            landmark,
            noOfBedroom,
            availableFor,
            availableFrom,
            noOfBalconies,
            noOfBathroom,
            rentalValue,
            description,
            electricityStatus,
            address,
        });

        const saveData = await propertyDetails.save();
        console.log(saveData);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});


Router.get('/api/property', async (req, res) => {
    const { search, availableFor, furnishing, sortField, sortOrder, ageOfConstruction, noOfBedrooms,rentalValue } = req.query;
    console.log(req.query)

    try {
        // Build the search query based on the filter options
        const searchQuery = {};
        if (search) {
            console.log(search.split('('))
            searchQuery['address.city'] = { $regex: new RegExp(search.split('(')[0], 'i') };
        }

        if (availableFor) {
            searchQuery['availableFor'] = { $regex: new RegExp(availableFor, 'i') };;
        }

        if (furnishing) {
            searchQuery['furnishing'] = furnishing;
        }
        if (rentalValue) {
            searchQuery['rentalValue'] = {$lt:parseInt(rentalValue)};
        }
        // Extract the numbers from ageOfProperty using regex
        if (ageOfConstruction) {
            const match = ageOfConstruction.match(/\d+/);
            const age = match ? parseInt(match[0], 10) : null;
            if (age !== null) {
               searchQuery['ageOfConstruction'] = age;
            }
        }

        // Extract the numbers from noOfBedroom using regex
        if (noOfBedrooms) {
            const match = noOfBedrooms.match(/\d+/);
            const bedrooms = match ? parseInt(match[0], 10) : null;
            if (bedrooms !== null) {
                searchQuery['noOfBedroom'] = bedrooms;
            }
        }

        // Define an array of sort criteria
        let sortCriteria;

        if (sortField || sortOrder) {
            if (sortField === 'rentalValue') {
                sortCriteria = { rentalValue: sortOrder === 'asc' ? 1 : -1 };
            }
            if (sortField === 'ageOfConstruction') {
                sortCriteria = { ageOfConstruction: sortOrder === 'asc' ? 1 : -1 };
            }
            if (sortField === 'securityDeposit') {
                sortCriteria = { securityDeposit: sortOrder === 'asc' ? 1 : -1 };
            }
            if (sortField === 'noOfBedroom') {
                sortCriteria = { noOfBedroom: sortOrder === 'asc' ? 1 : -1 };
            }
            if (sortField === 'noOfBalconies') {
                sortCriteria = { noOfBalconies: sortOrder === 'asc' ? 1 : -1 };
            }
        }

        // Apply the sort criteria
        const Properties = await Property.find(searchQuery).sort(sortCriteria);

        const updatedProperties = Properties.map((property) => {
            const combinedAddress = property.address.area+" "+property.address.street+" "+property.address.city+" "+property.address.state+" "+property.address.postalCode+" "+property.address.country
            const imagePath = 'http://localhost:8800/';
            const removedPath = property.images[0].fileName.replace('public\\', '');
            const updatedImages = imagePath + removedPath;

            return {
                ...property.toObject(),
                address: combinedAddress,
                images: updatedImages,
            };
        });
        //console.log(updatedProperties)
        res.send([updatedProperties]);
    } catch (error) {
        console.log(error);
    }
});





Router.get('/api/property/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const property = await Property.findOne({ _id: id });

        if (!property) {
            return res.status(404).send('Property not found');
        }

        const findToken = req.cookies.propertyViewsToken;
        const uniqueToken = uuidv4();

        if (!findToken) {
            // If the user doesn't have a view token, generate one and store it in a cookie.
            property.views = property.views || [];
            property.views.push({ token: uniqueToken });
            await property.save();
            const token = jwt.sign({ uniqueToken }, propertySecretKey);
            res.cookie('propertyViewsToken', token, { httpOnly: true, expires: new Date(Date.now() + 24 * 60 * 60 * 1000) });
        }

        // Map the images to update their paths
        const imagePath = 'http://localhost:8800/';
        const updatedImages = property.images.map((image) => {
            const removedPath = image.fileName.replace('public\\', '');
            return { fileName: imagePath + removedPath };
        });

        const address = property.address.street + property.address.area + property.address.city + property.address.state + property.address.postalCode + property.address.country;

        // Update the property object with the modified images and address
        const updatedProperty = {
            ...property.toObject(),
            images: updatedImages,
            address: address,
        };

        res.send(updatedProperty);
    } catch (error) {
        console.log(error);
        // Handle other errors as needed.
        res.status(500).send('Internal Server Error');
    }
});

Router.post('/api/property/:id', authenticate, async (req, res) => {
    try {
        const details = req.body;
        const email = req.email;

        // Find the user by email
        const findUser = await User.findOne({ email });
        const name = findUser.firstname + ' ' + findUser.lastname;

        // Find the property by its ID
        const propertyId = req.params.id;
        const property = await Property.findById(propertyId);

        if (!property) {
            return res.status(404).send('Property not found');
        }

        // Check if the user has already commented
        const existingComment = property.comments.find((comment) => comment.name === name);

        if (existingComment) {
            // If the user has already commented, append to their existing comment
            existingComment.comment.push(details.comment);
        } else {
            // If it's the user's first comment on this property, create a new comment entry
            property.comments.push({
                name,
                comment: [details.comment]
            });
        }

        // Save the property with the updated comments
        await property.save();

        // Redirect back to the property page
        res.redirect(`/property/${propertyId}`);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
    }
});

// Add this route to your Express application
Router.post('/api/property/:id/like', authenticate, async (req, res) => {
    try {
        const propertyId = req.params.id;
        const property = await Property.findById(propertyId);

        // Check if the user has already liked this property
        const findUser = await User.findOne({ email: req.email });
        const name=findUser.firstname+' '+findUser.lastname
        if (property.likes.some((like) => like.name === name)) {
            return res.status(400).json({ error: 'You have already liked this property' });
        }

        // Increment the likes count and add the user's like to the property
        property.likes.push({
            name: name,
        });

        property.likesCount += 1;

        // Save the property with the updated likes
        await property.save();

        res.redirect(`/property/${propertyId}`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports=Router
