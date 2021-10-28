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

const Settings = () => {
  const { institutionStore, authStore } = useStore()

  const beforeUpload = (file: File): boolean => {
    const isJPGorPNG = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJPGorPNG) {
      message.error('You can only upload JPG/PNG file!', 5)
    }
    const isLessThan1MB = file.size / 1024 / 1024 < 1
    if (!isLessThan1MB) {
      message.error('Image must be smaller than 2MB!', 5)
    }
    return isJPGorPNG && isLessThan1MB
  }

  const onUploadLogo = (info: any): void => {
    const { file } = info
    const fd = new FormData()
    fd.append('file', file, file.name)
    fd.append('file', file, file.name)
    institutionStore.upload(fd)
  }

  useEffect(() => {
    autorun(() => {
      if (institutionStore.uploaded) {
        openNotification('success', 'Nice!', 'Logo updated successfully')
        institutionStore.get(authStore.user!.institution_id)
      }
    })
  }, [institutionStore, authStore])

  return (
    <Content className="site-layout-background site-content">
      <Col sm={24} md={24} lg={24}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link strong>Settings</Link>
          <Upload
            name="file"
            className="file-uploader"
            beforeUpload={beforeUpload}
            customRequest={onUploadLogo}
            showUploadList={false}
            accept={'.jpeg, .jpg, .png'}
          >
            <Button
              type="primary"
              disabled={institutionStore.isSubmitting}
              icon={<CloudUploadOutlined />}
            >
              Upload Logo (Less than 1MB)
            </Button>
          </Upload>
        </div>
        <Divider />
        <Routes />
      </Col>
    </Content>
  )
}

export default Settings
