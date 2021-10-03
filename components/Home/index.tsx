import { useContext, useEffect, useState } from "react"
import { Grid, Transition } from "semantic-ui-react"
import { Context } from "../../context/contextProvider"
import { GET_POSTS } from "../../graphql/queries/posts"
import { IPost } from "../../interfaces"
import { makeQuery } from "../../utils/makeQuery"
import NewPost from "../NewPost"
import PostCard from "../PostCard"
import styles from './Home.module.css'

type Posts = {
    posts: Array<IPost>
}

const Home: React.FC<Posts> = ({ posts }) => {

    const { userDetails, newPost } = useContext(Context)

    const [updatedPosts, setUpdatedPosts] = useState<Array<IPost>>(posts)

    const getPosts = async() => {
        const posts = await makeQuery(GET_POSTS)
        setUpdatedPosts(posts.data.getPosts)
    }

    const handlePostDeletion = (data: [IPost]) => {
        setUpdatedPosts(data)
    }

    useEffect(() => {
        getPosts();
    }, [newPost])


    return (
        <Grid className={styles.homePage}>
            <Grid.Row className={styles.homeTitle}>
                    <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row className={styles.newPost_container}>
                    <NewPost />
            </Grid.Row>
            <Grid.Row className={styles.postcard_container}>
                <Transition.Group>
                {updatedPosts && updatedPosts.map(post => {
                    return (
                        <PostCard 
                        key={post.id} 
                        singlePost={false} 
                        post={post} 
                        handlePostDeletion={handlePostDeletion}/>
                    )
                })}
                </Transition.Group>
            </Grid.Row>
        </Grid>
    )
}

export default Home