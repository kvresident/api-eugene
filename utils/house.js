class Description{
  /**
   * 
   * @param {String} name 
   * @param {String} description 
   */
  constructor(name, description){
      this.name = name;
      this.description = description
  }
}
const floorTypes = [
    {
      name: 'Hardwood',
      description: 'Made from solid wood planks or engineered wood products that are designed to look like wood. Timeless and popular flooring choice.',
    },
    {
      name: 'Tile',
      description: 'Durable and easy-to-clean flooring made from ceramic or porcelain tiles. Comes in various shapes, sizes, and colors, and can be used in many different rooms.',
    },
    {
      name: 'Carpet',
      description: 'Soft and comfortable flooring that is made from woven fibers. Provides warmth and insulation to a room, and comes in many different colors and patterns.',
    },
    {
      name: 'Laminate',
      description: 'Durable and affordable flooring made from a combination of wood fibers and resin. Can be designed to look like many different types of flooring, including hardwood and tile.',
    },
    {
      name: 'Vinyl',
      description: 'Water-resistant and easy-to-clean flooring made from synthetic materials. Can be designed to look like many different types of flooring, including hardwood and tile.',
    },
    {
      name: 'Concrete',
      description: 'Durable and long-lasting flooring made from a mixture of cement, water, and aggregates. Can be left as is, or can be polished, painted, or stained to create a decorative finish.',
    },
    {
      name: 'Stone',
      description: 'Luxurious and elegant flooring made from natural stone, such as granite, marble, or slate. Can be used in many different rooms, and is especially popular in bathrooms and kitchens.',
    },
    {
      name: 'Cork',
      description: 'Eco-friendly and comfortable flooring made from the bark of cork trees. Provides natural insulation and is resistant to mold, mildew, and insects.',
    },
    {
      name: 'Bamboo',
      description: 'Sustainable and durable flooring made from bamboo stalks. Comes in many different colors and styles, and is often used in modern and eco-friendly homes.',
    },
    {
      name: 'Linoleum',
      description: 'Eco-friendly and easy-to-clean flooring made from natural materials, such as linseed oil, cork dust, and wood flour. Comes in many different colors and patterns.',
    },
  ].map(d=> new Description(d.name, d.description));
