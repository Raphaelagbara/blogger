const protectApi = (req, res, next) => {
  let authorization = req.header("Authorization");
  if (authorization) {
    // verify JWT token here (to be implemented)
    return next();
  }

  return res.status(403).json({ message: "Unauthorized access" });
};

export default protectApi;
