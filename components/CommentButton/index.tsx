import { Button, Icon } from "semantic-ui-react"
import { IPost } from "../../interfaces"
import styles from './CommentButton.module.css'

type Post = { 
    post: IPost,
    handleCommentButton?: () => void
}

const CommentButton: React.FC<Post> = ({ post, handleCommentButton }) => {

    return (
        <Button basic size='large' className={styles.commentButton} labelPosition='right' onClick={handleCommentButton} >
                <Icon size="large" color="purple" name={post.commentsCount == 0 ? 'comments outline' : 'comments'} />
                <div className={styles.commentsCount}>
                    {post.commentsCount}
                </div>
        </Button>
    )
}

export default CommentButton