import { useMutation } from "@apollo/client";
import { useContext, useState } from "react"
import { Button, Form, Icon, Image, Message } from "semantic-ui-react"
import { Context } from "../../context/contextProvider";
import { CREATE_POST } from "../../graphql/mutations/post";
import {GET_POSTS} from "../../graphql/queries/posts";
import styles from './NewPost.module.css';

const NewPost: React.FC = () => {

    const [values, setValues] = useState<String>('');

    const [errors, setErrors] = useState<String>('');

    const { dispatchNewPost } = useContext(Context) 

    const [ createPost, {loading}] = useMutation(CREATE_POST, {
        update(cache, result){
            const data = cache.readQuery({
                query: GET_POSTS
            })
            setValues('')
        },
        onError(err) {
            console.log(err)
            setErrors(err.message)
        },
        variables: { createPostBody: values }
    })

    const handleChange = (event: any) => {
        setValues(event.target.value)
        setErrors('')
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault()
        await createPost()
        dispatchNewPost()
    }

    return (
        <Form onSubmit={handleSubmit} className={loading ? "loading" : styles.newPost}>
            <Form.Field>
                    <div className={styles.formInput}>
                        <Image 
                            className={styles.img}
                            floated='left'
                            size="tiny"
                            src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                            alt=""
                        />
                        <Form.Input
                            fluid
                            transparent
                            size="big"
                            type="text"
                            name="body"
                            placeholder={errors ? "Post body cannot be empty" : "What's happening?"}
                            className={styles.inputField}
                            value={values}
                            error={errors ? true : false}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.buttons}>
                        <div className={styles.icons}>
                            <div className={styles.icon}>
                                <Icon name="images" size="big" color="purple"/>
                            </div>
                            <div className={styles.icon}>
                                <Icon name="film" size="big" color="purple"/>
                            </div>
                            <div className={styles.icon}>
                                <Icon name="smile outline" size="big" color="purple"/>
                            </div>
                            <div className={styles.icon}>
                                <Icon name="calendar check" size="big" color="purple"/>
                            </div>
                        </div>
                    <div>
                        <Button type="submit" className={styles.postButton} color="purple">Post</Button>
                    </div>
                    </div>
                    <Message
                        style={{ display: errors ? "block" : "none" }}
                        error
                        list={[errors]}
                    />
                </Form.Field>
        </Form>
    )
}

export default NewPost