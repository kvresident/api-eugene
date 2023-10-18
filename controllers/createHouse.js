const path = require('path')
const House = require('../models/house')
const { houseImageUrl } = require('../urls')

// middleware function to handle profilePhoto and coverPhoto uploads
const uploadHousePhotos = async (req, res, next) => {
    // check if files were uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: 'No files were uploaded.' });
    }
  
    // extract profilePhoto and coverPhoto files from request
    const { profilePhoto, coverPhoto } = req.files;
  
    // check if profilePhoto and coverPhoto files were provided
    if (!profilePhoto || !coverPhoto) {
      return res.status(400).json({ message: 'Both profilePhoto and coverPhoto files are required.' });
    }
  
    try {
      // move profilePhoto and coverPhoto files to the uploads directory
      await profilePhoto.mv(`${houseImageUrl}/_profile_${profilePhoto.name}`);
      await coverPhoto.mv(`${houseImageUrl}/_cover_${coverPhoto.name}`);
  
      // add profilePhoto and coverPhoto URLs to request body
      req.body.profilePhoto = `_profile_${profilePhoto.name}`;
      req.body.coverPhoto = `_cover_${coverPhoto.name}`;
  
      // call next middleware function
      next();
    } catch (err) {
      return res.status(500).json({ message: 'Error uploading photos.' });
    }
  };
  
// middleware function to handle images array uploads
const uploadHouseImages = async (req, res, next) => {
// check if files were uploaded
if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ message: 'No files were uploaded.' });
}

// extract images files from request
const { images } = req.files;

// check if images files were provided
if (!images) {
    return res.status(400).json({ message: 'At least one image file is required.' });
}

try {
    // move images files to the uploads directory
    const imageUrls = [];
    if (!Array.isArray(images)) {
    await images.mv(`${houseImageUrl}/_image_${images.name}`);
    imageUrls.push(`_image_${images.name}`);
    } else {
    for (const image of images) {
        await image.mv(`${houseImageUrl}/_image_${image.name}`);
        imageUrls.push(`_image_${image.name}`);
    }
    }

    // add image URLs to request body
    req.body.images = imageUrls;

    // call next middleware function
    next();
} catch (err) {
    return res.status(500).json({ message: 'Error uploading images.' });
}
};

const createHouse = async (req, res) => {
  const {
    name,
    description,
    price,
    town,
    country,
    profilePhoto,
    coverPhoto,
    images,
    landLord,
    rooms,
    houseSize,
    depositRequired,
    furniture,
    floor,
    ceiling,
    rentalType,
    gated,
    dustyRoadDistance,
    distanceFromCBD,
    vacant,
    internetSpeed,
    paymentMethods,
    water,
    electricity,
    wifi,
    map
  } = req.body;
  function arrayIze(txt, separator){
    if(Array.isArray(txt)){
        return txt;
    }else{
        return txt.split(separator)
    }
  }
  try {
    const newHouse = new House({
      name,
      description,
      price,
      town,
      country,
      profilePhoto,
      coverPhoto,
      images,
      landLord,
      rooms,
      houseSize,
      depositRequired,
      furniture: arrayIze(furniture, ','),
      floor,
      ceiling,
      rentalType,
      gated,
      dustyRoadDistance,
      distanceFromCBD,
      vacant,
      internetSpeed,
      paymentMethods: arrayIze(paymentMethods, ','),
      water,
      electricity,
      wifi,
      map
    });

    const savedHouse = await newHouse.save();
    res.status(201).json(savedHouse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating house' });
  }
};

module.exports = {
  createHouse, uploadHouseImages, uploadHousePhotos
};
