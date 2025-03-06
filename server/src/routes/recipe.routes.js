const {Router} = require("express");
const { getRecipes, createRecipe, updateRecipe, deleteRecipe } = require("../controllers/recipeControllers");
const loggerMiddleware = require("../middleware/logger");

const recipeRoute = Router();

recipeRoute.get('/read',loggerMiddleware, getRecipes);
recipeRoute.post('/create',loggerMiddleware, createRecipe);
recipeRoute.put('/update/:id',loggerMiddleware, updateRecipe);
recipeRoute.delete('/delete/:id',loggerMiddleware, deleteRecipe);

module.exports= recipeRoute;