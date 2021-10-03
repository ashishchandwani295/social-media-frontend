import Head from "next/head"
import Image from "next/image"
import { ReactNode } from "react"
import { Container } from "semantic-ui-react"

import styles from '../../styles/Home.module.css'
import { MenuBar } from "../Menubar"

type BaseLayout = {
    children: ReactNode
    title: string
    content: string
}

const BaseLayout: React.FC<BaseLayout> = ({ children, title, content }) => {

return (
    <div className={styles.baseLayout}>
        <Head>
            <title>{title}</title>
            <meta name="description" content={content} />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <MenuBar />
        {children}
    </div>
    )
}

export default BaseLayout