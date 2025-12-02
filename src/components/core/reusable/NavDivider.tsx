import {Divider, SxProps} from "@mui/material"

import React from 'react'

interface NavDividerProps {
  sx?: SxProps;
}

const NavDivider: React.FC<NavDividerProps> = ({ sx }) => {
  return (
    <>
    <Divider
            orientation="vertical"
            flexItem
            sx={{
              borderColor: "Neutral.30",
              alignSelf: "center",
              my: "auto",
              ...sx
            }}
          />
    </>
  )
}

export default NavDivider