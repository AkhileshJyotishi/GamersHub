// NavbarLink.tsx
import React from "react"
import { useRouter } from "next/navigation"

import Button from "@/components/ui/button"

interface NavbarLinkProps {
  label: string
  href: string
}

const NavbarLink: React.FC<NavbarLinkProps> = ({ label, href }) => {
  const router = useRouter()

  return (
    <Button
      onClick={() => router.push(href)}
      className="text-[16px] text-[#96969a] whitespace-nowrap"
    >
      {label}
    </Button>
  )
}

export default NavbarLink
