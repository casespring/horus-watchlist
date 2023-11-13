
function handleSearch(){ 
    let searchMedium = 'movie'

let form = document.querySelector('#search-button')

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    fetch (`https://api.simkl.com/search/${searchMedium}?q=${searchParser(e)}&client_id=dd7675f0ec853dbe3f15e18e3bf9c23f45d586a0b6cce7369149e57836a633c0`)
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data)
        data.forEach(handleImages);
    })
    
})

}


function searchParser(e){
    let search = e.target['search-button'].value
    let searchHandler = [...search.split(' ')]
    return searchHandler.join('+')
    
}

function handleImages(data){
    let imageUrl = data.poster
    let container = document.querySelector('#poster-container')
    let moviePoster = document.createElement('img')

    moviePoster.src = `https://wsrv.nl/?url=https://simkl.in/posters/${imageUrl}_c.jpg`
    moviePoster.className = 'posters'

    container.appendChild(moviePoster)

    moviePoster.addEventListener('click', (e)=>{
        let id = data.ids['simkl_id']
        document.querySelector('#selectedMovie').src= e.target.src
        renderInfo(id)
    })

    }

function renderInfo(id){
    let medium = 'movies'
    fetch(`https://api.simkl.com/${medium}/${id}?extended=full&client_id=dd7675f0ec853dbe3f15e18e3bf9c23f45d586a0b6cce7369149e57836a633c0`)
    .then((res)=>res.json())
    .then((info)=>{
        console.log(info)
        let trailer = document.querySelector('#trailer')
        let overview = document.querySelector('#overview')
        let rating = document.querySelector('#rating')

        trailer.href = `https://www.youtube.com/watch?v=${info.trailers[0].youtube}`
        trailer.textContent = info.title
        overview.textContent = `Synopsis: ${info.overview}`
        rating.textContent = `Rating: ${info.ratings.imdb.rating}`
    })
}





handleSearch()