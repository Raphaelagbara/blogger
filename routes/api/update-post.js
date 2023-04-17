export default (req, res) => {
  let postId = req.params.postId;
  let post = req.body.post;

  res.json({
    post,
  });
};
