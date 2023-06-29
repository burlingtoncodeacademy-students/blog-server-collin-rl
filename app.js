require("dotenv").config()
const express = require("express")
const app = express()
const path = require("path")
const HOST = process.env.HOST || "127.0.0.1"
const PORT = process.env.PORT || 4000

app.use(express.json())

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)))

// Import routes from routes.js
const blogRoutes = require("./controllers/routes")

// Use the routes
app.use("/api", blogRoutes)

app.listen(PORT, HOST, () => {
    console.log(`[server] listening on ${HOST}:${PORT}`)
})
