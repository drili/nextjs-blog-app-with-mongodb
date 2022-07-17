import { useState } from 'react'
import { useRouter } from 'next/router'

export default function PostCard({ post }) {
    const [publishing, setPublishing] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const router = useRouter()

    // - Publish post
    const publishPost = async (postId) => {
        // - Change publishing state
        setPublishing(true)

        try {
            // - Update post
            await fetch ("/api/posts", {
                method: "PUT",
                body: postId
            })

            // - Reset the publishing state
            setPublishing(false)

            // - Reload the page
            return router.push(router.asPath)
        } catch (error) {
            return setPublishing(false)
        }
    }

    // - Delete post
    const deletePost = async (postId) => {
        // - Change delete state
        setDeleting(true)

        try {
            // - Delete post
            await fetch ("/api/posts", {
                method: "DELETE",
                body: postId
            })

            // - Reset deleting state
            setDeleting(false)

            // - Reload the page
            return router.push(router.asPath)
        } catch (error) {
            return setDeleting(false)
        }
    }

    return (
        <>
            <li>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <small>{new Date(post.createdAt).toLocaleDateString()}</small>
                <br />

                {!post.published ? (
                    <button type="button" onClick={() => publishPost(post._id)}>
                        {publishing ? "Publishing" : "Publish"}
                    </button>
                ) : null}

                <button type="button" onClick={() => deletePost(post["_id"])}>
                    {deleting ? "Deleting" : "Delete"}
                </button>
            </li>
        </>
    )
}