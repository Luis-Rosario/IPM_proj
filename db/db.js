json= {
  "consoles":["PS4","Switch","PC","Xbox"],

  "cities":{
      "1":{
          "1":0,
          "2":50,
          "3":100,
          "4":150,
          "5":200
      },
      "2":{
          "1":50,
          "2":0,
          "3":50,
          "4":100,
          "5":150
      },
      "3":{
          "1":100,
          "2":50,
          "3":0,
          "4":50,
          "5":100
      },
      "4":{
          "1":150,
          "2":100,
          "3":50,
          "4":0,
          "5":50
      },
      "5":{
          "1":200,
          "2":150,
          "3":100,
          "4":50,
          "5":0
      }
  },

  "users_db":{
      "aventureiro101@hotmail.com":{
          "email":"aventureiro101@hotmail.com",
          "password":"bastaUmaAventura2019",

          "first_name":"André",
          "last_name":"Aventura",
          "birthdate":"1986/02/15",
          "gender":"M",

          "street_address":"Avenida de Belise, nº76",
          "postal_code":"7100-111",
          "city":"Braga",
          "city_id":1,

          "card_number":"1234567812345678",
          "expiration_date":"09/20",
          "security_code":"099",
          "lender_rating":1.3,
          "borrower_rating":2.1,
          "llama_points":400
      },
      "castelo_branquinho@gmail.com":{
          "email":"castelo_branquinho@gmail.com",
          "password":"leaveMeAloneEstupida",

          "first_name":"Zé",
          "last_name":"Casa Branca",
          "birthdate":"1962/12/08",
          "gender":"M",

          "street_address":"Rua da Fortuna, nº69",
          "postal_code":"7201-001",
          "city":"Lisboa",
          "city_id":2,

          "card_number":"0000000000000000",
          "expiration_date":"08/23",
          "security_code":"123",
          "lender_rating":3.8,
          "borrower_rating":4.1,
          "llama_points":690
      },
      "rui_maritimo@gmail.com":{
        "email":"rui_maritimo@gmail.com",
        "password":"omarenrolanaareia",

        "first_name":"Rui",
        "last_name":"Mar",
        "birthdate":"1957/09/06",
        "gender":"M",

        "street_address":"Avenida da Boavista, nº1, R/ch Esq",
        "postal_code":"4202-011",
        "city":"Porto",
        "city_id":3,

        "card_number":"1111111111111111",
        "expiration_date":"02/21",
        "security_code":"111",
        "lender_rating":4.3,
        "borrower_rating":4.0,
        "llama_points":800
    },
    "assuncao-martins.verified@gmail.com":{
      "email":"assuncao-martins.verified@gmail.com",
      "password":"geringonça2019",

      "first_name":"Assunção",
      "last_name":"Martins",
      "birthdate":"1983/09/25",
      "gender":"F",

      "street_address":"Rua das flores, nº46, 2ºE",
      "postal_code":"7543-767",
      "city":"Lisboa",
      "city_id":2,

      "card_number":"1000200030004000",
      "expiration_date":"07/20",
      "security_code":"500",
      "lender_rating":3.3,
      "borrower_rating":2.9,
      "llama_points":100
  },
  "manel_tristonho@hotmail.com":{
    "email":"manel_tristonho@hotmail.com",
    "password":"behappy12345",

    "first_name":"Manuel",
    "last_name":"Triste",
    "birthdate":"1995/10/22",
    "gender":"M",

    "street_address":"Rua da Miséria, nº2",
    "postal_code":"1234-777",
    "city":"Almada",
    "city_id":4,

    "card_number":"1234567890123456",
    "expiration_date":"01/24",
    "security_code":"100",
    "lender_rating":3.7,
    "borrower_rating":3.9,
    "llama_points":235
}
  },

  "game_db":[
      {
          "name":"FIFA 19",
          "year":2018,
          "category":["sports","football"],
          "console":["PS4","Switch", "Xbox", "PC"],
          "image_url":"url.com/image"
      },
      {
          "name":"Overcooked 2",
          "year":2018,
          "category":["cooking","co-op"],
          "console":["PS4","Switch", "Xbox"],
          "image_url":"url.com/image"
      },
      {
          "name":"Uncharted 4: A Thief's End",
          "year":2016,
          "category":["action","adventure"],
          "console":["PS4"],
          "image_url":"url.com/image"
      },
      {
          "name":"Super Smash Bros Ultimate",
          "year":2018,
          "category":["action"],
          "console":["Switch"],
          "image_url":"url.com/image"
      }
  ],

  "game_rentals":[
      {
          "user_email":"rui_maritimo@gmail.com",
          "game_name":"FIFA 19",
          "year":2018,
          "category":["sports","football"],
          "console":["PS4","Switch", "Xbox", "PC"],
          "image_url":"url.com/image",
          "duration_range":[3,6],
          "active":true
      },
      {
          "user_email":"manel_tristonho@hotmail.com",
          "game_name":"Overcooked 2",
          "year":2018,
          "category":["cooking","co-op"],
          "console":["PS4","Switch", "Xbox"],
          "image_url":"url.com/image",
          "duration_range":[2,3],
          "active":true
      }
  ],

  "notifications":{
      "a@a.com":[
          {
              "date":"2019/07/07",
              "game":"Uncharted",
              "user":"Mr. Borrower",
              "content":"Quero",
              "visited":false
          }
      ]
  },

  //rentals -> lenders (por email) -> games (por nome) -> borrowers (por email) -> [messages,lent=true|false]
  //assim para ser mais facil fazer display das cenas
  //uma func. para ver se um jogo foi aceite ou nao, nao e dificil
  "rental_history":{
      "lenders":{
          "a@a.com":{
              "games":{
                  "Smash":{
                      "borrowers":{
                          "b@b.com":{
                              "lent":"accepted",
                              "messages":[
                                  {
                                      "user":"borrower",
                                      "content":"oi"
                                  },
                                  {
                                      "user":"lender",
                                      "content":"aceito"
                                  }
                              ]
                          },
                          "c@c.com":{
                              "lent":"pending" /*pending,accepted,past*/,
                              "messages":[
                                  {
                                      "user":"lender ou borrower ou system",
                                      "content":"texto"
                                  }
                              ]
                          }
                      }
                  }
              }
          }
      }
  }
}

