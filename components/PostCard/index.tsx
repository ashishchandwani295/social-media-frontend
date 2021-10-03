import moment from 'moment'
import { useContext, useState } from 'react'
import { Card, CardContent, Image, Transition } from 'semantic-ui-react'
import { Context } from '../../context/contextProvider'
import { IComment, IPost } from '../../interfaces'
import CommentButton from '../CommentButton'
import DeleteButton from '../DeleteButton'
import LikeButton from '../LikeButton'
import styles from './PostCard.module.css';

type Post = {
    post: IPost
    singlePost?: Boolean
    comment?: IComment
    handleCommentDeletion?: (data: IPost) => void
    handlePostDeletion?: (data: [IPost]) => void
    id?: String
}

const PostCard: React.FC<Post> = ({ post, singlePost, comment, id,  handleCommentDeletion, handlePostDeletion }) => {

    const auth = useContext(Context);

    const [ commentInputActive, setCommentInputActive ] = useState<Boolean>(false)

    const handleCommentButton = () => {
        setCommentInputActive(!commentInputActive)
    }

    return (
        <div className={!singlePost ? styles.post_container : styles.singlePost_container }>
            <div>
                <Image
                floated='left'
                size= {(singlePost && !comment) ? 'tiny' : 'mini'}
                src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                alt=""
                avatar
                />
            </div>
            <Card className={comment ? styles.commentCard : styles.postCard}>
                <Card.Content className={styles.post_content} href={ singlePost ? '' : `/posts/${post.id}`}>
                    <Card.Header>{comment ? comment.username : post.username}</Card.Header>
                    <Card.Meta>{comment ? moment(comment.createdAt).fromNow() : moment(post.createdAt).fromNow()}</Card.Meta>
                    <Card.Description>
                    <strong>{comment ? comment.body : post.body}</strong>
                    </Card.Description>
                </Card.Content>
                { !comment && <Card.Content className={styles.postButtons_container}>
                    <LikeButton user={auth.userDetails} post={post} />
                    <CommentButton post={post} handleCommentButton={handleCommentButton} />
                    {!singlePost && auth.userDetails && (auth.userDetails.username === post.username) && 
                    <DeleteButton postId={post.id} handlePostDeletion={handlePostDeletion} />
                    }
                </Card.Content>}
                {commentInputActive && !id && post.comments.length > 0 &&
                <CardContent className={styles.comment_in_post}>
                    <Transition.Group>
                        {post?.comments?.map(comment => {
                            return (
                                <PostCard 
                                    key={comment.id} 
                                    singlePost={true} 
                                    post={post} 
                                    comment={comment} 
                                    handleCommentDeletion={handleCommentDeletion} />
                            )
                        })}
                    </Transition.Group>
                </CardContent>
                }
            </Card>
            {comment && auth.userDetails && (auth.userDetails.username === comment?.username) && 
                    <DeleteButton postId={post.id} commentId={comment.id} handleCommentDeletion={handleCommentDeletion} />
            }
        </div>
    )
}


export default PostCard
