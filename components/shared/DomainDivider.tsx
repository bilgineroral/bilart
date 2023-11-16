import * as React from "react";

import {
  useTheme
} from "@mui/material";

export function DomainDivider() {

  const theme = useTheme();

  return (
    <div style={{width : "100%", height : "1px", backgroundColor : theme.palette.background.default}} />
  )
}