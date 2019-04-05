console.log("Client side Javascript file is loaded")


// const puzzle = 'http://puzzle.mead.io/puzzle'

// fetch(puzzle).then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })




// fetch(weather).then((response, error) => {

//     response.json().then((data) => {
//         if (data.error) {
//             console.log("error")
//         } else {
//             console.log(data.location)
//             console.log(data.forecast)
//         }

//     })
// })


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const message1 = document.querySelector('#location')
const message2 = document.querySelector('#weather')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = search.value
    console.log(location)

    message1.textContent = 'Loading...'
    message2.textContent = ''

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {

        response.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error
            } else {
                console.log(data.location)
                message1.textContent = 'Location: ' + data.location
                message2.textContent = 'Forecast: ' + data.forecast
            }

        })
    })

})