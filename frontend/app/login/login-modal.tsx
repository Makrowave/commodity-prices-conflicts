import {useAuth} from "~/auth/auth-context";
import {Button, TextField} from "@mui/material";
import { useState } from "react";
import PasswordInput from "~/login/password-input";
import type {ModalBody} from "~/modal/material-modal";

export default function LoginModal({closeModal}: ModalBody) {
  const {login} = useAuth()
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleLogin = () => {
    login(username, password)
    if(closeModal) closeModal()
  }
  return (
    <>
      <TextField label={"Nazwa użytkownika"} value={username} onChange={(e) => setUsername(e.target.value)} />
      <PasswordInput value={password} onChange={setPassword} />
      <Button color={"primary"} variant={"contained"} onClick={handleLogin}>
        Zaloguj
      </Button>
    </>
  )
}