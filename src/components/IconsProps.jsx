import React, { useState } from "react";
import { Tooltip, IconButton } from "@mui/material";

export const IconsProps = ({ RenderIcon, tip, renderContext,controller }) => {
  const [visibility, setVisibility] = useState(false);

  return (
    <>
      <Tooltip title={tip}>
        <IconButton onClick={() => controller(renderContext)}>
          <RenderIcon style={{ fontSize: 100,color: '#3f51b5'  }}/> {/* Set fontSize to 20px here */}
        </IconButton>
      </Tooltip>
    </>
  );
};
