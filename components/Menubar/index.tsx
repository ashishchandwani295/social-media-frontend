import { NextRouter, useRouter } from 'next/dist/client/router'
import React, { useContext, useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { Context } from '../../context/contextProvider';
import styles from './MenuBar.module.css'

export const MenuBar: React.FC = () => {

  const router: NextRouter = useRouter();
  
  const pathName: string = router.pathname === '/' ? 'home' : router.pathname.substr(1)

  const [activeItem, setActiveItem] = useState<String>(pathName);

  const auth = useContext(Context)

  const { userDetails, logout } = auth;

  const handleItemClick: any = (e: React.MouseEvent, { name }: any) => setActiveItem(name);

    return (
      userDetails ? (
      <div className={styles.menuBar}>
        <Menu pointing secondary size={'massive'} color='purple'>
          <Menu.Item
            className={styles.menuItem}
            name={userDetails.username}
            active
            onClick={handleItemClick}
            href="/"
          />
          <Menu.Menu position='right'>
            <Menu.Item
              className={styles.menuItem}
              name='logout'
              active={activeItem === 'logout'}
              onClick={logout}
            />
          </Menu.Menu>
        </Menu>
      </div>
      ) : (
        <div className={styles.menuBar}>
        <Menu pointing secondary size={'massive'} color='purple'>
          <Menu.Item
            className={styles.menuItem}
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            href="/"
          />
          <Menu.Menu position='right'>
            <Menu.Item
              className={styles.menuItem}
              name='login'
              active={activeItem === 'login'}
              onClick={handleItemClick}
              href="/login"
            />
            <Menu.Item
              className={styles.menuItem}
              name='register'
              active={activeItem === 'register'}
              onClick={handleItemClick}
              href="/register"
            />
          </Menu.Menu>
        </Menu>
      </div>
      )
    )
}