let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  //get data from API and render to DOM
    //fetch returns a promise
    //.then is called on a promise AND this also returns a new promise

    //GET
    fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(toyArray => {
      toyArray.forEach(renderToyCard);
      console.log(toyArray[0])
      
  })
    .catch(console.error)
 
    //POST
    function createNewToy(url, body){
      return fetch(url,{
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
      })
      .then(res => res.json())
      .catch(console.error)
      
  }

  //PATCH
  function updateLikes(url, newLikes){
    fetch(url, {
        method: 'PATCH', 
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(newLikes),
    })
    .then(res => res.json())
    .catch(console.error)
}

  function renderToyCard(toy){
    
    //create elements
    const div = document.createElement('div');
    const h2 = document.createElement('h2');
    const img = document.createElement('img');
    const p = document.createElement('p');
    const btn = document.createElement('button');

    //add id and clases to elements
    div.className = "card";
    img.className = 'toy-avatar';
    btn.className = 'like-btn';
    btn.setAttribute ('id', `${toy.id}`)

    //adding info to elements
    h2.textContent = toy.name;
    img.src = toy.image;
    p.textContent = `${toy.likes} Likes`;
    btn.textContent = 'Likes'

    //append elements to the dom
    const toyContainer = document.getElementById('toy-collection');

    div.append(h2, img, p, btn);
    toyContainer.append(div)

    //event handler
    btn.addEventListener('click', () => {
      p.textContent = `${++toy.likes} Likes`
      
    }
  )

   
  };
  
  //handle new monsters added to form
  const handleToyForm = (e) => {
    e.preventDefault();
    
    const newToy = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0

    }
    //using the POST request function to update w/ user imput
    createNewToy('http://localhost:3000/toys', newToy)
    .then(renderToyCard)
    .catch(console.error)

  
    
  }
  //listen for and handle toy submit
  document.querySelector('.add-toy-form').addEventListener('submit', handleToyForm)

 

  
});

//pessemistic - waiting until the server responds and then will update dom
//optimistic - renders dom while also 




