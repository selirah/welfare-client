import React from 'react'
import { observer } from 'mobx-react-lite'
import { Layout, Menu, Dropdown, Avatar, Typography } from 'antd'
import * as Icons from '@ant-design/icons'
import { SettingsMenu } from './SettingsMenu'
import { useStore } from 'hooks/StoreHook'

interface TopBarProps {
  collapsed: boolean
  toggle(): void
}

const { Header } = Layout
const { Link } = Typography

export const TopBar: React.FC<TopBarProps> = observer((props) => {
  const { collapsed, toggle } = props
  const { adminStore } = useStore()

  return (
    <Header className="site-layout-background" style={{ padding: 0 }}>
      {React.createElement(
        collapsed ? Icons.MenuUnfoldOutlined : Icons.MenuFoldOutlined,
        {
          className: 'trigger',
          onClick: toggle
        }
      )}
      <span className="portal-title">
        <Link strong>{adminStore.topHeader}</Link>
      </span>
      <Menu mode="horizontal" className="f-right">
        <Menu.Item key="1">
          <Dropdown overlay={<SettingsMenu />}>
            <Avatar
              shape="square"
              icon={<Icons.UserOutlined style={{ color: '#42A5F5' }} />}
              style={{ background: 'transparent' }}
            />
          </Dropdown>
        </Menu.Item>
      </Menu>
    </Header>
  )
})
