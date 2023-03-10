
const URL = 'https://hn.algolia.com/api/v1';
const hitsPerPage = 5;

let items = 0;
let pages = 0;
let page = 0;
let query = ''

const refs = {
    form: document.querySelector('.form'),
    list: document.querySelector('.list'),
    buttons: document.querySelector('.buttons')
}

console.log(refs.buttons)

const render = () => {
const list = items.map(({title, url}) => `<li><a href="${url}"target="_blank">${title}</a></li>`,).join('')
    refs.list.innerHTML = '';
    refs.list.insertAdjacentHTML('beforeend' , list)
}

const renderButtons = () => {
const buttons = Array(pages)
.fill()
.map((_, idx) => `<button ${idx === page ? 'class="page active"' : 'class="page"' } data-page=${idx}>${idx+1}</button>`)
.join('');

refs.buttons.innerHTML = '';
refs.buttons.insertAdjacentHTML('beforeend' , buttons)

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
    renderButtons();
})
.catch(error => {
    console.log('error' , error)
})

}

const handleSubmit = (e) => {

const {value} = e.target.elements.query

e.preventDefault();
if(query === value){
    return;
}
query = value;
page = 0; 
fetchNews()
}

const handlePageClick = (e) => {

    page = Number(e.target.dataset.page)

    fetchNews()
}

refs.form.addEventListener('submit', handleSubmit);
refs.buttons.addEventListener('click', handlePageClick);
