
function handleSearch(){
let medium = 'movie'

let form = document.querySelector('#search-button')

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    fetch (`https://api.simkl.com/search/${medium}?q=${searchParser(e)}&client_id=dd7675f0ec853dbe3f15e18e3bf9c23f45d586a0b6cce7369149e57836a633c0`)
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
    let container = document.querySelector('#info-container')
    let moviePoster = document.createElement('img')

    fetch(`https://wsrv.nl/?url=https://simkl.in/posters/${imageUrl}_ca.jpg`)
    .then ((res)=>res.json())
    .then((posters)=>{

        let Url = URL.createObjectURL(posters)
        moviePoster.src = Url
        container.appendChild(moviePoster)

    })
}





handleSearch()