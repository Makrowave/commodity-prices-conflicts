import React, { useState } from "react";
import {
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
type PasswordInputProps = {
  value: string
  onChange: (value: string) => void
}

export default function PasswordInput({value, onChange}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // prevent text selection
  };

  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor="password">Hasło</InputLabel>
      <OutlinedInput
        id="password"
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        label="Hasło"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}