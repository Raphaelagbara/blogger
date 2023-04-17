export default (req, res) => {
  const posts = [
    { id: 1, title: "First post" },
    { id: 2, title: "Second post" },
  ];
  res.json({
    posts,
  });
};
