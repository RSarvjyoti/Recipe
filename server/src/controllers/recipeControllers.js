const Recipe = require("../models/recipe.model");

const createRecipe = async (req, res) => {
    try {
        const { title, dec, image, category, calories } = req.body;
        if (!title || !category || calories === undefined) {
            return res.status(400).json({ message: "Title, category, and calories are required." });
        }
        const newRecipe = new Recipe({
            title,
            dec,
            image,
            category,
            calories,
        });
        await newRecipe.save();

        res.status(201).json({ message: "Recipe created successfully!", recipe: newRecipe });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

const updateRecipe = async (req, res) => {
    try {
        const { id } = req.params; 
        const updates = req.body;
        const updatedRecipe = await Recipe.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!updatedRecipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        res.status(200).json({ message: "Recipe updated successfully", recipe: updatedRecipe });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
}

const deleteRecipe = async (req, res) => {
    try {
        const { id } = req.params; // Get recipe ID from URL
        const deletedRecipe = await Recipe.findByIdAndDelete(id);

        if (!deletedRecipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        res.status(200).json({ message: "Recipe deleted successfully", recipe: deletedRecipe });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

const getRecipes = async (req, res) => {
    try {
        const { category, page = 1, limit = 10, sort } = req.query;

        // Build query object
        const query = {};
        if (category) {
            query.category = category;
        }

        // Convert pagination values to numbers
        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);
        const skip = (pageNumber - 1) * limitNumber;

        // Create query with pagination, filtering, and sorting
        const recipes = await Recipe.find(query)
            .sort(sort ? { [sort]: 1 } : {}) // Sort dynamically
            .skip(skip)
            .limit(limitNumber);

        // Get total count for pagination metadata
        const totalRecipes = await Recipe.countDocuments(query);

        res.status(200).json({
            totalRecipes,
            currentPage: pageNumber,
            totalPages: Math.ceil(totalRecipes / limitNumber),
            recipes
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

module.exports = {createRecipe, updateRecipe, deleteRecipe, getRecipes};