import { useState } from "react";

import Nav from "../components/Nav";
import styles from '../styles/Home.module.css';

export default function AddPost() {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")

    const handlePost = async (e) => {
        e.preventDefault()

        // - Reset error and message
        setError("")
        setMessage("")

        // - Fields check
        if (!title || !content) {
            return (
                setError("All fields are required!")
            )
        }

        // - Post structure
        let post = {
            title,
            content,
            published: false,
            createdAt: new Date().toISOString()
        }

        // - Save post
        let response = await fetch("/api/posts", {
            method: "POST",
            body: JSON.stringify(post)
        })

        // - Get the data
        let data = await response.json()
        if (data.success) {
            // - Reset fields
            setTitle("")
            setContent("")
            // - Set message
            return setMessage(data.message)
        } else {
            // - Set the error
            return setError(data.message)
        }
    }

    return (
        <div>
            <Nav></Nav>

            <div className={styles.container}>
                <form onSubmit={handlePost} className={styles.form}>
                    {error ? (
                        <div className={styles.formItem}>
                            <h3 className={styles.error}>{error}</h3>
                        </div>
                    ) : null }

                    {message ? (
                        <div className={styles.formItem}>
                            <h3 className={styles.message}>{message}</h3>
                        </div>
                    ) : null}

                    <div className={styles.formItem}>
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            placeholder="title"
                        >
                        </input>
                    </div>

                    <div className={styles.formItem}>
                        <label>Content</label>
                        <textarea
                            name="content"
                            onChange={(e) => setContent(e.target.value)}
                            value={content}
                            placeholder="Post content"
                        >
                        </textarea>
                    </div>

                    <div className={styles.formItem}>
                        <button type="submit">Add post</button>
                    </div>
                </form>
            </div>
        </div>
    )
}