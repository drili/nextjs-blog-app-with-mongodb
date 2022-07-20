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

async function getPosts(req, res) {
    try {
        let { db } = await connectToDatabase()
        
        let posts = await db
            .collection('posts')
            .find({})
            .sort({ published: -1 })
            .toArray();
        
        // - Return the posts
        return res.json({
            message: JSON.parse(JSON.stringify(posts)),
            success: true,
        });
    } catch (error) {
        // - Return the error
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}
