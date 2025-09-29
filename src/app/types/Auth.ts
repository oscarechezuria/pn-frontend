export type AuthMode = "login" | "register"
export type AuthStep = 1 | 2


export interface AuthFormData {
  email: string
  password: string
}

export interface AuthState {
  mode: AuthMode
  step: AuthStep
  formData: AuthFormData
  isLoading: boolean
}