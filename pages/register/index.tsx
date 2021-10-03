import { GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import Register from "../../components/Register";
import { checkAuth } from "../../utils/auth";
import styles from '../../components/Register/Register.module.css'

const register: NextPage = () => {
    return (
        <Fragment>
            <Head>
                <title>Login Page</title>
                <meta name="description" content="Welcome to Social Media Login Page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.register_page_container}>
                <Register />
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
        props : {} as never,
    }
}

export default register