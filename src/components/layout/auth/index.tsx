import React from 'react'
import { useState, FormEvent, ChangeEvent } from "react"
import { AuthMode, AuthStep, AuthFormData } from "@/app/types/Auth"
import Email from "@/components/layout/auth/Email"
import Password from "@/components/layout/auth/Password"
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

    export default function AuthContent() {
    const [step, setStep] = useState<AuthStep>(1)
    const [authMode, setAuthMode] = useState<AuthMode>('login')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [authFormData, setAuthFormData] = useState<AuthFormData>({
        email: "",
        password: ""
    })


    const router = useRouter()

    const handleNextStep = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        if (step === 1 && isValidEmail(authFormData.email)) {
        //Validar si el email existe en la tabla profiles
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


    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()

        /*Lo primero es validar si el email existe en la tabla profiles, si exite tratarlo con signInWithPassword si no con signUp */

        setIsLoading(true)

        try {

        if (authMode === 'login') {

            const { data, error } = await supabase.auth.signInWithPassword({
            email: authFormData.email,
            password: authFormData.password,
            })

            if (error) {
                console.log("Login error:", error)
                throw error
            }

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
        <div className={`flex items-start justify-center px-4 pt-10 lg:pt-24 lg:items-center lg:mt-0 `}>
            <div className="bg-secondary w-full max-w-md text-primary py-8 px-4 lg:p-8">
                
                {/*TOP CONTENT*/}
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">Bienvenid@</h1>
                    <p className="text-gray-600">Accede o crea tu cuenta</p>
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
                    handleSubmit={handleSubmit} 
                    />
                )}
        
            </div>            
        </div>
    )
    }
