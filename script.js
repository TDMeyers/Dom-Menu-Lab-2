// Menu data structure
var menuLinks = [
  {text: 'about', href: '/about'},
  {text: 'catalog', href: '#', subLinks: [
    {text: 'all', href: '/catalog/all'},
    {text: 'top selling', href: '/catalog/top'},
    {text: 'search', href: '/catalog/search'},
  ]},
  {text: 'orders', href: '#' , subLinks: [
    {text: 'new', href: '/orders/new'},
    {text: 'pending', href: '/orders/pending'},
    {text: 'history', href: '/orders/history'},
  ]},
  {text: 'account', href: '#', subLinks: [
    {text: 'profile', href: '/account/profile'},
    {text: 'sign out', href: '/account/signout'},
  ]},
];

let mainEl = document.querySelector('main');

mainEl.style.backgroundColor = "var(--main-bg)";

mainEl.innerHTML = '<h1>SEI Rocks!</h1>';

mainEl.classList.add('flex-ctr');

let topMenuEl = document.querySelector('#top-menu');

topMenuEl.style.height = '100%';

topMenuEl.style.backgroundColor = "var(--top-menu-bg)";

topMenuEl.classList.add('flex-around');

for(let i = 0; i < menuLinks.length; i++){
    console.log(menuLinks[i]);
    let mLink = document.createElement('a');
    mLink.innerHTML = menuLinks[i].text;
    mLink.setAttribute('href', menuLinks[i].href);
    topMenuEl.appendChild(mLink)
};
// 4.0 
let subMenuEl = document.querySelector('#sub-menu');
// 4.1
subMenuEl.style.height = '100%';
// 4.2 
subMenuEl.style.backgroundColor = "var(--sub-menu-bg)";
// 4.3
subMenuEl.classList.add('flex-around');
// 4.4
subMenuEl.style.position = 'absolute';
// 4.5
subMenuEl.style.top = '0';
// 5.1
let topMenuLinks = topMenuEl.querySelectorAll('a');

let showingSubMenu = false;
// 5.2
topMenuEl.addEventListener('click', (event) => {
  event.preventDefault()

  if (event.target.tagName === 'A') {
    event.target.className = 'active'

// 5.4 - 5.6
    if (event.target.className === 'active') {
      let pickedA = event.target.innerText.toLowerCase();
      let link = false;
      event.target.classList.remove('active')
      showingSubMenu = false
      subMenuEl.style.top = 0
      
      for (i of topMenuLinks) {
        i.classList.remove('active')
        if(pickedA === i.text){
          link = true
        }
      }

      event.target.className = 'active'
      console.log(event.target)
      let storage = '';
// 5.6
      for (i of menuLinks){
        if (i.text === pickedA){
          if (i.subLinks){
            showingSubMenu = true
            storage = i.subLinks
          }
          else {
            showingSubMenu = false
          }
        }
      }
// 5.7 
      if (showingSubMenu){
        buildSubMenu(storage)
        subMenuEl.style.top = '100%'
      }
      else {
        subMenuEl.style.top = '0'
      }
    }
    if (event.target.text === 'about') {
      mainEl.innerHTML = `<h1>${event.target.text}</h1>`
  }
}
})
// 5.8
function buildSubMenu (array){
  subMenuEl.innerHTML = '';
  for (i of array){
    let anchor = document.createElement('a');
    anchor.setAttribute('href', i.href);
    anchor.innerText = i.text;
    subMenuEl.appendChild(anchor);
  }
}

// 6.0

subMenuEl.addEventListener('click', function(event){
  event.preventDefault()
  if (event.target.tagName === 'A'){
    showingSubMenu = false
    subMenuEl.style.top = '0'
    for (i of topMenuLinks) {
      i.classList.remove('active')
    }
    mainEl.innerHTML = `<h1>${event.target.text}</h1>`
    console.log(event.target)
    // if (event.target.text === 'about') {
    //   mainEl.innerHTML = `<h1>${event.target.text}</h1>`
    // }
  }
})