import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Layout, Menu, Typography } from 'antd'
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
import { useStore } from 'hooks/StoreHook'

interface SideBarProps {
  collapsed: boolean
  onCollapsed(): void
  user: User
  onImpersonate(): void
}

const { Sider } = Layout

const { Link } = Typography

export const SideBar: React.FC<SideBarProps> = observer((props) => {
  const { collapsed, onCollapsed, user, onImpersonate } = props
  const {
    adminStore: { onSetActiveMenu, activeMenu }
  } = useStore()
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
              <Link href={path.home}>Home</Link>
            </Menu.Item>
            {user.admin_id !== 0 ? (
              <Menu.Item key="1" icon={<LoadingOutlined spin />}>
                <Link href="" onClick={() => onImpersonate()}>
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
              <Link href={path.clients}>Clients</Link>
            </Menu.Item>
          </>
        )}
      </Menu>
    </Sider>
  )
})
