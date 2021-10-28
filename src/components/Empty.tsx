import React from 'react'
import { Empty as E } from 'antd'

const Empty: React.FC = ({ children }) => {
  return (
    <E
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      imageStyle={{
        height: 100
      }}
      description={
        <React.Fragment>
          <span
            style={{
              textAlign: 'center',
              display: 'block',
              fontSize: '1.3em',
              marginBottom: '0.5em',
              fontWeight: 'bold'
            }}
          >
            No data found
          </span>
          No record has been detected
        </React.Fragment>
      }
    >
      {children}
    </E>
  )
}

export default Empty
