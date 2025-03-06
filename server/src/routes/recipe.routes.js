const {Router} = require("express");
const { getRecipes, createRecipe, updateRecipe, deleteRecipe } = require("../controllers/recipeControllers");

const recipeRoute = Router();

recipeRoute.get('/read',getRecipes);
recipeRoute.post('/create', createRecipe);
recipeRoute.put('/update/:id', updateRecipe);
recipeRoute.delete('/delete/:id', deleteRecipe);

module.exports= recipeRoute;