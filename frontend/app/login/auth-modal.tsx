import {useAuth} from "~/auth/auth-context";
import {Box, Button, CircularProgress, TextField, Typography} from "@mui/material";
import {useState} from "react";
import PasswordInput from "~/login/password-input";
import type {ModalBody} from "~/modal/material-modal";
import {regexes} from "~/const/regexes";

type ModalWithError = {
  setError: (error: string) => void
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
        <Box
          sx={{
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "error.main",
            color: "white",
            p: 2
          }}>
          <Typography>
            {loginError}
          </Typography>
        </Box>
      }
      {
        isLogin ? (
          <LoginContent closeModal={closeModal} setError={(error) => setLoginError(error)}/>
        ) : (
          <RegisterContent closeModal={closeModal} setError={(error) => setLoginError(error)}/>
        )
      }
    </>
  )
}

function LoginContent({closeModal, setError}: ModalBody & ModalWithError) {
  const {login} = useAuth()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const validEmail = regexes.email.test(email)
  const validPassword = regexes.password.test(email)
  const disabledButton = !(validPassword && validEmail)


  const handleLogin = async () => {
    setError("")
    setIsProcessing(true)
    const result = await login(email, password)
    setIsProcessing(false)
    setError(result)
    console.log(result)
    if (result === "") {
      if (closeModal) closeModal()
    }

  }
  return (
    <>
      <TextField
        sx={{
          input: {
            "&:-webkit-autofill": {
              WebkitBoxShadow: "0 0 0 1000px #eeeeee inset",
              WebkitTextFillColor: "black",
              transition: "background-color 5000s ease-in-out 0s",
            },
          },
        }}
        label={"E-mail"}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!validEmail}/>
      <PasswordInput
        label={"Password"}
        value={password}
        onChange={setPassword}
        error={!validPassword}/>
      <Button color={"primary"} variant={"contained"} onClick={handleLogin} disabled={disabledButton}>
        {isProcessing ? <CircularProgress size={24} color="inherit"/> : "Log in"}
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
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const validUsername = regexes.username.test(username)
  const validEmail = regexes.email.test(email)
  const validPassword = regexes.password.test(password)
  const validConfirmPassword = password === confirmPassword
  const disabledButton = !(validUsername && validEmail && validPassword && validConfirmPassword)

  const handleRegister = async () => {
    setError("")
    setIsProcessing(true)
    const result = await register(username, email, password, confirmPassword)
    setIsProcessing(false)
    setError(result)
    if (result === "") {
      if (closeModal) closeModal()
    }
  }
  return (
    <>
      <TextField
        sx={{
          input: {
            "&:-webkit-autofill": {
              WebkitBoxShadow: "0 0 0 1000px #eeeeee inset",
              WebkitTextFillColor: "black",
              transition: "background-color 5000s ease-in-out 0s",
            },
          },
        }} label={"Username"}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        error={!validUsername}/>
      <TextField
        sx={{
          input: {
            "&:-webkit-autofill": {
              WebkitBoxShadow: "0 0 0 1000px #eeeeee inset",
              WebkitTextFillColor: "black",
              transition: "background-color 5000s ease-in-out 0s",
            },
          },
        }}
        label={"E-mail"}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!validPassword}/>
      <PasswordInput label={"Password"} value={password} onChange={setPassword} error={!validPassword}/>
      <PasswordInput error={!validConfirmPassword}
                     label={"Confirm password"}
                     value={confirmPassword}
                     onChange={setConfirmPassword}/>
      <Button color={"primary"} variant={"contained"} onClick={handleRegister} disabled={disabledButton}>
        {isProcessing ? <CircularProgress size={24} color="inherit"/> : "Sign up"}
      </Button>
    </>
  )
}