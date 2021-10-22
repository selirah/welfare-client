import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { User } from 'interfaces'
import {
  HomeOutlined,
  CreditCardOutlined,
  MessageOutlined,
  UsergroupAddOutlined,
  BookOutlined,
  BuildOutlined,
  SyncOutlined,
  LoadingOutlined,
  FieldTimeOutlined
} from '@ant-design/icons'
import { path } from 'helpers/path'
import { AuthContext } from 'contexts'

interface SideBarProps {
  collapsed: boolean
  onCollapsed(): void
  user: User
  onImpersonate(): void
}

const { Sider } = Layout

export const SideBar: React.FC<SideBarProps> = ({
  collapsed,
  onCollapsed,
  user,
  onImpersonate
}) => {
  const { activeMenu, onSetActiveMenu } = useContext(AuthContext)
  const [active, setActive] = useState(activeMenu)

  useEffect(() => {
    setActive(activeMenu)
  }, [activeMenu])

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      breakpoint="lg"
      collapsedWidth="0"
      onCollapse={onCollapsed}
    >
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[active]}>
        <div className="logo" />
        {user.role === 'ADMIN' ? (
          <>
            <Menu.Item
              key={path.home}
              icon={<HomeOutlined />}
              onClick={() => onSetActiveMenu(path.home)}
            >
              <Link to={path.home}>Home</Link>
            </Menu.Item>
            {user.admin_id !== 0 ? (
              <Menu.Item key="1" icon={<LoadingOutlined spin />}>
                <Link to="" onClick={() => onImpersonate()}>
                  Switch to Admin
                </Link>
              </Menu.Item>
            ) : null}
          </>
        ) : (
          <>
            <Menu.Item
              key={path.clients}
              icon={<UsergroupAddOutlined />}
              onClick={() => onSetActiveMenu(path.clients)}
            >
              <Link to={path.clients}>Clients</Link>
            </Menu.Item>
          </>
        )}
      </Menu>
    </Sider>
  )
}
