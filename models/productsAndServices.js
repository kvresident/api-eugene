const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  photos: [{ type: String }],
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  quantity: { type: Number, default: 1 },
  location: {
    type: {
      type: String,
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      required: true,
    },
    formattedAddress: {
      type: String,
    },
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zipcode: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  datePosted: { type: Date, default: Date.now() },
});

productSchema.index({ location: '2dsphere' });

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  photos: [{ type: String }],
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  location: {
    type: {
      type: String,
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      required: true,
    },
    formattedAddress: {
      type: String,
    },
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zipcode: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  datePosted: { type: Date, default: Date.now() },
});

serviceSchema.index({ location: '2dsphere' });

const Product = mongoose.model('Product', productSchema);
const Service = mongoose.model('Service', serviceSchema);

module.exports = {
  Product,
  Service,
};
