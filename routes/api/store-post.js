export default (req, res, next) => {
  console.log(req.body);
  res.json({ message: "Got it!" });
};
