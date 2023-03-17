import type { NextPage } from 'next'
import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import * as Yup from 'yup'
import {
  Anchor,
  TextInput,
  Button,
  Group,
  PasswordInput,
  Alert,
} from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'
import { AuthForm } from '../types'

const schema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('No email provided'),
  password: Yup.string()
    .required('No password provided')
    .min(5, 'Password should be min 5 chars'),
})

const Home: NextPage = () => {
  const router = useRouter()
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState('')
  const form = useForm<AuthForm>({
    validate: yupResolver(schema),
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirm_password: '',
    },
  })
  const handleSubmit = async () => {
    try {
      if (isRegister) {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
          name: form.values.name,
          email: form.values.email,
          password: form.values.password,
          confirm_password: form.values.confirm_password,
        })
      }
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
        email: form.values.email,
        password: form.values.password,
      })
      form.reset()
      router.push('/dashboard')
    } catch (e: any) {
      setError('error')
    }
  }
  return (
    <>
      {error && (
        <Alert
          my="md"
          variant="filled"
          title="Authorization Error"
          color="red"
          radius="md"
        >
          {error}
        </Alert>
      )}
      <form onSubmit={form.onSubmit(handleSubmit)}>
      {isRegister ? 
        (
          <>
            <TextInput
              mt="md"
              id="name"
              label="Name"
              placeholder="name"
              {...form.getInputProps('name')}
            />
            <TextInput
              mt="md"
              id="email"
              label="Email"
              placeholder="example@gmail.com"
              {...form.getInputProps('email')}
            />
            <PasswordInput
              mt="md"
              id="password"
              label="Password"
              placeholder="password"
              description="Must be min 5 char"
              {...form.getInputProps('password')}
            />
            <PasswordInput
              mt="md"
              id="confirm_password"
              label="ConfirmPassword"
              placeholder="confirm_password"
              description="Must be min 5 char"
              {...form.getInputProps('confirm_password')}
            />
          </>
        )
        :
        (
          <>
            <TextInput
              mt="md"
              id="email"
              label="Email"
              placeholder="example@gmail.com"
              {...form.getInputProps('email')}
            />
            <PasswordInput
              mt="md"
              id="password"
              label="Password"
              placeholder="password"
              description="Must be min 5 char"
              {...form.getInputProps('password')}
            />
          </>
        )
      }
          <Anchor
            type="button"
            size="xs"
            className="text-gray-300"
            onClick={() => {
              setIsRegister(!isRegister)
              setError('')
            }}
          >
            {isRegister
              ? 'SignInページ'
              : 'SignUpページ'}
          </Anchor>
          <Button
            color="cyan"
            type="submit"
          >
            {isRegister ? 'Register' : 'SignIn'}
          </Button>
      </form>
    </>
  )
}

export default Home
