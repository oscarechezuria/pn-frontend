import React, {ChangeEvent, FormEvent} from 'react'
import { ArrowLeft, Lock } from "lucide-react"
import { AuthMode } from "@/app/types/Auth"
import {Button} from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type PasswordProps = {
  handlePrevStep: () => void
  handlePasswordChange: (e: ChangeEvent<HTMLInputElement>) => void 
  password: string
  isLoading: boolean
  mode: AuthMode
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
  getSubmitButtonText: () => string
}

export default function password({handlePrevStep, handlePasswordChange, password, isLoading, mode, handleSubmit, getSubmitButtonText}: PasswordProps) {
  

  const isValidPassword = (password: string): boolean => {
    return password.length >= 6
  }



  return (
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="space-y-2">
                <label htmlFor="password" className="text-primary flex items-center gap-2 text-sm font-medium">
                  <Lock className="w-4 h-4" aria-hidden="true" />
                  Contraseña
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  inputMode='text'
                  placeholder="Introduce tu contraseña"
                />
                <p id="password-help" className="text-gray-500 text-xs">
                  La contraseña debe tener al menos 6 caracteres
                </p>
                {password && !isValidPassword(password) && (
                  <p id="password-error" className="text-red-600 text-sm" role="alert">
                    La contraseña debe tener al menos 6 caracteres
                  </p>
                )}
              </div>

              <div className="flex flex-col md:flex-row justify-between gap-3">
                <Button
                  type="button"
                  onClick={handlePrevStep}
                  aria-label="Volver al paso anterior"
                  className='flex-1 cursor-pointer'
                  variant={"outline"}
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  Atrás
                </Button>

                <Button
                  type="submit"
                  className={`flex-1 justify-center cursor-pointer  ${!isValidPassword(password) ? "" : "hover:shadow-lg hover:opacity-95 transition-colors"} `}
                  disabled={isLoading || !isValidPassword(password)}
                  aria-describedby="submit-help"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 border-2 border-secondary border-t-transparent rounded-full animate-spin"
                        aria-hidden="true"
                      />
                      <span>Procesando...</span>
                    </div>
                  ) : (
                    getSubmitButtonText()
                  )}
                </Button>
              </div>
              <p id="submit-help" className="sr-only">
                {mode === "login" ? "Inicia sesión con tu cuenta" : "Crea tu nueva cuenta"}
              </p>
          </form>
  )
}

