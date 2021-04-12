const getDB = async () =>{
    const initalTodos = await fetch('model/todoL')
    const initalTodosLocal = await initalTodos.json()
    console.log(`This is the inital Todos fetch ${initalTodosLocal}`)
    console.log(initalTodosLocal)
    return initalTodosLocal
}

let postToDB = async (value) =>{
    // let pushToDatabase = await fetch(`http://localhost:3001/model/todoL?todo=${value.todo}&complete=${value.complete}&category=${value.category}&categoryID=${value.categoryID}&id=${value.id}`, {
        let pushToDatabase = await fetch(`model/todoL?todo=${value.todo}&complete=${value.complete}&category=${value.category}&categoryID=${value.categoryID}&id=${value.id}`, {
        method: 'POST'
    })
}

let putToDB = async (value) =>{
    // let pushToDatabase = await fetch(`http://localhost:3001/model/todoL?todo=${value.todo}&complete=${value.complete}&category=${value.category}&categoryID=${value.categoryID}`, {
        let pushToDatabase = await fetch(`model/todoL?todo=${value.todo}&complete=${value.complete}&category=${value.category}&categoryID=${value.categoryID}`, {
        method: 'PUT'
    })
}

let deleteFromDB = async (value) =>{
    console.log(`Deleting: ${value} from the database`)
    // let removeFromDatabase = await fetch(`http://localhost:3001/model/todoL/${value}`, {
        let removeFromDatabase = await fetch(`model/todoL/${value}`, {
        method: 'DELETE'
    })
    return removeFromDatabase
}

let localTodoList = getDB();
console.log(localTodoList)

let itemInput = document.querySelector('#in1')
let catInput = document.querySelector('#in2')

let addToToDo = async (itemV, catV) =>{
    let dbTodoList = await getDB()
    let catLength = dbTodoList.filter(item => item.category == catV)
    console.log(`This is the resulting array: ${catLength}`)
    let tryLength = catLength.length

    let itemTodo = itemV
    let itemComplete = false
    let itemCategory = catV
    let catID = tryLength + 1
    let idV = Math.random()

    let newToDoItem = {todo: itemTodo, complete: itemComplete, category: itemCategory, categoryID: catID, id: idV}

    // initalTodosLocal.push(newToDoItem)

    postToDB(newToDoItem)
    // localStorage.setItem('todoList', JSON.stringify(initalTodosLocal))
    renderTodoList()
}

let renderTodoList = async () =>{
    let dbTodoList = await getDB()
    console.log('This is the render todoList func')
    console.log(dbTodoList)

    let outDest = document.querySelector('#listOut')
    let todoCats = dbTodoList.filter(item => item.categoryID == 1)

    outDest.innerHTML = ""

    console.log('This is a message')
    console.log(`this is a test1: ${dbTodoList[0].todo}`)
    console.log(`this is a test2 (for the category): ${todoCats[0].todo}`)

    todoCats.forEach( item => {
        let itemData = ''

        dbTodoList.forEach(xItem =>{
            if(xItem.category == item.category){
                itemData += `<div class="itemElement" id="a${xItem.id}"><p class="itemText" id="iT${xItem.categoryID}">${xItem.todo}</p><div class="itemTog" id="itemTog${xItem.id}" value="${xItem.id}"></div><div class="itemTog2 itemDelete" value="${xItem.id}">X</div></div>`
            }
        })

        console.log(`Pre sec Data Out: ${item.category}`)
        if(item.category != ''){
            outDest.innerHTML += `<div class="itemCat"><h4>${item.category}</h4>${itemData}</div>`
        }
    })

    document.querySelectorAll('.itemTog').forEach(item => item.addEventListener('click', () => {
        let pleaseWork = item.getAttribute('value')
        let tryThis1 = `#a${pleaseWork}`
        let crossOutSelector = document.querySelector(tryThis1)
        crossOutSelector.classList.toggle("completed")
     }))

     document.querySelectorAll('.itemDelete').forEach(xItem => {
        xItem.addEventListener('click', () => {
            let getID = xItem.getAttribute('value')

            deleteFromDB(getID)

            // let databaseID = initalTodosLocal.findIndex(yItems => yItems._id == getID)
            // initalTodosLocal.splice(databaseID, 1)
            // localStorage.setItem('todoList', JSON.stringify(initalTodosLocal))
            // initalTodosR = localStorage.getItem('todoList')
            // initalTodosLocal = JSON.parse(initalTodosR)
            renderTodoList()
        })
    }) 
}

document.querySelector('#showHide').addEventListener('click', () => {
    let xItem = document.querySelectorAll('.completed')
    xItem.forEach(yItem => {
        yItem.classList.toggle('showHideItem')
    })
})
  
document.querySelector('#subButton').addEventListener('click', () => addToToDo(itemInput.value, catInput.value))
document.querySelector('body').addEventListener('load', renderTodoList())