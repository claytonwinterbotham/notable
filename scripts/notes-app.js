'use strict'

//Get saved notes
let notes = getSavedNotes()

const filters = {
    searchText: '',
    sortBy: 'byEdited'
}

//Call render notes to initiate list
renderNotes(notes, filters)

//Create a note when button is clicked
document.querySelector('#create-note').addEventListener('click', (e) => {
   const id = uuidv4()
   const timestamp = moment().valueOf()   
   notes.push({
       id: id,
       title: '',
       body: '',
       createdAt: timestamp,
       updatedAt: timestamp
   })
   saveNotes(notes)
   location.assign(`/edit.html#${id}`)
})

//Search text and re-render notes based on search text
document.querySelector('#search-text').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderNotes(notes, filters)
})

//Drop down list handler
document.querySelector('#filter-by').addEventListener('change', (e) => {
    filters.sortBy = e.target.value
    renderNotes(notes, filters)
})

window.addEventListener('storage', (e) => {
    if(e.key === 'notes'){
        notes = JSON.parse(e.newValue)
        renderNotes(notes, filters)
    }  
})

