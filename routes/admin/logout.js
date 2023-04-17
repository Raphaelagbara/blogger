export default (req, res) => {
  delete req.session.user;
  res.redirect("/admin/login");
};
