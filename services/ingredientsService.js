const {
  findingredientsModel,
  createingredientsModel,
  getIngredientsModel,
} = require("../models/ingredientsModel");
const { ingredientSchema } = require("../utils/schemas");
const errorHandling = require("../utils/errorHandling");
const { badRequest, conflict, notFound } = require("../utils/dictionary");

const getIngredientsService = async () => {
  const ingredients = await getIngredientsModel();

  if (!ingredients) throw errorHandling(notFound, "There is no ingredients");

  return ingredients;
};

const createIngredientsService = async ({ name, measurement, unitPrice }) => {
  const { error } = ingredientSchema.validate({
    name,
    measurement,
    unitPrice,
  });
  if (error) throw errorHandling(badRequest, error.message);

  const ingredient = await findingredientsModel(name);
  if (ingredient) throw errorHandling(conflict, "Ingredient already exists");

  const ingredientId = await createingredientsModel(
    name,
    measurement,
    unitPrice
  );

  return {
    _id: ingredientId,
    name,
    measurement,
    unitPrice,
  };
};

module.exports = {
  createIngredientsService,
  getIngredientsService,
};
