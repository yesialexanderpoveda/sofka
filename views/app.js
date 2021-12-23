//open modal

document.querySelector('.modal').addEventListener("click", () => {

  document.querySelector('#modals').innerHTML = `
 
  <div class="mod">

  <div>

  <h4>login<h4> 
  <form id="formlogin" action="/login" method="POST">
  <label for="alias">alias</label>
  <input type="text" id="aliasLog" name="alias">
  <label for="password">contraseña</label>
  <input type="password" id="passwordLog" name="password">
  <button type="submit">login</button>


  </form>

  </div>   


  <div>

  <p>Si usted no tiene alias con su respectiva contraseña por favor regístrece para poder jugar</p>
  <h4>registro</h4>
  <form id="formregister" action="/register" method="POST">
  <label for="alias">alias</label><br>
  <input type="text" id="aliasReg" name="alias"><br>
  <label for="password">contraseña</label><br>
  <input type="password" id="passwordReg" name="password"><br><br>
  <button type="submit">register</button>
  </form>
  
  </div>

  </div>
  `
})

//close modal

document.querySelector('#modals').addEventListener('click', (e) => {
  let mod = document.querySelector('.mod')
  if (mod) {
    if (e.target == mod) mod.style.display = "none"

  }
})