const mongoose = require('mongoose');

// Schema definition
const pageSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        trim: true,
    },
    companyDescription: {
        type: String,
        required: true,
        trim: true,
    },
    companyAddress: {
        type: String,
        required: true,
        trim: true,
    },
    companyEmail: {
        type: String,
        required: true,
        trim: true,
    },
    companyPhone: {
        type: Number,
        required: true,
    },
    companyLogo: {
        type: String,
        required: true,
    },
    banners: [
        {
            companyBanner: {
                type: String,
                required: true
            },
            companybannertitle: {
                type: String,
                required: true,
                trim: true
            },
            companybannertext: {
                type: String,
                required: true,
                trim: true
            }
        }
    ],
    about: [
        {
            homeabout: {
                type: String,
                required: true
            },
            about: {
                type: String,
                required: true,
                trim: true
            },
        }
    ],
    product:[
        {
            productName: {
                type: String,
                required: true,
            },
            productDescription: {
                type: String,
                required: true,
            },
            productImage: {
                type: String,
                required: true,
            },
            productPrice: {
                type: Number,
                required: true,
            },
        }
    ],  
    services:[
        {
            serviceName: {
                type: String,
                required: true,
            },
            serviceDescription: {
                type: String,
                required: true,
            },
            serviceImage: {
                type: String,
                required: true,
            },
            servicePrice: {
                type: Number,
                required: true,
            },
        }
    ],  
    testimonials: [
        {
            testimonialName: {
                type: String,
                required: true,
                trim: true,
            },
            testimonialText: {
                type: String,
                required: true,
                trim: true,
            },
            testimonialImage: {
                type: String,
                required: true,
            },
            testimonialRating: {
                type: Number,
                required: true,
                min: 1,
            },
        }
    ],
    companySocialLinks: {
        facebook: {
            type: String,
            trim: true,
        },
        twitter: {
            type: String,
            trim: true,
        },
        linkedin: {
            type: String,
            trim: true,
        },
    },

    lastUpdated: {
        type: Date,
        default: Date.now
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Register', // Reference to the Register model
        required: true,
    }
}, { collection: 'pages' }); // 👈 Explicitly setting the collection name

// Model creation
const Page = mongoose.model('Page', pageSchema);

module.exports = Page;
