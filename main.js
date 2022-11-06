const formWord = document.getElementById('word');
const formBtn = document.getElementById('button-addon2')
const Form = document.getElementById('form')
let fragment = new DocumentFragment();
let audio

Form.addEventListener('submit',(e) => {
   console.log(formWord.value)

   wordSpan.innerHTML = ''
   phonetic.innerHTML = ''
   unordered.innerHTML = ''

   
   fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${formWord.value}`)
      .then(res => res.json())
      .then(data => {

         console.log(data.title)

         if(data.title == 'No Definitions Found') {
            wordCard.innerHTML = data.title  
         } else {
            const meanings = data[0].meanings[0].definitions

            if(data[0].phonetics[1]?.audio) {
               audio = new Audio(data[0].phonetics[1]?.audio)
               audioBox.style.display = "block"
            }
            wordSpan.innerHTML = data[0].word
            phonetic.innerHTML = data[0].phonetic
            meanings?.map(e => {
               let list = document.createElement('li')
               list.innerHTML = e.definition
               fragment.appendChild(list)
            })
            
            unordered.appendChild(fragment)
         }

         console.log('')

         
      })
      .catch(error => {
         console.log(error)
      })

   e.preventDefault()


})

play.addEventListener('click',() => {
   audio.play()

})



