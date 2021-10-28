import { useEffect } from 'react'
import { autorun } from 'mobx'
import { Layout, Col, Divider, Typography, Button, Upload } from 'antd'
import Routes from './routes'
import { message } from 'antd'
import { useStore } from 'hooks/StoreHook'
import { CloudUploadOutlined } from '@ant-design/icons'
import { openNotification } from 'utils'

const { Content } = Layout
const { Link } = Typography

const Members = () => {
  return (
    <Content className="site-layout-background site-content">
      <Col sm={24} md={24} lg={24}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link strong>Members</Link>
        </div>
        <Divider />
        <Routes />
      </Col>
    </Content>
  )
}

export default Members
