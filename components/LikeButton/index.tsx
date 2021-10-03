import { useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { Button, Icon, Label } from "semantic-ui-react"
import { LIKE_UNLIKE_POST } from "../../graphql/mutations/post"
import { IPost, IUser } from "../../interfaces"
import styles from './LikeButton.module.css'

type Post = {
    post: IPost
    user?: IUser
}

const LikeButton: React.FC<Post> = ({ post, user }) => {

    const [ liked, setLiked ] = useState<Boolean>(false);
    const [ likesCount, setLikesCount ] = useState<number>(post?.likesCount)

    const [likeUnlikePost, {loading}] = useMutation(LIKE_UNLIKE_POST, { 
        update(_, result) {
            let likes = likesCount
            if(liked) {
                setLiked(false)
                setLikesCount(likes -= 1)
            } else {
                setLiked(true)
                setLikesCount(likes += 1)
            }
        },
        onError(err) {
            console.log(err)
        },
        variables: { PostId : post?.id}
    })

    useEffect(() => {
        if( post?.likes.find( like => like.username === user?.username)) {
            setLiked(true)
        } else {
            setLiked(false)
        }
    }, [user, post?.likes])

    const handleLikedButton = () => {
        likeUnlikePost()
    }

    const likeUnlike = user ? (
        liked ? (
                <Icon size="large" color="purple" name='heart' />
        ) : (
                <Icon size="large" color="purple" name='heart outline' />
        )) : (
                <Icon size="large" color="purple" name='heart' href='/login' />
        )

    return (
        <Button basic size='large' className={styles.likeButton} labelPosition='right' onClick={handleLikedButton} >
            {likeUnlike}
            <div className={styles.likesCount}>
                {likesCount}
            </div>
        </Button>
    )
}

export default LikeButton