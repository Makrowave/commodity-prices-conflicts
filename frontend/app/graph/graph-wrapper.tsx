import {type ReactNode, useEffect, useState} from "react";
import {calculateWidth} from "~/const/layout-consts";
import {Paper, type SxProps} from "@mui/material";

type GraphWrapperProps = {
  children: ReactNode;
  sx: SxProps | undefined;
}

export default function GraphWrapper({children, sx}: GraphWrapperProps) {

  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <Paper sx={{width: calculateWidth(width), p: 2, overflowX: 'auto', whiteSpace: 'nowrap', position: 'relative', ...sx}}>
      {children}
    </Paper>
  )
}