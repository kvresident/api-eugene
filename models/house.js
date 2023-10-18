const mongoose = require('mongoose');

class ThreeDimension{
    /**
     * 
     * @param {Number} length 
     * @param {Number} width 
     * @param {Number} height 
     */
    constructor(length, width, height){
        this.height = height;
        this.width = width;
        this.length = length;
        this.volume = length*width*height
    }
}

const payment ={type: String, enum: ['tenant', 'owner', 'not available'], default: 'not available'}
const houseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    town: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    profilePhoto: {type: String, required: true},
    coverPhoto: {type: String, required: true},
    images: [{ type: String, required: true }],
    landLord: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
    rooms: { type: Number, required: true },
    houseSize: { type: String, required: true },
    depositRequired: { type: Boolean, default: false },
    furniture: [{ type: String }],
    floor: {type: String, enum :['hardwood', 'tile', 'carpet', 'laminate', 'vinyl', 'concrete', 'stone', 'cork', 'bamboo', 'linoleum', 'none'], default:'none'},
    ceiling: {type: String, enum: ['popcorn', 'tray', 'coffered', 'vaulted', 'beam', 'tongue and groove', 'pendant', 'exposed ductwork', 'cathedral', 'none'], default: 'none'},
    rentalType: {type: String, enum: ['apartments', 'houses', 'condos', 'duplexes/triplexes', 'townhomes', 'studios', 'lofts', 'shared rooms/houses', 'short-term rentals', 'vacation rentals', 'corporate rentals', 'roommate rentals', 'none'], default: 'none'},
    gated: {type: Boolean, default: false},
    dustyRoadDistance: {type: Number},
    distanceFromCBD:{ type: Number},
    vacant: {type: Number, default: 0},
    internetSpeed: {type: String, default: '1mbps U, 1mbps D'},
    paymentMethods: [{type: String}],
    water: payment,
    electricity: payment,
    wifi: payment,
    map: {type: String}
  },
  { timestamps: true }
);

const House = mongoose.model('House', houseSchema)
module.exports = House
