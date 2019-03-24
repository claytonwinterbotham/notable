'use strict'

//Read existing notes from local storage
const getSavedNotes = () => {
    const notesJSON = localStorage.getItem('notes')

    try{
        return notesJSON ? JSON.parse(notesJSON) : []
    }catch(e) {
        return []
    }
}

//Save notes to local storage
const saveNotes = (data) => {
    localStorage.setItem('notes', JSON.stringify(data))
}

//Remove a note
const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id)
    if(noteIndex > -1){
        notes.splice(noteIndex, 1)
    }
}

//Generate DOM Structure for a note
const generateNoteDOM = (note) => {
    const noteEl = document.createElement('a')
    const textEl = document.createElement('p')
    const statusEl = document.createElement('p')
    // const button = document.createElement('button')

    // //Setup the remove note button
    // button.textContent = 'X'
    // noteEl.appendChild(button)
    // button.addEventListener('click', (e) => {
    //     removeNote(note.id)
    //     saveNotes(notes)
    //     renderNotes(notes, filters)
    // })

  
    //Setup the note title text
    if(note.title.length > 0) {
        textEl.textContent = note.title
    }else{
        textEl.textContent = 'Unnamed note'
    }
    textEl.classList.add('list-item__title')
    noteEl.appendChild(textEl)

    // Setup the link
    noteEl.setAttribute('href', `/edit.html#${note.id}`)
    noteEl.classList.add('list-item')
    noteEl.appendChild(statusEl)
    //Setup the status message
    statusEl.textContent = `Last edited ${moment(note.updatedAt).fromNow()}`

    noteEl.appendChild(statusEl)

    return noteEl
}

//Sort your notes by one of three ways
const sortNotes = (notes, sortBy) => {
    if(sortBy === 'byEdited') {
        return notes.sort((a, b) => {
            if(a.updatedAt > b.updatedAt){
                return -1
            }else if(a.updateAt < b.updatedAt){
                return 1
            }else {
                0
            }
        })
    }else if(sortBy === 'byCreated'){
        return notes.sort((a, b) => {
            if(a.createdAt > b.createdAt){
                return -1
            }else if(a.created < b.created){
                return 1
            }else{
                return 0
            }
        })
    }else if(sortBy === 'alphabetical'){
        return notes.sort((a, b) => {
            if(a.title.toLowerCase() < b.title.toLowerCase()){
                return -1
            }else if(a.title.toLowerCase() > b.title.toLowerCase()){
                return 1
            }else{
                return 0
            }
        }) 
    }else{
        return notes
    }
}

//Render app notes
const renderNotes = (notes, filters) => {
    notes = sortNotes(notes, filters.sortBy)
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()) || note.body.includes(filters.searchText.toLowerCase()))

    const notesEl = document.querySelector('#notes')
    notesEl.innerHTML = ''

    if(filteredNotes.length > 0) {
        filteredNotes.forEach((note) => {
            const noteEl = generateNoteDOM(note)
            notesEl.appendChild(noteEl)
        })
    }else{
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No notes to show'
        emptyMessage.classList.add('empty-message')
        notesEl.appendChild(emptyMessage)
    }
    
}