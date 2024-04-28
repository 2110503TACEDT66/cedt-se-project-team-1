import { Button, ButtonProps } from '@mui/material'
import React from 'react'

export default function RedeemButton(prop: ButtonProps) {
  return (
    <Button
        size="small" 
        variant="outlined" 
        sx={{
            borderColor: '#426B1F', 
            color: '#426B1F',
            hover: {
                borderColor: '#426B1F',
                color: '#426B1F',
                backgroundColor: '#426B1F'
            }
        }}
        {...prop}
    />
  )
}
