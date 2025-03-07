'use client'

import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'

import { postRefresh, postSignIn, postSignOut, postSignUp } from '@/controllers/auth'
import { useMutation } from '@tanstack/react-query'
import { useToast } from './use-toast'

export interface UsePostRefresh {
  nextURL: string
}

export const usePostSignUp = () => {
  const { toast } = useToast()
  const { push } = useRouter()

  const mutation = useMutation({
    mutationFn: postSignUp,
    onSuccess: () => push('/auth/sign/in?registered=true'),
    onError(error) {
      if (error instanceof AxiosError) {
        if (error.status === 409) toast({ title: 'Error', description: 'Usuario existente. Por favor ingrese otro nombre.' })
        else toast({ title: 'Error', description: 'No se pudo crear el usuario. Por favor intente más tarde.' })
      }
    }
  })

  return mutation
}

export const usePostSignIn = () => {
  const { toast } = useToast()
  const { push } = useRouter()

  const mutation = useMutation({
    mutationFn: postSignIn,
    onSuccess: () => push('/'),
    onError(error) {
      if (error instanceof AxiosError) {
        if (error.status === 404) toast({ title: 'Error', description: 'Nombre y/o contraseña incorrecta.' })
        else toast({ title: 'Error', description: 'No se pudo iniciar sesión. Por favor intente más tarde.' })
      }
    }
  })

  return mutation
}

export const usePostSignOut = () => {
  const { toast } = useToast()
  const { push } = useRouter()

  const mutation = useMutation({
    mutationFn: postSignOut,
    onSuccess: () => push('/auth/sign/in'),
    onError: () => toast({ title: 'Error', description: 'Ah ocurrido un error inesperado.' })
  })

  return mutation
}

export const usePostRefresh = ({ nextURL }: UsePostRefresh) => {
  const { toast } = useToast()
  const { replace } = useRouter()

  const mutation = useMutation({
    mutationFn: postRefresh,
    onSuccess: () => replace(nextURL),
    onError: () => toast({ title: 'Error', description: 'Ah ocurrido un error inesperado.' })
  })

  return mutation
}
