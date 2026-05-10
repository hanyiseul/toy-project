export const UserForm = () => {
  return (
   <div className="form">
      <h2 className="login-title">회원정보</h2>
      <form className="login-form">
        <div>
          <label htmlFor="username">username</label>
          <input type="text" id="username" placeholder="username" name="username" autoComplete="username" required readOnly/>
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
        <button type="submit" className="btn btn--from btn-login">정보 수정</button>
        <button type="submit" className="btn btn--from btn-login">회원 탈퇴</button>
      </form>
    </div>
  )
}