const validation = (schema) => async (req, res, next) => {
  const body = req.body;
  try {
    await schema.validate(body, {
      abortEarly: false,
      strict: false,
    });
    next();
  } catch (error) {
    res.status(400).json({ errors: error.errors });
  }
};

module.exports = validation;
