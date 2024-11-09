import { IoTrashOutline } from "react-icons/io5";
import { Button, InputNumber, Tooltip } from 'antd'
import React from 'react'

export default function CartPage() {
  return (
    <>
      <div>CartPage 
      <Tooltip title="Xóa" color="red">
        <Button danger type="primary" shape="default" icon={<IoTrashOutline size={22} />} />
      </Tooltip>
      </div>
      
    </>

  )
}
