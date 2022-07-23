import Head from "next/head";

import Nav from "../components/Nav";
import PostCard from "../components/PostCard";
import styles from "../styles/Home.module.css"

export default function Home({ posts }) {
    return (
        <div>
            <Head>
                <title>Home</title>
            </Head>

            <Nav></Nav>
            
            <main>
                <div className={styles.container}>
                    {
                        posts.length === 0 ? (
                            <h2>No added posts!</h2>
                        ) : (

                            <ul>
                                {/* {posts} */}
                                {posts.map((post, i) => (
                                    <PostCard post={post} key={i} />
                                ))}
                            </ul>
                        )
                    }
                </div>
            </main>
        </div>
    )
}

export async function getServerSideProps(ctx) {
    // - Get the current enviroment
    let dev = process.env.NODE_ENV !== "production"
    let { DEV_URL, PROD_URL } = process.env

    // - Request posts from API
    let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/posts`)

    // - Extract data
    let data = await response.json()

    return {
        props: {
            posts: data["message"]
        }
    }
}