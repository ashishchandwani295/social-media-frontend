import { GetServerSidePropsContext, NextPage } from "next";
import React from "react";
import BaseLayout from "../../components/BaseLayout";
import SinglePost from "../../components/SinglePost";
import { GET_POST } from "../../graphql/queries/posts";
import { IPost } from "../../interfaces";
import { checkAuth } from "../../utils/auth";
import { makeQuery } from "../../utils/makeQuery";


type PostData = {
    postData: IPost
    id: String,
}

const PostPage: NextPage<PostData> = ({ postData, id }) => {
    return (
        <BaseLayout title="Post Page" content="Welcome to Social Media">
            <SinglePost postData={postData} id={id} />
        </BaseLayout>
    )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const postId = ctx.query.id;

    const token = checkAuth(ctx)

    if(!token) {
        return {
        redirect: {
            permanent: false,
            destination: "/login",
        },
        props: {} as never,
        }
    }

    let variables = {
        getPostId : postId,
    }

    const data = await makeQuery(GET_POST, variables)
    
    return {
        props: {
            postData: data.data.getPost,
            id: postId,
        }
    }
}

export default PostPage;