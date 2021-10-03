import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import BaseLayout from '../components/BaseLayout'
import Home from '../components/Home'
import {GET_POSTS} from '../graphql/queries/posts'
import { IPost } from '../interfaces'
import { checkAuth } from '../utils/auth'
import { makeQuery } from '../utils/makeQuery'

type Posts = {
  posts: Array<IPost>
}

const home: NextPage<Posts> = ({ posts }) => {

  return (
    <BaseLayout title="Home Page" content="Welcome to Social Media">
      <Home posts={posts} />
    </BaseLayout>
  )
}

export default home


export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {

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

  const data = await makeQuery(GET_POSTS);

  return { 
    props: {
      posts: data.data.getPosts
    }
  }
} 