const ceilingTypes = [
  {
    name: 'Popcorn',
    description: 'Also known as acoustic or textured ceilings, popcorn ceilings were popular in the mid-20th century. They are made from a spray-on or paint-on material that gives the ceiling a bumpy, textured appearance. Many homeowners today choose to remove popcorn ceilings due to potential health hazards associated with the material.',
  },
  {
    name: 'Tray',
    description: 'Tray ceilings are a popular choice for adding visual interest to a room. They are characterized by a recessed, flat center surrounded by a raised border. They can be simple or ornate, and can be used to create a variety of moods and styles.',
  },
  {
    name: 'Coffered',
    description: 'Coffered ceilings feature a series of sunken panels surrounded by raised beams. They are often used in formal spaces, such as dining rooms or libraries, to add a sense of elegance and sophistication.',
  },
  {
    name: 'Vaulted',
    description: 'Vaulted ceilings are characterized by a high, sloping ceiling that follows the roofline of the house. They create a sense of openness and spaciousness, and are often used in living rooms or great rooms.',
  },
  {
    name: 'Beam',
    description: 'Beam ceilings feature exposed wooden beams that add rustic charm and warmth to a room. They can be used in a variety of styles, from traditional to modern.',
  },
  {
    name: 'Tongue and Groove',
    description: 'Tongue and groove ceilings are made from interlocking wooden boards that create a seamless, streamlined look. They are often used in cottages or cabins to create a cozy, intimate atmosphere.',
  },
  {
    name: 'Pendant',
    description: 'Pendant ceilings feature decorative hanging lights that are suspended from the ceiling. They can be used to add a focal point to a room, or to create a cozy, intimate atmosphere.',
  },
  {
    name: 'Exposed Ductwork',
    description: 'Exposed ductwork ceilings are often used in industrial-style spaces, such as lofts or warehouses. They feature exposed pipes and ductwork, which add a sense of rawness and authenticity to the space.',
  },
  {
    name: 'Cathedral',
    description: 'Cathedral ceilings are similar to vaulted ceilings, but are characterized by a symmetrical, triangular shape that follows the roofline of the house. They create a sense of grandeur and drama, and are often used in churches or other formal spaces.',
  },
].map(d=> new Description(d.name, d.description));;
const rentalTypes = [
    {
      name: "Apartments",
      description: "Self-contained living units that are typically part of a larger building complex.",
    },
    {
      name: "Houses",
      description: "Standalone living spaces that are detached from other structures.",
    },
    {
      name: "Condos",
      description: "Similar to apartments, but units are individually owned rather than rented from a landlord.",
    },
    {
      name: "Duplexes/Triplexes",
      description: "Buildings that are split into two or three separate living spaces.",
    },
    {
      name: "Townhomes",
      description: "Similar to duplexes/triplexes, but usually have more than three units and are designed to look like a row of single-family homes.",
    },
    {
      name: "Studios",
      description: "Smaller living spaces that are typically open concept, with a single room that combines the bedroom, living room, and kitchen.",
    },
    {
      name: "Lofts",
      description: "Large, open living spaces that were originally commercial or industrial buildings.",
    },
    {
      name: "Shared Rooms/Houses",
      description: "Living spaces in which tenants share common areas, such as the kitchen and living room, but have their own private bedroom.",
    },
    {
      name: "Short-term Rentals",
      description: "Rental properties that are available for a shorter period of time, usually less than a year.",
    },
    {
      name: "Vacation Rentals",
      description: "Rental properties that are used for short-term stays during vacations or other travel.",
    },
    {
      name: "Corporate Rentals",
      description: "Rental properties that are used for temporary business or work-related stays.",
    },
    {
      name: "Roommate Rentals",
      description: "Rental arrangements in which one person rents a room in another person's house or apartment.",
    }
  ].map(d=> new Description(d.name, d.description));;

/**
 * 
 * @param {String} name 
 * @param {[String]} names 
 * @param {[Description]} fullData 
 * @returns 
 */
function getDescription(name, names, fullData){
    if(name === 'none'){
        return new Description('none', 'No description')
    }
    let index = names.map(d=>d.toLowerCase()).indexOf(name.toLowerCase());

    return fullData[index]
}
/**
 * 
 * @param {String} floorType 
 * @returns {Description}
 */
function getFloorDescription(floorType){
    return getDescription(
        floorType,
        ['hardwood', 'tile', 'carpet', 'laminate', 'vinyl', 'concrete', 'stone', 'cork', 'bamboo', 'linoleum'],
        floorTypes
    )
}
/**
 * 
 * @param {String} ceilingType 
 * @returns {Description}
 */
function getCeilingDescription(ceilingType){ 
    return getDescription(
        ceilingType,
        ['popcorn', 'tray', 'coffered', 'vaulted', 'beam', 'tongue and groove', 'pendant', 'exposed ductwork', 'cathedral'],
        ceilingTypes
    )
}
/**
 * 
 * @param {String} rentalType 
 * @returns {Description}
 */
function getRentalTypeDescription(rentalType){
    return getDescription(
        rentalType,
        ['apartments', 'houses', 'condos', 'duplexes/triplexes', 'townhomes', 'studios', 'lofts', 'shared rooms/houses', 'short-term rentals', 'vacation rentals', 'corporate rentals', 'roommate rentals'],
        rentalTypes
    )
}
module.exports = {
    getFloorDescription,
    getCeilingDescription,
    getRentalTypeDescription,
    floorTypes,
    ceilingTypes,
    rentalTypes
}