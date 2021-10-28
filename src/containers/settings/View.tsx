import { useEffect, Fragment } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from 'hooks/StoreHook'
import Loader from 'components/Loader'
import Empty from 'components/Empty'
import { Button, Row, Col, Avatar, Divider } from 'antd'
import { path } from 'helpers/path'
import { PlusOutlined, EditOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { getPaymentType } from 'utils'

const View = observer(() => {
  const { institutionStore, authStore } = useStore()

  useEffect(() => {
    institutionStore.get(authStore.user!.institution_id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderLoader = () => <Loader />

  const renderEmpty = () => (
    <Empty>
      <Link to={`${path.settings}/add`}>
        <Button type="primary" icon={<PlusOutlined />}>
          Add
        </Button>
      </Link>
    </Empty>
  )

  const getInitials = (name: string) => {
    const initials = name.match(/\b\w/g) || []
    return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase()
  }

  const renderView = () => {
    const { institution } = institutionStore
    return (
      <Row
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}
      >
        {institution && institution.logo ? (
          <Avatar
            size={100}
            src={institution.logo}
            style={{ verticalAlign: 'middle' }}
          />
        ) : (
          <Avatar
            size={100}
            style={{ backgroundColor: '#7367f0', verticalAlign: 'middle' }}
          >
            {getInitials(institution ? institution.name : '')}
          </Avatar>
        )}
        <Divider />
        <Col sm={24} md={24} lg={24}>
          <Row>
            <Col sm={24} md={24} lg={12}>
              <h4 className="school-labels">Name</h4>
              <h4 className="school-values">
                {institution ? institution.name : ''}
              </h4>
            </Col>
            <Col sm={24} md={24} lg={12}>
              <h4 className="school-labels">Email</h4>
              <h4 className="school-values">
                {institution ? institution.email : ''}
              </h4>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col sm={24} md={24} lg={12}>
              <h4 className="school-labels">Location</h4>
              <h4 className="school-values">
                {institution ? institution.location : ''}
              </h4>
            </Col>
            <Col sm={24} md={24} lg={12}>
              <h4 className="school-labels">Phone</h4>
              <h4 className="school-values">
                {institution ? institution.phone : ''}
              </h4>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col sm={24} md={24} lg={12}>
              <h4 className="school-labels">Sender ID</h4>
              <h4 className="school-values">
                {institution ? institution.sender_id : ''}
              </h4>
            </Col>
            <Col sm={24} md={24} lg={12}>
              <h4 className="school-labels">API Key</h4>
              <h4 className="school-values">
                {institution ? institution.api_key : ''}
              </h4>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col sm={24} md={24} lg={12}>
              <h4 className="school-labels">Payment Type</h4>
              <h4 className="school-values">
                {institution
                  ? getPaymentType(parseInt(institution.payment_type))
                  : ''}
              </h4>
            </Col>
          </Row>
          <Divider />
          <Col sm={24} md={24} lg={12}>
            <Link to={`${path.settings}/edit`}>
              <Button type="primary" icon={<EditOutlined />}>
                Edit
              </Button>
            </Link>
          </Col>
        </Col>
      </Row>
    )
  }

  return (
    <Fragment>
      {institutionStore.loading
        ? renderLoader()
        : !institutionStore.institution
        ? renderEmpty()
        : renderView()}
    </Fragment>
  )
})

export default View