currentUser = "assuncao-martins.verified@gmail.com"


/*
getGames({
"gameName":"name",
"gameYear":year,
"consoles":["console"],
"categories":["category"],
"distance":distance,
"duration":duration,
"byUser":"email"
})
*/
function getGames(filterObj){
    games = [];
    borrower = filterObj.byUser;

    for(i=0;i<json.game_rentals.length;i++){
        gameRental = json.game_rentals[i];
        lender = gameRental.user_email;
        alreadySaved  = games[gameRental.game_name];

        respectsFilters = (filterObj.gameName   ? gameRental.game_name.indexOf(filterObj.gameName)!=-1 : true) &&
                    (filterObj.gameYear   ? gameRental.year == filterObj.gameYear : true) &&
                    (filterObj.consoles   ? gameRental.console.some((val)=>{return filterObj.consoles.includes(val)}) : true) &&
                    (filterObj.categories ? gameRental.category.some((val)=>{return filterObj.categories.includes(val)}) : true) &&
                    (filterObj.distance   ? getDistance(lender, borrower) <= filterObj.distance : true) &&
                    (filterObj.duration   ? (gameRental.duration_range[0] <= filterObj.duration && gameRental.duration_range[1] >= filterObj.duration) : true);

        if(!alreadySaved && respectsFilters)
            games.push(gameRental);
    }
    return games;
}

function getUser(userEmail){
    return json.users_db[userEmail]
}

function getCurrentUser(){
    return currentUser;
}

function getDistance(userEmail1, userEmail2){
    city1 = json.users_db[userEmail1].city_id;
    city2 = json.users_db[userEmail2].city_id;

    return json.cities[city1][city2];
}

function getDistance(city1,city2){
    return cities[city1][city2]
}

