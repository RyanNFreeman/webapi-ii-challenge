const express = require("express");

const Posts = require("../data/db");

const router = express.Router();

//CREATE of CRUD operations

router.post("/", (req, res) => {
  const newPost = req.body;
  const { title, contents } = newPost;
  title && contents
    ? Posts.insert(newPost)
        .then(post => {
          res.status(201).json(post);
        })
        .catch(err => {
          res
            .status(500)
            .json({
              error: "There was an error while saving the post to the database"
            });
        })
    : res
        .status(400)
        .json({
          errorMessage: "Please provide title and contents for the post."
        });
}); // WORKING NOW

//READ of CRUD operations

router.get("/", (req, res) => {
  //Returns an array of all the post objects contained in the database.
  Posts.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
}); // WORKING NOW

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Posts.findById(id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    });
}); // WORKING NOW

//UPDATE of CRUD operations

router.put("/:id", async (req, res) => {
  const { title, contents } = req.body;
  if (title && contents) {
    try {
      const post = await Posts.update(req.params.id, { title, contents });
      if (post > 0) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    } catch (err) {
      res.status({ err: "The post information could not be modified." });
    }
  } else {
    res
      .status(400)
      .json({
        errorMessage: "Please provide title and contents for the post."
      });
  }
}); //WORKING NOW

//DELETE of CRUD operations

router.delete("/:id", async (req, res) => {
  try {
    const post = await Posts.remove(req.params.id);
    console.log(post);
    if (post > 0) {
      res.status(200).json({ message: "post deleted" });
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "The post could not be removed" });
  }
}); //WORKING NOW

module.exports = router;