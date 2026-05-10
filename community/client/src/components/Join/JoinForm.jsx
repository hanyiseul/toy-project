const JoinForm = () => {
  return (
    <div className="form">
      <h2 className="login-title">회원가입</h2>
      <form className="login-form">
        <div>
          <label htmlFor="username">username</label>
          <input type="text" id="username" placeholder="username" name="username" autoComplete="username" required/>
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input type="password" id="password" placeholder="password" name="password" autoComplete="password" required/>
        </div>
        <div>
          <label htmlFor="name">name</label>
          <input type="text" id="name" placeholder="name" name="name" autoComplete="name" required/>
        </div>
        <div>
          <label htmlFor="email">email</label>
          <input type="text" id="email" placeholder="email" name="email" autoComplete="email" required/>
        </div>
        <button type="submit" className="btn btn--from btn-login"> 가입하기</button>
      </form>
    </div>
  )
}
export default JoinForm