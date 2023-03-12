import type { NextPage } from 'next'

const SignUp: NextPage = () => {
  return (
    <>
      <h1>SignUp</h1>
      <label>
        name:
        <input type="text" name="name" />
      </label>
      <br />
      <label>
        email:
        <input type="email" name="email" />  
      </label>
      <br />
      <label>
        password
        <input type="password" name="password" />
      </label>
      <br />
      <label>
        confirm password:
        <input type="password" name="confirmPassword" />  
      </label>
      <br />
      <input type="submit" value="Sign Up" />
      <br />
      <a href="/signin">サインインはこちら</a>
    </>
  )
}

export default SignUp
