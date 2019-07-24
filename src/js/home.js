console.log("hola mundo!");

const noCambia = "Leonidas";

let cambia = "@LeonidasEsteban";

function cambiarNombre(nuevoNombre) {
  cambia = nuevoNombre;
}

const getUserAll = new Promise(function(todoBien, todoMal) {
  // llamar a un api
  setTimeout(function() {
    // luego de 3 segundos todoBien('se acabó el tiempo');
    todoBien("se acabó el tiempo:(");
  }, 5000);
});

const getUser = new Promise(function(todoBien, todoMal) {
  //   // llamar a un api
  setTimeout(function() {
    // luego de 3 segundos
    todoBien("se acabó el tiempo 3 :(");
  }, 3000);
});

// getUser
//   .then(function() {
//     console.log("todo está bien en la vida");
//   })
//   .catch(function(message) {
//     console.log(message);
//   });

Promise.race([getUser, getUserAll])
  .then(function(message) {
    console.log(message);
  })

  .catch(function(message) {
    console.log(message);
  });

// XMLHttpRequestUpload

$.ajax("https://randomuser.me/api/jojo", {
  method: "GET",
  success: function(data) {
    console.log(data);
  },
  error: function(error) {
    console.log(error);
  }
});

// fetch ()

fetch("https://randomuser.me/api/hihoj")
  .then(function(response) {
    // console.log(response)
    return response.json();
  })
  .then(function(user) {
    console.log("user", user.results[0].name.first);
  })

  .catch(function() {
    console.log("algo falló");
  });

(async function load() {
  // await
  //acction
  //drama
  //Animación
  async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
  const $form = document.getElementById("form");
  const $home = document.getElementById("home");
  const $featuringContainer = document.getElementById("featuring");

  function setAttributes($element, attributes) {
    for (const attribute in attributes) {
      $element.setAttribute(attribute, attributes[attribute]);
    }
  }
  const BASE__API = "https://yts.lt/api/v2/"

  function featuringTemplate(peli) {
    return `
        <div class="featuring">
        <div class="featuring-image">
          <img src="${peli.medium_cover_image}"width="70" height="100" alt="">
        </div>
        <div class="featuring-content">
          <p class="featuring-title">Pelicula encontrada</p>
          <p class="featuring-album">${peli.title}</p>
        </div>
      </div>
        `
  }

  $form.addEventListener("submit", async event => {
    event.preventDefault();
    $home.classList.add("search-active");
    const $loader = document.createElement("img");
    setAttributes($loader, {
      src: "src/images/loader.gif",
      height: 50,
      width: 50
    });

    $featuringContainer.append($loader);

    const data = new FormData($form);
    const {
      data: {
        movies: pelis
      }
    } = await getData(`${BASE__API}list_movies.json?limit=1&query_term=${data.get('name')}`)
  
    const HTMString = featuringTemplate(pelis[0]);
    $featuringContainer.innerHTML = HTMString;
     
  });

  const actionList = await getData(`${BASE__API}list_movies.json?genre=action`);
  const dramaList = await getData(`${BASE__API}list_movies.json?genre=drama`);
  const animationList = await getData(
    `${BASE__API}list_movies.json?genre=animation`
  );
  console.log(actionList, dramaList, animationList);

  function videoItemTemplate(movie, category) {
    return `<div class="primaryPlaylistItem" data-id="${movie.id}" data-category=${category} >
           <div class="primaryPlaylistItem-image">
         
             <img src="${movie.medium_cover_image}">
           </div>
           <h4 class="primaryPlaylistItem-title">
             ${movie.title}
           </h4>
         </div>`
  }

  function createTemplate(HTMLString) {
    const html = document.implementation.createHTMLDocument();
    html.body.innerHTML = HTMLString;
    return html.body.children[0];
  }

  function addEventClick($element) {
    $element.addEventListener("click", () => {
      showModal($element);
    });
  }

  //console.log (videoItemTemplate('src/images/covers/bitcoin.jpg', 'bitcoin'));

  function renderMovieList(list, $container, category) {
    $container.children[0].remove();
    // actionList.data.movie
    list.forEach(movie => {
      const HTMLString = videoItemTemplate(movie, category);
      const movieElement = createTemplate(HTMLString);
      $container.append(movieElement);
      addEventClick(movieElement);
    });
  }
  const $actionContainer = document.querySelector("#action");
  renderMovieList(actionList.data.movies, $actionContainer,'action');

  const $dramaContainer = document.getElementById("drama");
  renderMovieList(dramaList.data.movies, $dramaContainer, 'drama');
  const $animationContainer = document.getElementById("animation");
  renderMovieList(animationList.data.movies, $animationContainer,'animation');

  // const $home = $('.home, .list #item');
  const $modal = document.getElementById("modal");
  const $overlay = document.getElementById("overlay");
  const $hideModal = document.getElementById("hide-modal");

  const $modalTitle = $modal.querySelector("h1");
  const $modalImage = $modal.querySelector("img");
  const $modalDescription = $modal.querySelector("p");

  function showModal($element) {
    $overlay.classList.add("active");
    $modal.style.animation = "modalIn .8s forwards";
     const id = $element.dataset.id;
     const category = $element.dataset.category;

  }

  $hideModal.addEventListener("click", hideModal);

  function hideModal() {
    $overlay.classList.remove("active");
    $modal.style.animation = "modalOut .8s forwards";
  }

  //   '<div class="primaryPlaylistItem">'
  //   '<div class="primaryPlaylistItem-image">'
  //     '<img src="src/images/covers/midnight.jpg">'
  //   '</div>'
  //   '<h4 class="primaryPlaylistItem-title">'
  //     //Titulo de la peli
  //   '</h4>'
  // '</div>'
})();
