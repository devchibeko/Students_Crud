const _name = document.querySelector('#name')
const _surname = document.querySelector('#surname')
const _course = document.querySelector('#course')
const _add = document.querySelector('#add')

const _id = document.querySelector('#id')
const _delete = document.querySelector('#delete')
const _tbody = document.querySelector('#tbody')

const URL = 'http://localhost:8080/student'

_tbody.innerHTML = ''
axios.get(URL)
  .then(res => {
    for(t of res.data) {
      _tbody.innerHTML += `
      <tr>
        <th scope="col">${t.id}</th>
        <td>${t.name}</td>
        <td>${t.surname}</td>
        <td>${t.course}</td>
      </tr>` 
    }
  })


  _add.onclick = () => {
    let body = {
      name: _name.value,
      surname: _surname.value,
      course: _course.value
    }
    axios.post(URL, body)
      .then(res => {
        _name.value = ''
        _surname.value = ''
        _course.value = ''
      })
  }


  _delete.onclick = () => {
    let id = {
      id: _id.value
    }
    axios.delete(URL+ `/${_id.value}`)
      .then(res => {
        _id.value = ''
      })
  }
