import { useState, useEffect } from 'react'
import { autorun } from 'mobx'
import { observer } from 'mobx-react-lite'
import { Form, Button, Input, Row, Col, Alert, Typography } from 'antd'
import { MemberField } from 'interfaces'
import { useStore } from 'hooks/StoreHook'
import { PlusOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { path } from 'helpers/path'
import { openNotification } from 'utils'

const { Text } = Typography

const Add = observer(() => {
  const { memberStore, authStore, institutionStore } = useStore()
  const [initValues] = useState<MemberField>({
    email: '',
    name: '',
    phone: '',
    staff_id: '',
    institution_id: authStore.user ? authStore.user.institution_id : '',
    amount: '',
    payment_type: institutionStore.institution
      ? institutionStore.institution.payment_type
      : ''
  })
  const history = useHistory()
  const { institution } = institutionStore

  const renderError = (error: any) => (
    <Alert
      type="error"
      message={error.message}
      style={{ marginBottom: '10px', marginTop: '10px' }}
    />
  )

  const onSubmit = (values: MemberField) => {
    memberStore.create(values)
  }

  useEffect(() => {
    autorun(() => {
      if (memberStore.success) {
        openNotification('success', 'Nice!', 'Member added successfully')
        history.push(path.members)
      }
    })
  }, [history, memberStore])

  return (
    <Col sm={24} md={24} lg={24}>
      <Row style={{ marginBottom: '15px' }}>
        <Text type="success" strong>
          Add Member
        </Text>
      </Row>
      {memberStore.error ? renderError(memberStore.error) : null}
      <Form
        layout="vertical"
        name="basic"
        initialValues={initValues}
        onFinish={onSubmit}
      >
        <Row gutter={10}>
          <Col sm={24} md={12} lg={6}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Name is required' }]}
              hasFeedback
            >
              <Input placeholder="Name of member.." />
            </Form.Item>
          </Col>
          <Col sm={24} md={12} lg={6}>
            <Form.Item
              name="staff_id"
              label="Member ID"
              rules={[{ required: true, message: 'Member ID is required' }]}
              hasFeedback
            >
              <Input placeholder="Member ID of member.." />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col sm={24} md={12} lg={6}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  type: 'email',
                  message: 'Enter a valid email'
                }
              ]}
              hasFeedback
            >
              <Input placeholder="Email of institution.." />
            </Form.Item>
          </Col>
          <Col sm={24} md={12} lg={6}>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: 'Please input phone number'
                },
                {
                  min: 10,
                  message: 'Phone number must be 10 numbers'
                },
                {
                  max: 10,
                  message: 'Phone number must be 10 numbers'
                }
              ]}
              hasFeedback
            >
              <Input placeholder="Enter member phone number.." />
            </Form.Item>
          </Col>
        </Row>

        {institution && institution.payment_type === 2 ? (
          <Row gutter={10}>
            <Col sm={24} md={12} lg={6}>
              <Form.Item
                name="amount"
                label="Amount"
                rules={[
                  {
                    required: true,
                    message: 'Please amount'
                  }
                ]}
                hasFeedback
              >
                <Input placeholder="Amount member will pay every month.." />
              </Form.Item>
            </Col>
          </Row>
        ) : null}

        <Row>
          <Col sm={24} md={12} lg={6}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={memberStore.isSubmitting}
                icon={<PlusOutlined />}
              >
                {memberStore.isSubmitting ? 'Processing..' : 'Save'}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Col>
  )
})

export default Add
