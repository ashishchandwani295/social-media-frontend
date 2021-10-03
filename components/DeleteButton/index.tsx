import { useMutation } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { Icon, Confirm } from "semantic-ui-react"
import { DELETE_COMMENT, DELETE_POST } from "../../graphql/mutations/post";
import { GET_POSTS } from "../../graphql/queries/posts";
import { IPost } from "../../interfaces";
import { makeQuery } from "../../utils/makeQuery";
import styles from './DeleteButton.module.css';

type PostId = {
    postId: number
    commentId?: number
    handleCommentDeletion?: (data: IPost) => void
    handlePostDeletion?: (data: [IPost]) => void
}

const DeleteButton: React.FC<PostId> = ({ postId, commentId, handleCommentDeletion, handlePostDeletion }) => {

    const router = useRouter();

    const [confirmDelete, setConfirmDelete ] = useState<boolean>(false)

    const mutation_query = commentId ? DELETE_COMMENT : DELETE_POST;

    const variables = commentId ? { postId: postId, deleteCommentId: commentId} : { deletePostId : postId }

    const [deleteCommentOrPost, {loading}] = useMutation(mutation_query, { 
        async update(_, result) {

            if(!commentId) {
                const data = await makeQuery(GET_POSTS)
                handlePostDeletion(data.data.getPosts)
                router.push('/')
            } else {
                handleCommentDeletion(result.data.deleteComment)
            }
            setConfirmDelete(false)
        },
        onError(err) {
            console.log(err)
        },
        variables: variables
     })

    const handleDelete = () => {
        deleteCommentOrPost();
    }

    return (
        <>
        <div className={styles.deleteButton} onClick={() => setConfirmDelete(true)}>
                <Icon size= "large" color="red" name='trash' style={{margin: 0}} />
        </div>
        <Confirm open={confirmDelete} onConfirm={handleDelete} onCancel={() => setConfirmDelete(false)} />
        </>
    )
}


export default DeleteButton