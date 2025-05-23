import React, {useState} from "react";
import {
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";

type PasswordInputProps = {
  value: string
  onChange: (value: string) => void
  label: string
  error?: boolean
}

export default function PasswordInput({value, onChange, label, error}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // prevent text selection
  };

  return (
    <FormControl variant="outlined" error={error}>
      <InputLabel htmlFor="password">{label}</InputLabel>
      <OutlinedInput
        id="password"
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        label={label}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff/> : <Visibility/>}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}