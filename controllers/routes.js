const express = require("express")
const router = express.Router()
const fs = require("fs")

// Read all blog posts
router.get("/blog", (req, res) => {
    fs.readFile("./api/blog.json", "utf8", (err, data) => {
        if (err) {
            console.error(err)
            res.status(500).send("Internal Server Error")
        } else {
            const blogPosts = JSON.parse(data)
            res.json(blogPosts)
        }
    })
})

// Read a specific blog post
router.get("/blog/:id", (req, res) => {
    const postId = req.params.id
    fs.readFile("./api/blog.json", "utf8", (err, data) => {
        if (err) {
            console.error(err)
            res.status(500).send("Internal Server Error")
        } else {
            const blogPosts = JSON.parse(data)
            const post = blogPosts.find(
                (post) => post.post_id === parseInt(postId)
            )
            if (post) {
                res.json(post)
            } else {
                res.status(404).send("Blog post not found")
            }
        }
    })
})

// Create a new blog post
router.post("/blog", (req, res) => {
    const newPost = req.body
    fs.readFile("./api/blog.json", "utf8", (err, data) => {
        if (err) {
            console.error(err)
            res.status(500).send("Internal Server Error")
        } else {
            const blogPosts = JSON.parse(data)
            const lastPost = blogPosts[blogPosts.length - 1]
            const newId = lastPost ? lastPost.post_id + 1 : 1
            newPost.post_id = newId
            blogPosts.push(newPost)
            fs.writeFile(
                "./api/blog.json",
                JSON.stringify(blogPosts),
                "utf8",
                (err) => {
                    if (err) {
                        console.error(err)
                        res.status(500).send("Internal Server Error")
                    } else {
                        res.status(201).json(newPost)
                    }
                }
            )
        }
    })
})

// Update an existing blog post
router.put("/blog/:id", (req, res) => {
    const postId = req.params.id
    const updatedPost = req.body
    fs.readFile("./api/blog.json", "utf8", (err, data) => {
        if (err) {
            console.error(err)
            res.status(500).send("Internal Server Error")
        } else {
            let blogPosts = JSON.parse(data)
            const index = blogPosts.findIndex(
                (post) => post.post_id === parseInt(postId)
            )
            if (index !== -1) {
                updatedPost.post_id = parseInt(postId)
                blogPosts[index] = updatedPost
                fs.writeFile(
                    "./api/blog.json",
                    JSON.stringify(blogPosts),
                    "utf8",
                    (err) => {
                        if (err) {
                            console.error(err)
                            res.status(500).send("Internal Server Error")
                        } else {
                            res.json(updatedPost)
                        }
                    }
                )
            } else {
                res.status(404).send("Blog post not found")
            }
        }
    })
})

// Delete a blog post
router.delete("/blog/:id", (req, res) => {
    const postId = req.params.id
    fs.readFile("./api/blog.json", "utf8", (err, data) => {
        if (err) {
            console.error(err)
            res.status(500).send("Internal Server Error")
        } else {
            let blogPosts = JSON.parse(data)
            const index = blogPosts.findIndex(
                (post) => post.post_id === parseInt(postId)
            )
            if (index !== -1) {
                const deletedPost = blogPosts.splice(index, 1)[0]
                fs.writeFile(
                    "./api/blog.json",
                    JSON.stringify(blogPosts),
                    "utf8",
                    (err) => {
                        if (err) {
                            console.error(err)
                            res.status(500).send("Internal Server Error")
                        } else {
                            res.json(deletedPost)
                        }
                    }
                )
            } else {
                res.status(404).send("Blog post not found")
            }
        }
    })
})

module.exports = router
