import React, { useState, useEffect, useContext } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { Layout, Menu, Dropdown, Avatar } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined
} from '@ant-design/icons'
import { SettingsMenu } from './SettingsMenu'
import { path } from 'helpers/path'
import { AuthContext } from 'contexts'

interface TopBarProps {
  collapsed: boolean
  toggle(): void
}

interface ParamProps {
  pageId: string
}

export const TopBar: React.FC<TopBarProps> = ({ collapsed, toggle }) => {
  const { onLogoutUser } = useContext(AuthContext)
  const history = useHistory()
  const { Header } = Layout
  const [header, setHeader] = useState(<Link to={path.home}>Dashboard</Link>)
  const { pathname } = history.location
  const { pageId } = useParams<ParamProps>()

  const logoutUser = () => {
    localStorage.clear()
    onLogoutUser()
  }

  useEffect(() => {
    switch (pathname) {
      case path.home:
        setHeader(<Link to={path.home}>Home</Link>)
        break

      case path.clients:
        setHeader(
          <React.Fragment>
            <Link to={path.clients}>Clients</Link>
          </React.Fragment>
        )
        break

      case path.profile:
        setHeader(
          <React.Fragment>
            <Link to={path.profile}>Profile</Link>
          </React.Fragment>
        )
        break
    }
  }, [pathname, pageId])

  return (
    <Header className="site-layout-background" style={{ padding: 0 }}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: toggle
      })}
      <span className="portal-title">{header}</span>
      <Menu mode="horizontal" className="f-right">
        <Menu.Item key="1">
          <Dropdown overlay={<SettingsMenu logoutUser={logoutUser} />}>
            <Avatar
              shape="square"
              icon={<UserOutlined style={{ color: '#42A5F5' }} />}
              style={{ background: 'transparent' }}
            />
          </Dropdown>
        </Menu.Item>
      </Menu>
    </Header>
  )
}
