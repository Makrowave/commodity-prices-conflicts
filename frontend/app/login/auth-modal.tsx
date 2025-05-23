import {useAuth} from "~/auth/auth-context";
import {Box, Button, TextField, Typography} from "@mui/material";
import {type Dispatch, type SetStateAction, useState} from "react";
import PasswordInput from "~/login/password-input";
import type {ModalBody} from "~/modal/material-modal";

type ModalWithError = {
  setError: Dispatch<SetStateAction<string>>;
}

export default function AuthModal({closeModal}: ModalBody) {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [loginError, setLoginError] = useState<string>("");
  return (
    <>
      <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
        <Typography variant={"subtitle2"}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
        </Typography>
        <Button
          onClick={() => setIsLogin(prev => !prev)}
          variant="text"
          color="inherit"
          disableRipple
          disableElevation
          sx={{fontSize: '0.875rem', fontWeight: 500}}
        >
          {isLogin ? "Sign up" : "Log in"}
        </Button>
      </Box>
      {
        loginError !== "" &&
        <Box>
          <Typography>
            {loginError}
          </Typography>
        </Box>
      }
      {
        isLogin ? (
          <LoginContent closeModal={closeModal} setError={setLoginError}/>
        ) : (
          <RegisterContent closeModal={closeModal} setError={setLoginError}/>
        )
      }
    </>
  )
}

function LoginContent({closeModal, setError}: ModalBody & ModalWithError) {
  const {login} = useAuth()
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleLogin = async () => {
    const result = await login(username, password)
    setError(result)
    if (result === "") {
      if (closeModal) closeModal()
    }

  }
  return (
    <>
      <TextField label={"E-mail"} value={username} onChange={(e) => setUsername(e.target.value)}/>
      <PasswordInput label={"Password"} value={password} onChange={setPassword}/>
      <Button color={"primary"} variant={"contained"} onClick={handleLogin}>
        Log in
      </Button>
    </>
  )
}

function RegisterContent({closeModal, setError}: ModalBody & ModalWithError) {
  const {register} = useAuth()
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const handleRegister = async () => {
    const result = await register(username, email, password, confirmPassword)
    setError(result)
    if (result === "") {
      if (closeModal) closeModal()
    }
  }
  return (
    <>
      <TextField label={"Username"} value={username} onChange={(e) => setUsername(e.target.value)}/>
      <TextField label={"E-mail"} value={email} onChange={(e) => setEmail(e.target.value)}/>
      <PasswordInput label={"Password"} value={password} onChange={setPassword}/>
      <PasswordInput error={confirmPassword !== password}
                     label={"Confirm password"}
                     value={confirmPassword}
                     onChange={setConfirmPassword}/>
      <Button color={"primary"} variant={"contained"} onClick={handleRegister}>
        Sign up
      </Button>
    </>
  )
}