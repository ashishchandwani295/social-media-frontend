import { useMutation } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import { FormEvent, useState } from "react";
import { Button, Card, CardContent, Form, FormInput, Grid, GridColumn, GridRow, Icon, Image, Message, Transition } from "semantic-ui-react";
import { CREATE_COMMENT } from "../../graphql/mutations/post";
import { IPost } from "../../interfaces";
import PostCard from "../PostCard";
import styles from './SinglePost.module.css'

type PostData = {
    postData: IPost
    id: String
}

const SinglePost: React.FC<PostData> = ({ postData , id}) => {

    const [commentValue, setCommentValue ] = useState<String>('')
    const [errors, setErrors] = useState<String>('')
    const [ updatedPostData, setUpdatedPostData ] = useState<IPost>(postData)
    const [ comments, setComments ] = useState(postData.comments)
    const router = useRouter();

    const [createComment, { loading }] = useMutation(CREATE_COMMENT, {
        update(_,result) {
            setUpdatedPostData(result.data.createComment)
            setComments(result.data.createComment.comments)
            setCommentValue('')
        },
        onError(err) {
            console.log(err)
            setErrors(err.message)
        },
        variables: { commentPostId: postData.id, commentBody: commentValue}
    })

    const handleChange = (event: any) => {
        setErrors('')
        setCommentValue(event.target.value)
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        createComment()
        setCommentValue('')
    }

    const handleCommentDeletion = (data: IPost) => {
        setUpdatedPostData(data)
        setComments(data.comments)
    }

    const handleClick = () => {
        router.push('/')
    }

    return (
        <Grid className={styles.singlePostPage}>
            <Grid.Row className={styles.singlePostTitle}>
                    <Icon size="large" color="purple" name="arrow left" onClick={handleClick} className={styles.backicon}/>
                    <h1>Post</h1>
            </Grid.Row>
            <Grid.Row style={{paddingBottom: "0px"}}>
                <Transition.Group>
                    <PostCard id={id} singlePost={true} post={updatedPostData} />
                    <Card className={styles.postcard_container}>
                        <CardContent className={styles.commentSection}>
                            <Image
                f               loated='left'
                                size= 'large'
                                src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                                alt=""
                                avatar
                            />
                            <Form className={styles.commentSection_form}>
                                <FormInput 
                                    placeholder="Add a comment..."
                                    value={commentValue}
                                    onChange={handleChange}
                                    className={styles.commentSection_input}
                                />
                            </Form>
                            <Button onClick={handleSubmit} className={styles.commentSection_button} color='purple'>Post</Button>
                        </CardContent>
                        <Message
                                style={{ display: errors ? "block" : "none", marginTop: "0px"}}
                                error
                                list={[errors]}
                        />
                    </Card>
                    {comments && updatedPostData && comments.map(comment => {
                        return (
                            <PostCard key={comment.id} singlePost={true} post={updatedPostData} comment={comment} handleCommentDeletion={handleCommentDeletion} />
                        )
                    })}
                </Transition.Group>
            </Grid.Row>
        </Grid>
    )
}

export default SinglePost;