import {cloneElement, useState, type ReactElement} from "react";
import {Box, IconButton, Modal, Paper, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

type ModalProps = {
  children: ReactElement<{ closeModal: () => void }>;
  button: ReactElement<{ onClick?: () => void }>;
  label: string,
}

export type ModalBody = {
  closeModal?: () => void;
}

export default function MaterialModal({button, label, children}: ModalProps) {
  const [open, setOpen] = useState(false);

  const ChildComponent = () => {
    return cloneElement(children,
      {
        ...children.props,
        closeModal: () => setOpen(false),
      }
    )
  }

  const ButtonComponent = () => {
    return cloneElement(button,
      {
        ...button.props,
        onClick: () => setOpen(true),
      }
    )
  }

  return (
    <div>
      <ButtonComponent />
      <Modal open={open} onClose={() => setOpen(false)}>
        <Paper sx={modalStyle}>
          {/* Header */}
          <Box
            sx={headerStyle}
          >
            <Typography variant="h6">{label}</Typography>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Content */}
          <Box
            sx={contentStyle}
          >
            <ChildComponent />
          </Box>
        </Paper>
      </Modal>
    </div>
  );
}
const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  border: "2px solid #000",
  boxShadow: 24,
  minWidth: 350,
  width: "fit-content",
  p: 2,
};
const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  pb: 2,
  borderBottom: "1px solid #ccc",
};
const contentStyle = {
  pt: 2,
  display: "flex",
  flexDirection: "column",
  gap: 2,
  flexGrow: 1,
  minWidth: "18rem",
};