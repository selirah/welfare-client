import React, { Fragment } from 'react'
import { Avatar } from 'antd'
import { ToastWrapper } from './Style'

interface ToastBoxProps {
  color: string
  icon: React.ReactNode
  title: string
  message: string
}

const ToastBox: React.FC<ToastBoxProps> = (props) => {
  const { color, icon, title, message } = props
  return (
    <ToastWrapper>
      <div className="toastify-header">
        <div className="title-wrapper">
          <Avatar size={10} icon={icon} style={{ backgroundColor: color }} />
          <h6 className="toast-title font-weight-bold">{title}</h6>
        </div>
      </div>
      <div className="toastify-body">
        <span>{message}</span>
      </div>
    </ToastWrapper>
  )
}

export default ToastBox
