import { NextPage } from 'next'
import { UserInfo } from '../components/UserInfo'
import { useQueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Button } from '@mantine/core'

const Dashboard: NextPage = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const signout = async () => {
    queryClient.removeQueries(['user'])
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signout`)
    router.push('/')
  }
  return (
    <QueryClientProvider client={queryClient}>
      <Button color="cyan" onClick={signout}>SignOut</Button>
      CurrentUser: <UserInfo />
    </QueryClientProvider>
  )
}

export default Dashboard
