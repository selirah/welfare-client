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

const List = observer(() => {
  const { memberStore } = useStore()

  useEffect(() => {
    memberStore.get()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderLoader = () => <Loader />

  const renderEmpty = () => (
    <Empty>
      <Link to={`${path.members}/add`}>
        <Button type="primary" icon={<PlusOutlined />}>
          Add
        </Button>
      </Link>
    </Empty>
  )

  const renderList = () => {
    return <h1>List</h1>
  }

  return (
    <Fragment>
      {memberStore.loading
        ? renderLoader()
        : !memberStore.members.length
        ? renderEmpty()
        : renderList()}
    </Fragment>
  )
})

export default List
