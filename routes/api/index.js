import { Router } from "express";
import storePost from "./store-post.js";
import getPosts from "./get-posts.js";
import loginUser from "./login-user.js";
import signUpUser from "./signup-user.js";
import updatePost from "./update-post.js";
import deletePost from "./delete-post.js";
import getPost from "./get-post.js";
import catchAll from "./catch-all.js";
import protectApi from "../../utils/protectApi.js";

const router = Router();

router.get("/posts", getPosts);
router
  .route("/post/:postId?")
  .get(getPost)
  .post(protectApi, storePost)
  .put(updatePost)
  .delete(protectApi,deletePost);
router.post("/login", loginUser);
router.post("/signup", signUpUser);
router.use(catchAll);

export default router;
