export default (req, res) => {
  let postId = req.params.postId;
  const posts = [
    { id: 1, title: "First post" },
    { id: 2, title: "Second post" },
  ];
  res.json({
    post: postId ? posts.filter((p) => p.id != postId) : posts,
  });
};
