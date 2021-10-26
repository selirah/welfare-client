import { Menu } from 'antd'
import { observer } from 'mobx-react-lite'
import * as Icons from '@ant-design/icons'
import { path } from '../../helpers/path'
import { useStore } from 'hooks/StoreHook'
import { Link } from 'react-router-dom'

export const SettingsMenu = observer(() => {
  const { authStore } = useStore()
  return (
    <Menu>
      <Menu.Item key="1" icon={<Icons.ProfileOutlined />}>
        <Link to={path.profile}>Profile</Link>
      </Menu.Item>
      <Menu.Item
        key="2"
        icon={<Icons.LogoutOutlined />}
        onClick={() => authStore.onLogoutUser()}
      >
        Logout
      </Menu.Item>
    </Menu>
  )
})
