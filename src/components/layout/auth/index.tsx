import React from 'react'
import { useState, FormEvent, ChangeEvent } from "react"
import { AuthMode, AuthStep, AuthFormData } from "@/app/types/Auth"
import Email from "@/components/layout/auth/Email"
import Password from "@/components/layout/auth/Password"
import {Button} from "@/components/ui/button"
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

    export default function AuthContent() {
    const [mode, setMode] = useState<AuthMode>("login")
    const [step, setStep] = useState<AuthStep>(1)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [authFormData, setAuthFormData] = useState<AuthFormData>({
        email: "",
        password: ""
    })
    const router = useRouter()

    
    const toggleMode = (): void => {
        setMode(mode === "login" ? "register" : "login")
        setStep(1)
        setAuthFormData({ email: "", password: "" })
    }

    const handleNextStep = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        if (step === 1 && isValidEmail(authFormData.email)) {
        setStep(2)
        }
    }

    const handlePrevStep = (): void => {
        setStep(1)
    }

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setAuthFormData({ ...authFormData, email: e.target.value})
    }

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setAuthFormData({ ...authFormData, password: e.target.value})
    }

    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const getStepTitle = (): string => {
        return mode === "login" ? "Iniciar Sesión" : "Registrarse"
    }

    const getStepSubtitle = (): string => {
        return mode === "login" ? "Accede a tu cuenta" : "Crea tu nueva cuenta"
    }

    const getSubmitButtonText = (): string => {
        if (isLoading) return "Procesando..."
        return mode === "login" ? "Iniciar Sesión" : "Crear Cuenta"
    }

    const getToggleText = (): string => {
        return mode === "login" ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"
    }

    const getToggleButtonText = (): string => {
        return mode === "login" ? "Registrarse" : "Iniciar Sesión"
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()
        setIsLoading(true)

        try {

        if (mode === "login") {
            const { data, error } = await supabase.auth.signInWithPassword({
            email: authFormData.email,
            password: authFormData.password,
            })
            if (error) throw error

            router.push('/dashboard')
            

        } else {
            const { data, error } = await supabase.auth.signUp({
            email: authFormData.email,
            password: authFormData.password,
            })
            if (error) throw error
            
            router.push('/dashboard')
        }
        } catch (error) {
        console.error("Auth error:", error)
        } finally {

            setIsLoading(false)
        }
    }
    return (
        <div className={`flex items-center justify-center p-4 h-screen `}>
            <div className="bg-secondary w-full max-w-md text-primary p-8 shadow-lg">
                
                {/*TOP CONTENT*/}
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">{getStepTitle()}</h1>
                    <p className="text-gray-600">{getStepSubtitle()}</p>
                </div>
        
                
                {/* CENTER CONTENT */}
                {/* Step 1: Email */}
                {step === 1 && (
                    <Email 
                    handleNextStep={handleNextStep} 
                    handleEmailChange={handleEmailChange} 
                    email={authFormData.email} 
                    isValidEmail={isValidEmail}/>
                )}
        
                {/* Step 2: Password */}
                {step === 2 && (
                    <Password  
                    handlePrevStep={handlePrevStep}
                    handlePasswordChange={handlePasswordChange}
                    password={authFormData.password} 
                    isLoading={isLoading} 
                    mode={mode}
                    handleSubmit={handleSubmit} 
                    getSubmitButtonText={getSubmitButtonText}
                    />
                )}
        
                {/* BOTTON CONTENT */}
                {/* Toggle Mode */}
                <div className="mt-8 text-center">
                    <p className="text-gray-600 mb-2">{getToggleText()}</p>
                    <Button
                    type="button"
                    onClick={toggleMode}
                    className="hover:shadow-lg hover:opacity-95 transition-colors"
                    >
                    {getToggleButtonText()}
                    </Button>
                </div>
            </div>            
        </div>
    )
    }
