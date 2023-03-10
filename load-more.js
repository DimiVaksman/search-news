
const URL = 'https://hn.algolia.com/api/v1';
const hitsPerPage = 5;

let items = 0;
let pages = 0;
let page = 0;
let query = ''

const refs = {
    form: document.querySelector('.form'),
    list: document.querySelector('.list'),
    loadMore: document.querySelector('.load-more')
}


const render = () => {
const list = items.map(({title, url}) => `<li><a href="${url}"target="_blank">${title}</a></li>`,).join('')
    refs.list.innerHTML = '';
    refs.list.insertAdjacentHTML('beforeend' , list)
}


const fetchNews = () => {
    fetch(`${URL}/search?query=${query}&hitsPerPage=${hitsPerPage}&page=${page}`)
    .then(res => {
        if(res.ok){
            return res.json();
        }
    
        throw new Error (' cant load the itmes')
    })
.then(date => {
    items = date.hits;
    pages = date.nbPages;

    render();
})
.catch(error => {
    console.log('error' , error)
})

}

const handleSubmit = (e) => {

const {value} = e.target.elements.query

e.preventDefault();
if(query === value || !value){
    return;
}
query = value;
page = 0; 
fetchNews()
}

const handleLoadMore = e => {

    page++
    fetchNews()
}

refs.form.addEventListener('submit', handleSubmit);
refs.loadMore.addEventListener('click', handleLoadMore);