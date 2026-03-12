const Store = require("../model/Store");
// const User = require("../model/User");

const createStore = async (req, res) => {
  try {
    const { store_name, store_owner, phone, address } = req.body;

    const store = new Store({
      store_name,
      store_owner,
      phone,
      address,
    });

    await store.save();

    res.status(201).json({
      success: true,
      message:
        "Tapaiko store safata purabhak create vayeko jankarai garauna chahanxum",
      data: store,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

const getAllStores = async (req, res) => {
  try {
    const store = await Store.find();

    res.status(200).json({
      success: true,
      count: store.length,
      data: store,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

const getStoreById = async (req, res) => {
  try {
    const store = await Store.findById({ _id: req.params.id });

    if (!store) {
      return res.status(404).json({
        success: false,
        error: "store nai vetiyena jpatei nasoch haii",
      });
    }

    res.status(201).json({
      success: true,
      data: store,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

const updateStore = async (req, res) => {
  try {
    const { name, address } = req.body;
    let store = await Store.findById({ _id: req.params.id });

    if (!store) {
      return res.status(404).json({
        success: false,
        message: "store vetiyana hou",
      });
    }

    store = await Store.findByIdAndUpdate(
      req.params.id,
      {
        name,
        address,
      },
      {
        new: true,
        runValidatores: true,
      },
    );
    res.status(200).json({
      success: true,
      message: "store ko timiley  chaiyeko changes haru vayo haii",
      data: store,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

const deleteStore = async (req, res) => {
  try {
    const store = await Store.findByIdAndDelete(req.params.id);
    if (!store) {
      return res.status(404).json({
        success: false,
        message: "store vetiyana hou",
      });
    }

    await User.deleteOne();
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = {updateStore, deleteStore, getAllStores, getStoreById, createStore};
