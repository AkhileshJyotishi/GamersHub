// AuthButtons.tsx
import React from "react"

import Button from "@/components/ui/button"

interface AuthButtonsProps {
  onLoginClick: () => void
  onRegisterClick: () => void
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ onLoginClick, onRegisterClick }) => (
  <div className="flex items-center gap-3 mt-2 whitespace-pre w-fit">
    <Button variant="secondary" onClick={onLoginClick}>
      Log In
    </Button>
    <Button variant="primary" onClick={onRegisterClick}>
      Sign Up
    </Button>
  </div>
)

export default AuthButtons
