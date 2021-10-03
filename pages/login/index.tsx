import { GetServerSidePropsContext, NextPage } from "next"
import Head from "next/head"
import { Fragment } from "react"
import Login from "../../components/Login"
import { checkAuth } from "../../utils/auth"
import styles from '../../components/Login/Login.module.css'

const login: NextPage = () => {
    return (
        <Fragment>
            <Head>
                <title>Login Page</title>
                <meta name="description" content="Welcome to Social Media Login Page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.login_page_container}>
                <Login />
            </div>
        </Fragment>
    )
}

export const getServerSideProps = async(ctx: GetServerSidePropsContext) => {

    const token = checkAuth(ctx);
    
    if(token) {
        return { 
            redirect: {
                permanent: false,
                destination: "/",
            },
            props: {} as never,
        }
    }

    return { 
        props: {} as never,
    }
}

export default login