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


  const actionList = await getData("https://yts.lt/api/v2/list_movies.json?genre=action");
  const dramaList = await getData("https://yts.lt/api/v2/list_movies.json?genre=drama");
  const animationList = await getData("https://yts.lt/api/v2/list_movies.json?genre=animation");
  console.log(actionList, dramaList, animationList)
 
})();
