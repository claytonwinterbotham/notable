'use strict'

const noteTitle = document.querySelector('#note-title') 
const noteBody = document.querySelector('#note-body')
const lastEdited = document.querySelector('#last-edited')
const noteId = location.hash.substring(1)
let notes = getSavedNotes()
let note = notes.find((note) => note.id === noteId)

if(!note){
    location.assign('/index.html')
}

noteTitle.value = note.title
noteBody.value = note.body
lastEdited.textContent = `Last edited ${moment(note.updatedAt).fromNow()}` 

noteTitle.addEventListener('input', (e) => {
    const timestamp = moment().valueOf()
    note.title = e.target.value
    note.updatedAt = timestamp
    lastEdited.textContent = `Last edited ${moment(note.updatedAt).fromNow()}`
    saveNotes(notes)
})

noteBody.addEventListener('input', (e) => {
    const timestamp = moment().valueOf()
    note.body = e.target.value
    note.updatedAt = timestamp
    lastEdited.textContent = `Last edited ${moment(note.updatedAt).fromNow()}`
    saveNotes(notes)
})

document.querySelector('#remove-note').addEventListener('click', (e) => {
    const noteIndex = notes.findIndex((note) => notes.id === note.id)
    notes.splice(noteIndex, 1)
    saveNotes(notes)
    location.assign('/index.html')
})

window.addEventListener('storage', (e) => {
    if(e.key === 'notes') {
        notes = JSON.parse(e.newValue)
        note = notes.find((note) => note.id === noteId)
        
        if(!note){
            location.assign('/index.html')
        }
        
        noteTitle.value = note.title
        noteBody.value = note.body
        lastEdited.textContent = `Last edited ${moment(note.updatedAt).fromNow()}`
    }
})

