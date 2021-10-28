import React, { useState } from 'react'
import { Route, Redirect /*, useHistory*/ } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Layout } from 'antd'
import { path } from 'helpers/path'
import { SideBar } from 'components/menu/SideBar'
import { TopBar } from 'components/menu/TopBar'
import { useStore } from 'hooks/StoreHook'

const PrivateRoute: React.FC<any> = observer((props) => {
  const { component: Component, ...rest } = props
  const {
    authStore: { user }
  } = useStore()
  const [collapsed, setCollapsed] = useState(false)
  // const history = useHistory()

  // useEffect(() => {
  //   const { switchAdminSuccess, switchAdminFailure, page, error } = adminStore
  //   if (switchAdminSuccess && page === constants.admin) {
  //     dispatch(clearBooleanStates())
  //     // window.location.href = path.clients;
  //     dispatch(switchMenu(path.clients))
  //     history.push(path.clients)
  //   }
  //   if (switchAdminFailure && page === constants.admin) {
  //     message.error(JSON.stringify(error))
  //     dispatch(clearBooleanStates())
  //   }
  // }, [adminStore, dispatch, history])

  const toggle = () => {
    setCollapsed(!collapsed)
  }

  const onImpersonate = () => {
    // const payload = {
    //   id: user!.admin_id,
    //   admin_id: 0,
    //   action: 'admin'
    // }
    // dispatch(switchAdminRequest(payload))
  }

  return (
    <React.Fragment>
      <Route
        {...rest}
        render={(props) =>
          user ? (
            <Layout style={{ minHeight: '100vh' }}>
              <SideBar
                collapsed={collapsed}
                onCollapsed={toggle}
                user={user!}
                onImpersonate={onImpersonate}
              />
              <Layout className="site-layout">
                <TopBar collapsed={collapsed} toggle={toggle} />
                <Component {...props} />
              </Layout>
            </Layout>
          ) : (
            <Redirect to={path.login} />
          )
        }
      />
    </React.Fragment>
  )
})

export default PrivateRoute
