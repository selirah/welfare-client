import React, { useState, useEffect, useContext } from 'react'
import { Route, Redirect, useHistory } from 'react-router-dom'
import { Layout, message } from 'antd'
import { path } from 'helpers/path'
import { SideBar } from 'components/menu/SideBar'
import { TopBar } from 'components/menu/TopBar'
import { constants } from 'helpers/constants'
import { AuthContext } from 'contexts'

const PrivateRoute: React.FC<any> = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext)
  const [collapsed, setCollapsed] = useState(false)
  const history = useHistory()

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
    const payload = {
      id: user!.admin_id,
      admin_id: 0,
      action: 'admin'
    }
    // dispatch(switchAdminRequest(payload))
  }

  return (
    <React.Fragment>
      <Route
        {...rest}
        render={(props) =>
          user ? (
            <Layout className="min-height-vh">
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
}

export { PrivateRoute }
