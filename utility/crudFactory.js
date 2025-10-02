const getAllFactory = (elementModel) => async (req, res) => {
  console.log("get all factory for", elementModel);
  try {
    const data = await elementModel.find();
    if (data.length === 0) {
      throw new Error("No data found");
    } else {
      res.status(200).json({
        message: "Data found",
        data: data,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
};

const createFactory = (elementModel) => async (req, res) => {
  try {
    console.log("creating products");
    const elementDetails = req.body;
    const data = await elementModel.create(elementDetails);
    console.log("executed creation");
    res.status(200).json({
      message: "Data created",
      data: data,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
};

const getElementByIdFactory = (elementModel) => async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await elementModel.findById(id);
    console.log("data", data);
    if (data == undefined) {
      throw { message: "no data found", statusCode: 501 };
    } else {
      res.status(200).json({
        message: "Data found",
        data: data
      });
    }
  } catch (err) {
    // res.status(500).json({
    //   status: 500,
    //   message: err.message,
    // });
    next(err);
  }
};

const checkInput = function (req, res, next) {
  console.log("req methid", req.method);
  const productDetails = req.body;
  const isEmpty = Object.keys(productDetails).length === 0;
  if (isEmpty) {
    res.status(400).json({
      status: 400,
      message: "Body cannot be empty",
    });
  } else {
    next();
  }
};

const deleteElementByIdFactory = (elementModel) => async (req, res) => {
  try {
    const { id } = req.params;
    const data = await elementModel.findByIdAndDelete(id);
    if (data) {
      res.status(200).json({
        message: "Data deleted",
        data: data,
      });
    } else {
      throw new Error("No data found");
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
};

const updateElementByIdFactory = (elementModel) => async (req, res) => {
  try {
      const { id } = req.params;
    const updateData = req.body;

    // Find the element by ID and update it
    const updatedElement = await elementModel.findByIdAndUpdate(id, updateData, {
      new: true,             // return the updated document
      runValidators: true,   // validate before saving
    });

    // If not found
    if (!updatedElement) {
      return res.status(404).json({
        status: 404,
        message: `${elementModel.modelName} with ID ${id} not found`,
      });
    }

    // Success
    res.status(200).json({
      status: 200,
      data: updatedElement,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
};

module.exports = {
  getAllFactory,
  createFactory,
  getElementByIdFactory,
  deleteElementByIdFactory,
  checkInput,
  updateElementByIdFactory,
};
