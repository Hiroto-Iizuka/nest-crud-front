import type { NextPage } from 'next'

const SignIn: NextPage = () => {
  return (
    <>
      <h1>SignIn</h1>
      <label>
        email:
        <input type="email" name="email" />  
      </label>
      <br />
      <label>
        password:
        <input type="password" name="password" />
      </label>
      <br />
      <input type="submit" value="Sign In" />
      <br /> 
      <a href="">Forgot Your Password?</a>
    </>
  )
}

export default SignIn
