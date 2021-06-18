let url = 'https://60c98a90772a760017203b39.mockapi.io/users'

const myForm = document.querySelector('.form')
myForm.addEventListener('submit', async function (e) {
  e.preventDefault()
  const formData = new FormData(myForm)
  const formDataObj = Object.fromEntries(formData)
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(formDataObj),
    headers: { 'Content-Type': 'application/json' },
  })
  const json = await response.json().then(() => location.reload())
})

fetch(url, { method: 'GET' })
  .then((data) => data.json())
  .then((user) => getUser(user))

function getUser(user) {
  console.log(user)
  let container = document.querySelector('body > div')
  user.forEach((us) => {
    const cardHtml = `
    <div class="card" id=${us.id}>
    <div>
        <img class="avatar" src="${us.avatar}" />
      <button id="del" class="btn">Delete</button>
      </div>
      <div class="user-info">
        <h2>${us.name}</h2>
        <p>${us.createdAt}</p>
      </div>
    </div>`
    container.insertAdjacentHTML('afterbegin', cardHtml)
  })
}

let card = document.querySelector('.card')
let container = document.querySelector('body > div')

container.addEventListener('click', (e) => {
  e.preventDefault()
  let delBtn = e.target.id == 'del'
  let id = e.target.parentElement.parentElement.id
  if (delBtn) {
    fetch(`${url}/${id}`, { method: 'DELETE' })
      .then((response) => response.json())
      .then(() => location.reload())
  }
})
