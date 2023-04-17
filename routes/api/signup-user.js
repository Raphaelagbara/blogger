export default (req, res) => {
  let { email, name, password } = req.body;
  res.json({ status: true });
};
