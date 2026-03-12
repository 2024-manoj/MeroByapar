const Category = require("../model/Category");
// const Store = require("../model/Store");

const createCategory = async (req, res) => {
  try {
    const { category_name, description, image, store_id } = req.body;
    const existingCategory = await Category.findOne({
      category_name,
      store_id,
    });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "यो category पहिले नै छ!",
      });
    }

    const category = new Category({
      category_name,
      description,
      image,
      store_id,
    });

    await category.save();

    res.status(201).json({
      success: true,
      message: "tapaiko safalto purbak naya category banaunu vako xa !!!",
      data: category,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const category = await Category.find().populate("store_id");
    res.status(200).json({
      success: true,
      message: "Tapaiko category safalta purbak sabei yesh prakar rakheko xan",
      data: category,
      count: category.length,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

const getCategoryById = async (req, res) => {
  try {
    // const { store_id } = req.query;
    const category = await Category.findById(req.params.id).populate(
      "store_id",
    );
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "category nei vetiyeni ni hou",
      });
    }
    res.status(201).json({
      success: true,
      data: category,
      message: "timiley kojeko yes prakarkoo ko xa haii data ",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { category_name, description, image } = req.body;

    let category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "category nai xoina",
      });
    }

    category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        category_name,
        description,
        image,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      success: true,
      messaage: "tapiko safalta purbak naya category section halnu vayo",
      data: category,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(500).json({
        success: false,
        message:
          "tapaiko jun catgory lai delete garnu  paro tesko id nai xoina ",
      });
    }

    await Category.deleteOne();

    res.status(200).json({
      sucess: true,
      message: "tapilo delete garnu parne successfully delete boisako haii ",
    });
  } catch (err) {
    res.status(500).jsom({
      success: false,
      error: err.message,
    });
  }
};

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategory,
  getCategoryById,
};
