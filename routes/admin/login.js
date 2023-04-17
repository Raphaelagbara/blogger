export default (req, res) => {
  const { email, password } = req.body;
  if (email === "homer@springfield.com" && password === "donuts") {
    req.session.user = "Homer Simpson";
    return res.redirect("/admin/dashboard");
  }

  res.redirect("/admin/login");
};