function getGameInfo(userId, gameName) {
    for(i in json.game_rentals){
        if(json.game_rentals[i].user_email == userId && json.game_rentals[i].game_name == gameName){
            return json.game_rentals[i];
        }
    }
}

function getGamesBorrowing(userId){
    gamesRenting={}
    for(lender in json.rental_history.lenders){
        for(game in json.rental_history.lenders[lender].games){
            if(json.rental_history.lenders[lender].games[game].borrowers[userId].lent=="accepted")
                gamesRenting[game]= getGameInfo(lender, game);
        }
    }
    return gamesRenting;
}

function getGamesLending(userId){
gamesLending={}
    for(game in json.rental_history.lenders[userId].games){
        gamesLending[game] = getGameInfo(userId,game);
    }
    return gamesLending;
}

function getNotifications(userId){
    return notifications[userId];
}

function getLendingMessages(userId,game){
    messages ={}
    borrowers  = json.rental_history.lenders[userId].games[game].borrowers
    for(borrower in borrowers){
        messages[borrower]= json.rental_history.lenders[userId].games[game].borrowers[borrower].messages
    }
    return messages
}

function getBorrowingMessages(userId,game){
    messages = {}
    for(lender in json.rental_history.lenders){
        messages[lender]= json.rental_history.lenders[lender].games[game].borrowers[userId].messages
    }
    return messages
}

function getChat(userId1,userId2,game){
    return json.rental_history.lenders[userId1].games[game].borrowers[userId2].messages
}

//only active trades
function getLendingTo(userId){
    trades={}
    for(game in json.rental_history.lenders[userId].games){
        for(borrower in json.rental_history.lenders[userId].games[game].borrowers){
            if(json.rental_history.lenders[userId].games[game].borrowers[borrower].lent=="accepted"){
                trades[game]= borrower;
            }
        }
    }
    return trades;
}

function getBorrowingFrom(userId){
    trades={}
    for(lender in json.rental_history.lenders){
        for(game in json.rental_history.lenders[lender].games){
            if(json.rental_history.lenders[lender].games[game].borrowers[userId].lent=="accepted"){
                trades[game]= lender;
            }
        }
    }
    return trades;
}

function addGame(userId,gameObj){
    gameObj[user_email]=userId;
    json.game_rentals.push(gameObj);
}

function deleteGame(userId,game_name){
  for(i in json.game_rentals){
      game  = json.game_rentals[i];
      if(game.user_email==userId && game.game_name==game_name){
          json.game_rentals.splice(json.game_rentals.indexOf(game),1);
      }
  }
}

function addUser (userObj){
    users_db[userObj.user_email]=userObj;
}

//peer js
//https://codepen.io/KicoPT/pen/eYYGxaZ?editors=1010


/*----------TO DO----------*/
/*
markGamesAs()
sendRentalRequest(borrowerEmail,gameName,lenderEmail)//um id da combinação lender/jogo ou whatever??
sendMsg(borrowerEmail, lenderEmail, gameName, msg)//lembrar que o email do user vai estar no borrower ou no lender dependendo
acceptRental(lenderEmail, gameName, borrowerEmail)
refuseRental(lenderEmail, gameName, borrowerEmail)
markAsReturned(lenderEmail, gameName)
getNotifications(userEmail)
getBorrowedGames(userEmail)
*/
  //game_rental e os jogos da pessoa na pratica
  //func. para juntar os jogos com o mesmo nome, para fazer pesquisas e tal
  /*
  games_groups:{}
  for(i=0;i<game_rental.length;i++){
      game = game_rental[i]
      games_groups[game.name] = games_groups[game.name] || []
      games_groups[game.name].push(game)
  } */


/*----------DONE----------*/
/*
getDistance(city1,city2)
getGames()
getGamesLending(userId)
getGamesBorrowing(userId)
getNotifications(userId)
getLendingMessages(userId)
getLenderMessagesByGame(userId,game)
getBorrowerMessagesByGame(userId,game)
getChat(userId1,userId2,game)
deleteGame()
addGame()
addUser()
*/