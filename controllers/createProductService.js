const {Product, Service} = require('../models/productsAndServices')

async function create(data, type){
    try {
        let d = null;
        if(type=='product'){
            d=Product
        }else{
            d=Service
        }

        const sp = new d(data);
        await sp.save()

        return sp;
    } catch (error) {
        return new Error(error)
    }

}
// Controller for creating a new product or service
const createProductService = async (req, res) => {
    try {
      const { name, description, price, type, images } = req.body;
  
      const product = create({
        name,
        description,
        price,
        images,
        seller: req.user._id, // Assuming the user is authenticated and the user ID is in the request object
      }, type);
  
      await product.save();
      res.status(201).json({ message: 'Product or service created successfully', product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Controller for saving photos
  const savePhotos = async (req, res) => {
    try {
      const { id } = req.params;
  
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: 'Product or service not found' });
      }
  
      if (req.files && req.files.images) {
        const images = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
        images.forEach((image) => {
          product.images.push(image.name);
          image.mv(`uploads/${image.name}`);
        });
  
        await product.save();
      }
  
      res.status(200).json({ message: 'Photos saved successfully', product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  