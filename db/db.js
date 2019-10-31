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
      "a@a.com":{
          "email":"a@a.com",
          "password":"abc",

          "first_name":"First",
          "last_name":"Last",
          "birthdate":"2019/01/09",
          "gender":"M",

          "street_address":"Rua cenas",
          "postal_code":"7100-111",
          "city":"Lissabona",
          "city_id":1,

          "card_number":"00000000",
          "expiration_date":"09/20",
          "security_code":"099",
          "lender_rating":4.8,
          "borrower_rating":3.0,
          "llama_points":400
      },
      "b@a.com":{
          "email":"a@a.com",
          "password":"abc",

          "first_name":"First",
          "last_name":"Last",
          "birthdate":"2019/01/09",
          "gender":"M",

          "street_address":"Rua cenas",
          "postal_code":"7100-111",
          "city":"Lissabona",
          "city_id":3,

          "card_number":"00000000",
          "expiration_date":"09/20",
          "security_code":"099",
          "lender_rating":4.8,
          "borrower_rating":3.0,
          "llama_points":400
      }
  },

  "game_db":[
      {
          "name":"Name name",
          "year":2019,
          "category":["A","B","C"],
          "console":["PSP","Switch"],
          "image_url":"url.com/image"
      },
      {
          "name":"Name name",
          "year":2019,
          "category":["A","B","C"],
          "console":["PSP","Switch"],
          "image_url":"url.com/image"
      },
      {
          "name":"Name name",
          "year":2019,
          "category":["A","B","C"],
          "console":["PSP","Switch"],
          "image_url":"url.com/image"
      },
      {
          "name":"Name name",
          "year":2019,
          "category":["A","B","C"],
          "console":["PSP","Switch"],
          "image_url":"url.com/image"
      }
  ],

  "game_rentals":[
      {
          "user_email":"a@a.com",
          "game_name":"Fufa",
          "year":2019,
          "category":["A","B","C"],
          "console":["Xbox"],
          "image_url":"url.com/image",
          "duration_range":[3,6],
          //??? deduzivel pelo rental history
          "active":true
      },
      {
          "user_email":"a@a.com",
          "game_name":"Smash",
          "year":2019,
          "category":["A","B","C"],
          "console":["PSP","Switch"],
          "image_url":"url.com/image",
          "duration_range":[3,6],
          //??? deduzivel pelo rental history
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

currentUser = "a@a.com"


function getGames(filterObj){
games = [];
borrower = filterObj.byUser

for(i=0;i<json.game_rentals.length;i++){
  gameRental = json.game_rentals[i]
  lender = gameRental.user_email

  alreadySaved  = games[gameRental.game_name]

  respectsFilters = (filterObj.gameName   ? gameRental.game_name.indexOf(filterObj.gameName)!=-1 : true) &&
            (filterObj.gameYear   ? gameRental.year == filterObj.gameYear : true) &&
            (filterObj.consoles   ? gameRental.console.some((val)=>{return filterObj.consoles.includes(val)}) : true) &&
            (filterObj.categories ? gameRental.category.some((val)=>{return filterObj.categories.includes(val)}) : true) &&
            (filterObj.distance   ? getDistance(lender, borrower) <= filterObj.distance : true) &&
            (filterObj.duration   ? (gameRental.duration_range[0] <= filterObj.duration && gameRental.duration_range[1] >= filterObj.duration) : true);

  if(!alreadySaved && respectsFilters)
    games.push(gameRental)

}
return games;
}


getGames({
"gameName":"Fuf",
"gameYear":2019,
"consoles":["Xbox"],
"categories":null,
"distance":null,
"duration": null,
"byUser":"b@a.com"
})


function getUser(userEmail){
return json.users_db[userEmail]
}

function getCurrentUser(){
  return currentUser;
}

function getDistance(userEmail1, userEmail2){
city1 = json.users_db[userEmail1].city_id
city2 = json.users_db[userEmail2].city_id

return json.cities[city1][city2]
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
addGame()
markGamesAs()
removeGame()
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
*/