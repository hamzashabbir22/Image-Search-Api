const Access = 'tHHUDOKzjqEWgEwXrvP116EUDhKl1Eh88a9vD_EMxUw';

const form = document.querySelector('form')
const input = document.getElementById('search-input')
const button = document.getElementById('search-btn')
const searchResults = document.querySelector('.search-results')
const showMore = document.querySelector('#show-more-btn')
const toast = document.querySelector('#toast')
const pagination = document.querySelector('.pagination')
const btn_close = document.querySelector('.btn-close')

let inputText = ''
let page = 1;


async function searchImages(inputText){
    inputText = input.value;
    let splitted = inputText.trim().split(/\s+/)
    if (splitted == '') {
        toast.style.right = '50px'
    }
    else{

        toast.style.right = '-700px';   

        const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputText}&client_id=${Access}`;
    console.log(url);
    const response =  await fetch(url)
    const data = await response.json();
 
    const results = data.results;

    if (page === 1) {
        searchResults.innerHTML = ''
        showMore.style.display = 'block';
    }

    results.splice(6);

    results.map((result)=>{
        const newDiv =  document.createElement('div');
        const title = result.description;
        newDiv.innerHTML = `<img height="100%" width = '100%' alt=${result.alt_description} class="card-img-top" src="${result.urls.full}" <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <a target='_blank' href=${result.links.html} class="btn btn-primary">Go somewhere</a>
      </div>`
        newDiv.classList.add('card')
        newDiv.classList.add('search-result')
        searchResults.insertAdjacentElement("beforeend",newDiv)
    })
    }

    
}

button.addEventListener('click',(e)=>{
   e.preventDefault()
   if(page === 1){
       searchResults.innerHTML ='';
   }
   searchImages()
})

showMore.addEventListener('click',()=>{
    page++
    searchImages()
})

btn_close.addEventListener('click',()=>{
    toast.style.right = '-700px';  
})
