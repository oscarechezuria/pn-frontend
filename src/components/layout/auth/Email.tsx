import { type FormEvent, type ChangeEvent } from "react"
import { Mail } from "lucide-react"
import {Button} from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type EmailProps = {
    handleNextStep: (e: FormEvent<HTMLFormElement>) => void,
    handleEmailChange: (e: ChangeEvent<HTMLInputElement>) => void
    email: string
    isValidEmail: (email: string) => boolean
}

export default function Email({handleNextStep, handleEmailChange, email, isValidEmail}: EmailProps) {
  return (
    <form onSubmit={handleNextStep} className="space-y-6" noValidate>
            <div className="space-y-2">
                <label htmlFor="email" className="text-primary flex items-center gap-2 text-sm font-medium">
                    <Mail className="w-4 h-4" aria-hidden="true" />
                    Correo Electrónico
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="h-14 rounded-full"
                  placeholder="Introduce tu correo electrónico"
                />
                {email && !isValidEmail(email) && (
                    <p id="email-error" className="text-red-600 text-sm" role="alert">
                    Por favor, introduce un correo electrónico válido
                    </p>
                )}
            </div>
            
            <Button
                type="submit"
                className="w-full cursor-pointer rounded-full h-12 text-md"
                disabled={!isValidEmail(email)}
                aria-describedby="continue-help"
            >
                Continuar
            </Button>
    </form>
  )
}

