let form = document.querySelector('#search-button');
let selector = document.querySelector("#category-options")
let searchMedium = '';
selector.addEventListener("change", e => {
    console.log(e.target.value);
    let category = e.target.value;
    console.log(category);
    searchMedium = category;
    
    form.addEventListener('submit', (e)=>{
        e.preventDefault()
        let emptyContainer = document.querySelector('#poster-container');
        emptyContainer.innerHTML = "";
        fetch (`https://api.simkl.com/search/${searchMedium}?q=${searchParser(e)}&client_id=dd7675f0ec853dbe3f15e18e3bf9c23f45d586a0b6cce7369149e57836a633c0`)
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data);
            data.forEach(handleImages);
        })
        e.target["search-button"].value = ""
    })
})
    
    function searchParser(e){
        let search = e.target['search-button'].value;
        let searchHandler = [...search.split(' ')];
        return searchHandler.join('+');
    }
    
    function handleImages(data){
        let imageUrl = data.poster;
        let container = document.querySelector('#poster-container');
        let moviePoster = document.createElement('img');
        moviePoster.className = 'posters';
        moviePoster.src = `https://wsrv.nl/?url=https://simkl.in/posters/${imageUrl}_c.jpg`;
        
        container.appendChild(moviePoster)
        
        moviePoster.addEventListener('click', (e)=>{
            let id = data.ids['simkl_id']
            document.querySelector('#selectedMovie').src= e.target.src
            renderInfo(id)
            // moviePoster.addEventListener('keydown', handleCompleted(event))
                
        })

        moviePoster.addEventListener('dblclick', ()=>{
            alert(`${data.title} was added to your Horus Watchlist`)
            data.category = `${searchMedium}`


            fetch(`http://localhost:3000/watch-list`, {
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify(data)

            })
            .then((res)=>res.json())
            .then((horus)=>{
                console.log(horus)
            })

        })


    }

function renderInfo(id){
    let medium = 'movies'

    fetch(`https://api.simkl.com/${medium}/${id}?extended=full&client_id=dd7675f0ec853dbe3f15e18e3bf9c23f45d586a0b6cce7369149e57836a633c0`)
    .then((res)=>res.json())
    .then((info)=>{
        let trailer = document.querySelector('#trailer')
        let overview = document.querySelector('#overview')
        let rating = document.querySelector('#rating')
        trailer.textContent = info.title
        overview.textContent = `Synopsis: ${info.overview}`
        ratings(info)
        trailerHref(info)
        function ratings(info) {
            if (info.ratings === undefined) {
                return rating.textContent = "Not yet rated.";
            } else if (info.ratings.imdb === undefined){
                return rating.textContent = 'Not yet rated.'
            } else {
                rating.textContent = `Rating: ${info.ratings.imdb.rating}`
            }
            
        }
        function trailerHref(info) {
            if (info.trailers === null) {
                return trailer.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
            } else {        
                trailer.href = `https://www.youtube.com/watch?v=${info.trailers[0].youtube}`
            }
        }
    })
}


function accessWatchlist(){
    let watchlist = document.querySelector('#watch-list')
    let container = document.querySelector('#poster-container')
    watchlist.addEventListener('click', ()=>{
        container.innerHTML = ''
        fetch(`http://localhost:3000/watch-list`)
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data)
            data.forEach(handleImages)
        })

        
    })
}

// function accessCompleted(){
//     let completed = document.querySelector('#completed')
//     completed.addEventListener('click', ()=>{
//         fetch(`http://localhost:3000/completed`)
//         .then((res)=>res.json())
//         .then((data)=>{
//             console.log(data)
//             data.forEach(handleImages)
//         })

        
//     })
// }

// function handleCompleted(event){
//         console.log(event)
        // if(e.code === 'Space'){
            // fetch(`http://localhost:3000/completed`, {
            //     method : 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body : JSON.stringify(data)
    
            // })
            // .then((res)=>res.json())
            // .then((horus)=>{
            //      horus
            // })
        // }
    
// }

// accessCompleted()

accessWatchlist()