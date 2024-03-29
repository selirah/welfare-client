import React from 'react'
import { Layout, Menu } from 'antd'
import { observer } from 'mobx-react-lite'
import { User } from 'interfaces'
import * as Icons from '@ant-design/icons'
import { path } from 'helpers/path'
import { useStore } from 'hooks/StoreHook'
import { Link } from 'react-router-dom'

interface SideBarProps {
  collapsed: boolean
  onCollapsed(): void
  user: User
  onImpersonate(): void
}

const { Sider } = Layout
const { SubMenu } = Menu

export const SideBar: React.FC<SideBarProps> = observer((props) => {
  const { collapsed, onCollapsed, user, onImpersonate } = props
  const { adminStore } = useStore()

  const handleFunction = (path: string, header: string, active: string) => {
    adminStore.onSetTopHeader(header)
    adminStore.onSetLocation(path)
    adminStore.onSetActive(active)
  }

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      breakpoint="lg"
      onCollapse={onCollapsed}
      theme="light"
    >
      <div className="logo" />
      <Menu
        mode="inline"
        defaultSelectedKeys={[adminStore.active]}
        theme="light"
      >
        {user.role === 'ADMIN' ? (
          <>
            <Menu.Item
              key="1"
              icon={<Icons.HomeOutlined />}
              onClick={() => handleFunction(path.home, 'Home', '1')}
            >
              <Link to={path.home}>Home</Link>
            </Menu.Item>
            <Menu.Item
              key="2"
              icon={<Icons.SettingOutlined />}
              onClick={() => handleFunction(path.settings, 'Settings', '2')}
            >
              <Link to={path.settings}>Settings</Link>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icons.UsergroupAddOutlined />
                  <span>Members</span>
                </span>
              }
            >
              <Menu.Item
                key="sub1a"
                icon={<Icons.OrderedListOutlined />}
                onClick={() => handleFunction(path.members, 'Members', 'sub1a')}
              >
                <Link to={`${path.members}`}>List</Link>
              </Menu.Item>
              <Menu.Item
                key="sub1b"
                icon={<Icons.UserAddOutlined />}
                onClick={() =>
                  handleFunction(`${path.members}/add`, 'Members/Add', 'sub1b')
                }
              >
                <Link to={`${path.members}/add`}>Add</Link>
              </Menu.Item>
              <Menu.Item
                key="sub1c"
                icon={<Icons.CloudUploadOutlined />}
                onClick={() =>
                  handleFunction(
                    `${path.members}/upload`,
                    'Members/Upload',
                    'sub1c'
                  )
                }
              >
                <Link to={`${path.members}/upload`}>Upload</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icons.BankOutlined />
                  <span>Contributions</span>
                </span>
              }
            >
              <Menu.Item
                key="sub2a"
                icon={<Icons.SettingOutlined />}
                onClick={() =>
                  handleFunction(
                    `${path.contributions}/settings`,
                    'Contributions/Settings',
                    'sub2a'
                  )
                }
              >
                <Link to={`${path.contributions}/settings`}>Settings</Link>
              </Menu.Item>
              <Menu.Item
                key="sub2b"
                icon={<Icons.OrderedListOutlined />}
                onClick={() =>
                  handleFunction(
                    `${path.contributions}`,
                    'Contributions',
                    'sub2b'
                  )
                }
              >
                <Link to={`${path.contributions}`}>List</Link>
              </Menu.Item>
              <Menu.Item
                key="sub2c"
                icon={<Icons.PlusCircleOutlined />}
                onClick={() =>
                  handleFunction(
                    `${path.contributions}/add`,
                    'Contributions/Add',
                    'sub2c'
                  )
                }
              >
                <Link to={`${path.contributions}/add`}>Add</Link>
              </Menu.Item>
              <Menu.Item
                key="sub2d"
                icon={<Icons.CloudUploadOutlined />}
                onClick={() =>
                  handleFunction(
                    `${path.contributions}/upload`,
                    'Contributions/Upload',
                    'sub2d'
                  )
                }
              >
                <Link to={`${path.contributions}/upload`}>Upload</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              title={
                <span>
                  <Icons.DollarCircleOutlined />
                  <span>Expenses</span>
                </span>
              }
            >
              <Menu.Item
                key="sub3a"
                icon={<Icons.SettingOutlined />}
                onClick={() =>
                  handleFunction(
                    `${path.expenses}/settings`,
                    'Expenses/Settings',
                    'sub3a'
                  )
                }
              >
                <Link to={`${path.expenses}/settings`}>Settings</Link>
              </Menu.Item>
              <Menu.Item
                key="sub3b"
                icon={<Icons.OrderedListOutlined />}
                onClick={() =>
                  handleFunction(`${path.expenses}`, 'Expenses', 'sub3b')
                }
              >
                <Link to={`${path.expenses}`}>List</Link>
              </Menu.Item>
              <Menu.Item
                key="sub3c"
                icon={<Icons.PlusCircleOutlined />}
                onClick={() =>
                  handleFunction(
                    `${path.expenses}/add`,
                    'Expenses/Add',
                    'sub3c'
                  )
                }
              >
                <Link to={`${path.expenses}/add`}>Add</Link>
              </Menu.Item>
              <Menu.Item
                key="sub3d"
                icon={<Icons.CloudUploadOutlined />}
                onClick={() =>
                  handleFunction(
                    `${path.expenses}/upload`,
                    'Expenses/Upload',
                    'sub3d'
                  )
                }
              >
                <Link to={`${path.expenses}/upload`}>Upload</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub4"
              title={
                <span>
                  <Icons.EuroCircleOutlined />
                  <span>Incomes</span>
                </span>
              }
            >
              <Menu.Item
                key="sub4a"
                icon={<Icons.SettingOutlined />}
                onClick={() =>
                  handleFunction(
                    `${path.incomes}/settings`,
                    'Incomes/Settings',
                    'sub4a'
                  )
                }
              >
                <Link to={`${path.incomes}/settings`}>Settings</Link>
              </Menu.Item>
              <Menu.Item
                key="sub4b"
                icon={<Icons.OrderedListOutlined />}
                onClick={() =>
                  handleFunction(`${path.incomes}`, 'Incomes', 'sub4b')
                }
              >
                <Link to={`${path.incomes}`}>List</Link>
              </Menu.Item>
              <Menu.Item
                key="sub4c"
                icon={<Icons.PlusCircleOutlined />}
                onClick={() =>
                  handleFunction(`${path.incomes}/add`, 'Incomes/Add', 'sub4c')
                }
              >
                <Link to={`${path.incomes}/add`}>Add</Link>
              </Menu.Item>
              <Menu.Item
                key="sub4d"
                icon={<Icons.CloudUploadOutlined />}
                onClick={() =>
                  handleFunction(
                    `${path.incomes}/upload`,
                    'Incomes/Upload',
                    'sub4d'
                  )
                }
              >
                <Link to={`${path.incomes}/upload`}>Upload</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub5"
              title={
                <span>
                  <Icons.HeartOutlined />
                  <span>Donations</span>
                </span>
              }
            >
              <Menu.Item
                key="sub5a"
                icon={<Icons.SettingOutlined />}
                onClick={() =>
                  handleFunction(
                    `${path.donations}/settings`,
                    'Donations/Settings',
                    'sub5a'
                  )
                }
              >
                <Link to={`${path.donations}/settings`}>Settings</Link>
              </Menu.Item>
              <Menu.Item
                key="sub5b"
                icon={<Icons.OrderedListOutlined />}
                onClick={() =>
                  handleFunction(`${path.donations}`, 'Donations', 'sub5b')
                }
              >
                <Link to={`${path.donations}`}>List</Link>
              </Menu.Item>
              <Menu.Item
                key="sub5c"
                icon={<Icons.PlusCircleOutlined />}
                onClick={() =>
                  handleFunction(
                    `${path.donations}/add`,
                    'Donations/Add',
                    'sub5c'
                  )
                }
              >
                <Link to={`${path.donations}/add`}>Add</Link>
              </Menu.Item>
              <Menu.Item
                key="sub5d"
                icon={<Icons.CloudUploadOutlined />}
                onClick={() =>
                  handleFunction(
                    `${path.donations}/upload`,
                    'Donations/Upload',
                    'sub5d'
                  )
                }
              >
                <Link to={`${path.donations}/upload`}>Upload</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub6"
              title={
                <span>
                  <Icons.ShoppingOutlined />
                  <span>Loans</span>
                </span>
              }
            >
              <Menu.Item
                key="sub6a"
                icon={<Icons.SettingOutlined />}
                onClick={() =>
                  handleFunction(
                    `${path.loans}/settings`,
                    'Loans/Settings',
                    'sub6'
                  )
                }
              >
                <Link to={`${path.loans}/settings`}>Settings</Link>
              </Menu.Item>
              <Menu.Item
                key="sub6b"
                icon={<Icons.OrderedListOutlined />}
                onClick={() =>
                  handleFunction(`${path.loans}`, 'Loans', 'sub6b')
                }
              >
                <Link to={`${path.loans}`}>List</Link>
              </Menu.Item>
              <Menu.Item
                key="sub6c"
                icon={<Icons.PlusCircleOutlined />}
                onClick={() =>
                  handleFunction(`${path.loans}/add`, 'Loans/Add', 'sub6c')
                }
              >
                <Link to={`${path.loans}/add`}>Add</Link>
              </Menu.Item>
              <Menu.Item
                key="sub6d"
                icon={<Icons.CloudUploadOutlined />}
                onClick={() =>
                  handleFunction(
                    `${path.loans}/upload`,
                    'Loans/Upload',
                    'sub6d'
                  )
                }
              >
                <Link to={`${path.loans}/upload`}>Upload</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub7"
              title={
                <span>
                  <Icons.UserSwitchOutlined />
                  <span>Users</span>
                </span>
              }
            >
              <Menu.Item
                key="sub7a"
                icon={<Icons.OrderedListOutlined />}
                onClick={() =>
                  handleFunction(`${path.users}`, 'Users', 'sub7a')
                }
              >
                <Link to={`${path.users}`}>List</Link>
              </Menu.Item>
              <Menu.Item
                key="sub7b"
                icon={<Icons.PlusCircleOutlined />}
                onClick={() =>
                  handleFunction(`${path.users}/add`, 'Users/Add', 'sub7b')
                }
              >
                <Link to={`${path.users}/add`}>Add</Link>
              </Menu.Item>
            </SubMenu>
            {user.admin_id !== 0 ? (
              <Menu.Item key="3" icon={<Icons.LoadingOutlined spin />}>
                <Link to="" onClick={() => onImpersonate()}>
                  Switch to Admin
                </Link>
              </Menu.Item>
            ) : null}
          </>
        ) : (
          <>
            <Menu.Item key="4" icon={<Icons.UsergroupAddOutlined />}>
              <Link to={path.clients}>Clients</Link>
            </Menu.Item>
          </>
        )}
      </Menu>
    </Sider>
  )
})
