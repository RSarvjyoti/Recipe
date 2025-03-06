const {Schema, model} = require("mongoose");

const recipeSchema = new Schema({
    title : {type : String, required : true},
    dec : {type : String},
    image : {type : String, default : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fgood-food&psig=AOvVaw1WSBhUIhSqPwPQr5-Raih2&ust=1741339955215000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKiD-_2S9YsDFQAAAAAdAAAAABAE"},
    category: {
        type: String,
        required: true,
        enum: ["Vegetarian", "Vegan", "Non-Vegetarian", "Dessert", "Beverage", "Snack"],
      },
    calories: { type: Number, required: true, min: 0 },
},{
    timestamps : true
})

const Recipe = model('Recipe', recipeSchema);
module.exports = Recipe;