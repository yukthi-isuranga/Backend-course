export const validateRequest = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const formattedErrors = result.error.format();

      const flatErrors = Object.values(formattedErrors)
        .flat()
        .filter(Boolean)
        .map((err) => err?._errors)
        .flat()
        .filter(Boolean);

      return res.status(400).json({
        error: flatErrors.join(', '),
      });
    }

    // optional: replace body with parsed data (clean data)
    req.body = result.data;

    next();
  };
};
