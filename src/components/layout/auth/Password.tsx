import React, {ChangeEvent, FormEvent} from 'react'
import { ArrowLeft, Lock } from "lucide-react"
import {Button} from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type PasswordProps = {
  handlePrevStep: () => void
  handlePasswordChange: (e: ChangeEvent<HTMLInputElement>) => void 
  password: string
  isLoading: boolean
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
}

export default function password({handlePrevStep, handlePasswordChange, password, isLoading, handleSubmit}: PasswordProps) {
  

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
                  className='h-14 rounded-full'
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

              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className={`w-full cursor-pointer rounded-full h-12 text-md  ${!isValidPassword(password) ? "" : "hover:shadow-lg hover:opacity-95 transition-colors"} `}
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
                    <h2>Continuar</h2>
                  )}
                </Button>
                
                <Button
                  type="button"
                  onClick={handlePrevStep}
                  aria-label="Volver al paso anterior"
                  className='w-full cursor-pointer rounded-full h-12 text-md bg-blue-200 hover:bg-blue-300 text-black'
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  Atrás
                </Button>
              </div>
          </form>
  )
}

