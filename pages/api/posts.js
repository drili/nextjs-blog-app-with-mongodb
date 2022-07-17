const { connectToDatabase } = require("../../lib/mongodb")
const ObjectId = require("mongodb").ObjectId

export default async function handler(req, res) {
    // - Switch methods
    switch (req.method) {
        case "GET":
            return getPosts(req, res)
            break;

        case "POST":
            return addPost(req, res)
            break;
        
        case "PUT":
            return updatePost(req, res)
            break
        
        case "DELETE":
            return deletePost(req, res)
            break
    }
}