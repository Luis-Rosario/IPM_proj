var peer = new Peer();
var serverID = "lleme-play-server"

dayAdjustment = 0;

function clearStorage() {
    localStorage.removeItem("json");
}

//callback() list
changeListeners = [];

function onDataChange(cb) {
    changeListeners.push(cb);
}

function pushData() {
    console.log("temp function, no connection to PEERJS");
    //backup to localstorage
    localStorage.json = JSON.stringify(json);
}

//ligou-se ao peerjs
peer.on("open", (id) => {
    console.log("peerid: " + id);
    //tentar ligar ao pseudo-server
    conn = peer.connect(serverID);
    //connectou-se ao pseudo-server
    conn.on("open", function() {
        console.log("connected to pseudo-server")
            //change push function to send update
        pushData = function() {
                conn.send(json);
                //backup to localstorage
                localStorage.json = JSON.stringify(json);
            }
            //recieved update
        conn.on("data", function(data) {
            //e o json, atualiza cenas
            if (data.consoles) {
                json = data;
                localStorage.json = JSON.stringify(newJSON);
                console.log("got a json")
                for (let i = 0; i < changeListeners.length; i++) {
                    changeListeners[i]();
                }
            } else if (data.match(/\d/g)) {
                //avanca tempo
                dayAdjustment = data - 0;
                console.log("moved forward " + dayAdjustment + " days in time")
            } else {
                console.log("server message")
                console.log(data)
            }
        });
    });
});

json = {
    "consoles": ["PS4", "Nintendo Switch", "PC", "Xbox One", "Xbox 360", "PS3", "PSP"],

    "cities": {
        "1": {
            "1": 0,
            "2": 50,
            "3": 100,
            "4": 150,
            "5": 200
        },
        "2": {
            "1": 50,
            "2": 0,
            "3": 50,
            "4": 100,
            "5": 150
        },
        "3": {
            "1": 100,
            "2": 50,
            "3": 0,
            "4": 50,
            "5": 100
        },
        "4": {
            "1": 150,
            "2": 100,
            "3": 50,
            "4": 0,
            "5": 50
        },
        "5": {
            "1": 200,
            "2": 150,
            "3": 100,
            "4": 50,
            "5": 0
        }
    },

    "users_db": {
        "aventureiro101@hotmail.com": {
            "email": "aventureiro101@hotmail.com",
            "password": "bastaUmaAventura2019",

            "first_name": "André",
            "last_name": "Aventura",
            "birthdate": "1986/02/15",
            "gender": "M",

            "street_address": "Avenida de Belise, nº76",
            "postal_code": "7100-111",
            "city": "Braga",
            "city_id": 1,

            "card_number": "1234567812345678",
            "expiration_date": "09/20",
            "security_code": "099",
            "lender_rating": 1.3,
            "borrower_rating": 2.1,
            "llama_points": 400,
            "total_borrowed": 2,
            "total_lent": 3
        },
        "castelo_branquinho@gmail.com": {
            "email": "castelo_branquinho@gmail.com",
            "password": "leaveMeAloneEstupida",

            "first_name": "Zé",
            "last_name": "Casa Branca",
            "birthdate": "1962/12/08",
            "gender": "M",

            "street_address": "Rua da Fortuna, nº69",
            "postal_code": "7201-001",
            "city": "Lisboa",
            "city_id": 2,

            "card_number": "0000000000000000",
            "expiration_date": "08/23",
            "security_code": "123",
            "lender_rating": 3.8,
            "borrower_rating": 4.1,
            "llama_points": 690,
            "total_borrowed": 32,
            "total_lent": 20
        },
        "a@a.com": {
            "email": "a@a.com", //ruizinho@hotmail.com
            "password": "omarenrolanaareia",

            "first_name": "Rui",
            "last_name": "Mar",
            "birthdate": "1957/09/06",
            "gender": "M",

            "street_address": "Avenida da Boavista, nº1, R/ch Esq",
            "postal_code": "4202-011",
            "city": "Porto",
            "city_id": 3,

            "card_number": "1111111111111111",
            "expiration_date": "02/21",
            "security_code": "111",
            "lender_rating": 4.3,
            "borrower_rating": 4.0,
            "llama_points": 800,
            "total_borrowed": 35,
            "total_lent": 30
        },
        "assuncao-martins.verified@gmail.com": {
            "email": "assuncao-martins.verified@gmail.com",
            "password": "geringonça2019",

            "first_name": "Assunção",
            "last_name": "Martins",
            "birthdate": "1983/09/25",
            "gender": "F",

            "street_address": "Rua das flores, nº46, 2ºE",
            "postal_code": "7543-767",
            "city": "Lisboa",
            "city_id": 2,

            "card_number": "1000200030004000",
            "expiration_date": "07/20",
            "security_code": "500",
            "lender_rating": 3.3,
            "borrower_rating": 2.9,
            "llama_points": 100,
            "total_borrowed": 21,
            "total_lent": 32
        },
        "manel_tristonho@hotmail.com": {
            "email": "manel_tristonho@hotmail.com",
            "password": "behappy12345",

            "first_name": "Manuel",
            "last_name": "Triste",
            "birthdate": "1995/10/22",
            "gender": "M",

            "street_address": "Rua da Miséria, nº2",
            "postal_code": "1234-777",
            "city": "Almada",
            "city_id": 4,

            "card_number": "1234567890123456",
            "expiration_date": "01/24",
            "security_code": "100",
            "lender_rating": 3.7,
            "borrower_rating": 3.9,
            "llama_points": 235,
            "total_borrowed": 10,
            "total_lent": 15
        },
        "marcelo_the_usurper@hotmail.com": {
            "email": "marcelo_the_usurper@hotmail.com",
            "password": "presiboy54321",

            "first_name": "Marcelo",
            "last_name": "Costa",
            "birthdate": "1965/11/03",
            "gender": "M",

            "street_address": "Palácio de Belém",
            "postal_code": "6666-666",
            "city": "Lisboa",
            "city_id": 2,

            "card_number": "2222222222222222",
            "expiration_date": "05/24",
            "security_code": "222",
            "lender_rating": 4.0,
            "borrower_rating": 3.4,
            "llama_points": 300,
            "total_borrowed": 3,
            "total_lent": 1
        },
        "docinho2019@hotmail.com": {
            "email": "docinho2019@hotmail.com",
            "password": "pipocas_salgadas",

            "first_name": "Ricardo",
            "last_name": "Doce",
            "birthdate": "1971/05/20",
            "gender": "M",

            "street_address": "Rua das Cabaças, nº13",
            "postal_code": "1111-234",
            "city": "Santarém",
            "city_id": 5,

            "card_number": "6666777788889999",
            "expiration_date": "04/20",
            "security_code": "111",
            "lender_rating": 2.3,
            "borrower_rating": 2.7,
            "llama_points": 50,
            "total_borrowed": 13,
            "total_lent": 7
        }
    },

    "game_db": [{
            "name": "FIFA 19",
            "year": 2018,
            "category": ["sports", "football"],
            "console": ["PS4", "Switch", "Xbox", "PC"],
            "image_url": "https://static.raru.co.za/cover/2018/06/10/6706193-l.jpg?v=1538732191",
            "description": "FIFA 19 is a football simulation video game developed by EA Vancouver as part of Electronic Arts' FIFA series. It is the 26th installment in the FIFA series."
        },
        {
            "name": "Overcooked 2",
            "year": 2018,
            "category": ["cooking", "co-op"],
            "console": ["PS4", "Nintendo Switch", "Xbox One"],
            "image_url": "https://www.nintendo.com/content/dam/noa/en_US/games/switch/o/overcooked-2-switch/Switch_Overcooked2_box.png/_jcr_content/renditions/cq5dam.thumbnail.319.319.png",
            "description": "In the cooking simulator game Overcooked 2, teams of up to four players cooperatively prepare and cook orders in absurd restaurants."
        },
        {
            "name": "Uncharted 4: A Thief's End",
            "year": 2016,
            "category": ["action", "adventure"],
            "console": ["PS4"],
            "image_url": "https://images-na.ssl-images-amazon.com/images/I/71hcX5qwKNL._SX385_.jpg",
            "description": "Uncharted 4: A Thief's End is an action-adventure game developed by Naughty Dog and published by Sony Computer Entertainment. It is the fourth main entry in the Uncharted series."
        },
        {
            "name": "Super Smash Bros Ultimate",
            "year": 2018,
            "category": ["action", "fighting"],
            "console": ["Nintendo Switch"],
            "image_url": "https://www.mobygames.com/images/covers/l/525828-super-smash-bros-ultimate-nintendo-switch-front-cover.png",
            "description": "Super Smash Bros. Ultimate is a 2018 crossover fighting game developed by Bandai Namco Studios and Sora Ltd., and published by Nintendo for the Nintendo Switch. It is the fifth installment in the Super Smash Bros. series."
        },
        {
            "name": "Death Stranding",
            "year": 2019,
            "category": ["action", "adventure"],
            "console": ["PS4"],
            "image_url": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5360/5360401_sd.jpg",
            "description": "Death Stranding is an action, strand video game developed by Kojima Productions, and published by Sony Interactive Entertainment for the PlayStation 4."
        },
        {
            "name": "The Legend of Zelda: Link's Awakening",
            "year": 1993,
            "category": ["action", "adventure"],
            "console": ["Nintendo Switch"],
            "image_url": "https://www.google.com/search?q=the+legend+of+zelda+link%27s+awakening+cover&rlz=1C5CHFA_enPT568PT568&source=lnms&tbm=isch&sa=X&ved=0ahUKEwj2-ZrUkOPlAhUL6OAKHXjBB1kQ_AUIEigB&biw=1278&bih=621#imgrc=1G3JvcYC-74hbM:",
            "description": "Link's Awakening is one of the few Zelda games not to take place in the land of Hyrule, and does not feature Princess Zelda or the Triforce relic."
        },
        {
            "name": "Borderlands 3",
            "year": 2019,
            "category": ["action", "adventure"],
            "console": ["PS4", "Xbox One", "PC"],
            "image_url": "https://www.google.com/search?q=borderlands+3+cover&rlz=1C5CHFA_enPT568PT568&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjLs6_2kePlAhUCcBQKHYp3BuEQ_AUIEigB&biw=1278&bih=621#imgrc=0y7gxJhoSxfhlM:",
            "description": "Borderlands 3 is the fourth main and fifth overall entry in Gearbox Software's Borderlands game series."
        },
        {
            "name": "Minecraft",
            "year": 2009,
            "category": ["sandbox", "survival", "action", "adventure"],
            "console": ["PS4", "Xbox One", "PC", "PS3", "Xbox 360", "Nintendo Switch", "PSP"],
            "image_url": "https://www.google.com/search?rlz=1C5CHFA_enPT568PT568&biw=1278&bih=621&tbm=isch&sa=1&ei=8djJXYekKNvKgwek-oWIBg&q=minecraft+cover&oq=minecraft+cover&gs_l=img.3..0j0i30l9.8986.67154..94500...0.0..0.123.766.8j1......0....1..gws-wiz-img.......0i67j0i7i30j0i8i30.nrMhraT1trU&ved=0ahUKEwjH4LWUk-PlAhVb5eAKHSR9AWEQ4dUDCAc&uact=5#imgrc=wst2a1ymmOtx7M:",
            "description": "Minecraft focuses on allowing the player to explore, interact with, and modify a dynamically-generated map made of one-cubic-meter-sized blocks. In addition to blocks, the environment features plants, mobs, and items."
        },
        {
            "name": "Sims 4",
            "year": 2014,
            "category": ["simulation"],
            "console": ["PS4", "Xbox One", "PC"],
            "image_url": "https://www.google.pt/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=2ahUKEwjGn_WQlePlAhUi5uAKHRlTDC8QjRx6BAgBEAQ&url=https%3A%2F%2Fwww.saraiva.com.br%2Fthe-sims-4-ps4-9894062%2Fp&psig=AOvVaw1nVSUT-LiLeoAQfWlkB_Bu&ust=1573596289043932",
            "description": "The Sims 4 is a life simulation game, similar to its predecessors. Players create a Sim character and control their life to explore different personalities which change the way the game plays out."
        },
        {
            "name": "Far Cry 4",
            "year": 2014,
            "category": ["fps", "action", "adventure"],
            "console": ["PS4", "Xbox One", "PC"],
            "image_url": "https://www.google.pt/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=2ahUKEwia_f_ZlePlAhUZ6OAKHd3DDwYQjRx6BAgBEAQ&url=https%3A%2F%2Fwww.lojapsngames.com.br%2Ffar-cry-4-midia-digital-xbox-one&psig=AOvVaw3DRWSX4jRe5aKB6R5M4MTS&ust=1573596434957711",
            "description": "Far Cry 4 is a first-person action-adventure game. Players assume control of Ajay Ghale, a Kyrati-American who is on a quest to spread his deceased mother's ashes in the fictional country of Kyrat."
        }

    ],

    "game_rentals": [{
            "user_email": "a@a.com", //ruizinho@gmail.com
            "game_name": "FIFA 19",
            "year": 2018,
            "category": ["sports", "football"],
            "console": "PS4",
            "image_url": "https://static.raru.co.za/cover/2018/06/10/6706193-l.jpg?v=1538732191",
            "duration_range": [3, 6],
            "active": true,
            "warned": false,
            "endDate": ""
        },
        {
            "user_email": "assuncao-martins.verified@gmail.com",
            "game_name": "FIFA 19",
            "year": 2018,
            "category": ["sports", "football"],
            "console": "PS4",
            "image_url": "https://static.raru.co.za/cover/2018/06/10/6706193-l.jpg?v=1538732191",
            "duration_range": [2, 7],
            "active": true,
            "warned": false,
            "endDate": ""
        },
        {
            "user_email": "manel_tristonho@hotmail.com",
            "game_name": "FIFA 19",
            "year": 2018,
            "category": ["sports", "football"],
            "console": "PS4",
            "image_url": "https://static.raru.co.za/cover/2018/06/10/6706193-l.jpg?v=1538732191",
            "duration_range": [1, 8],
            "active": true,
            "warned": false,
            "endDate": ""
        },
        {
            "user_email": "castelo_branquinho@gmail.com",
            "game_name": "FIFA 19",
            "year": 2018,
            "category": ["sports", "football"],
            "console": "PS4",
            "image_url": "https://static.raru.co.za/cover/2018/06/10/6706193-l.jpg?v=1538732191",
            "duration_range": [1, 6],
            "active": true,
            "warned": false,
            "endDate": ""
        },
        {
            "user_email": "manel_tristonho@hotmail.com",
            "game_name": "Overcooked 2",
            "year": 2018,
            "category": ["cooking", "co-op"],
            "console": "Nintendo Switch",
            "image_url": "https://www.nintendo.com/content/dam/noa/en_US/games/switch/o/overcooked-2-switch/Switch_Overcooked2_box.png/_jcr_content/renditions/cq5dam.thumbnail.319.319.png",
            "duration_range": [2, 3],
            "active": true,
            "warned": false,
            "endDate": ""
        },
        {
            "user_email": "assuncao-martins.verified@gmail.com",
            "game_name": "Super Smash Bros Ultimate",
            "year": 2019,
            "category": ["action", "fighting"],
            "console": "Nintendo Switch",
            "image_url": "https://www.mobygames.com/images/covers/l/525828-super-smash-bros-ultimate-nintendo-switch-front-cover.png",
            "duration_range": [3, 6],
            "active": false,
            "warned": false,
            "endDate": ""
        },
        {
            "user_email": "manel_tristonho@hotmail.com",
            "game_name": "Super Smash Bros Ultimate",
            "year": 2019,
            "category": ["action", "fighting"],
            "console": "Nintendo Switch",
            "image_url": "https://www.mobygames.com/images/covers/l/525828-super-smash-bros-ultimate-nintendo-switch-front-cover.png",
            "duration_range": [3, 6],
            "active": true,
            "warned": false,
            "endDate": ""
        },
        {
            "user_email": "aventureiro101@hotmail.com",
            "game_name": "Uncharted 4: A Thief's End",
            "year": 2016,
            "category": ["action", "adventure"],
            "console": "PS4",
            "image_url": "https://images-na.ssl-images-amazon.com/images/I/71hcX5qwKNL._SX385_.jpg",
            "duration_range": [3, 6],
            "active": true,
            "warned": false,
            "endDate": ""
        },
        {
            "user_email": "castelo_branquinho@gmail.com",
            "game_name": "Uncharted 4: A Thief's End",
            "year": 2016,
            "category": ["action", "adventure"],
            "console": "PS4",
            "image_url": "https://images-na.ssl-images-amazon.com/images/I/71hcX5qwKNL._SX385_.jpg",
            "duration_range": [3, 6],
            "active": true,
            "warned": false,
            "endDate": ""
        },
        {
            "user_email": "docinho2019@hotmail.com",
            "game_name": "Death Stranding",
            "year": 2019,
            "category": ["action", "adventure"],
            "console": "PS4",
            "image_url": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5360/5360401_sd.jpg",
            "duration_range": [1, 4],
            "active": true,
            "warned": false,
            "endDate": ""
        }
    ],

    "notifications": {
        "a@a.com": [{
            "date": "2019/07/07",
            "time": "h:m",
            "game": "Uncharted",
            "user": "Mr. Borrower",
            "content": "Quero",
            "read": false
        }]
    },

    //rentals -> lenders (por email) -> games (por nome) -> borrowers (por email) -> [messages,lent=true|false]
    //assim para ser mais facil fazer display das cenas
    //uma func. para ver se um jogo foi aceite ou nao, nao e dificil
    "rental_history": {
        "lenders": {
            "docinho2019@hotmail.com": {
                "games": {
                    "Death Stranding": {
                        "borrowers": {

                        }
                    }

                }
            },
            "assuncao-martins.verified@gmail.com": {
                "games": {
                    "FIFA 19": {
                        "borrowers": {

                        }
                    },
                    "Super Smash Bros Ultimate": {
                        "borrowers": {
                            "castelo_branquinho@gmail.com": {
                                "lent": "accepted",
                                "duration": "",
                                /*pending,accepted,past*/
                                "messages": [{
                                        "user": "borrower",
                                        /*lender, borrower, system*/
                                        "content": "Hello, darling! Lend me this game! Muah",
                                        "date": "2019/09/07",
                                        "time": "12:02",
                                        "read": true
                                    },
                                    {
                                        "user": "lender",
                                        "content": "Okay, I will!",
                                        "date": "2019/09/07",
                                        "time": "12:32",
                                        "read": true
                                    },
                                    {
                                        "user": "system",
                                        "content": "Please return this game!",
                                        "date": "2019/09/07",
                                        "time": "12:35",
                                        "read": true
                                    }
                                ]
                            },
                            "aventureiro101@hotmail.com": {
                                "lent": "pending",
                                "duration": "",
                                "messages": [{
                                        "user": "borrower",
                                        /*lender, borrower, system*/
                                        "content": "Hi! I wanna borrow this game!",
                                        "date": "2019/09/07",
                                        "time": "12:00",
                                        "read": true
                                    },
                                    {
                                        "user": "lender",
                                        "content": "I can't lend it right now, but maybe later.",
                                        "date": "2019/09/14",
                                        "time": "12:40",
                                        "read": true
                                    }
                                ]
                            }
                        }
                    }
                }
            },
            "castelo_branquinho@gmail.com": {
                "games": {
                    "FIFA 19": {
                        "borrowers": {

                        }
                    },
                    "Uncharted 4: A Thief's End": {
                        "borrowers": {}
                    }
                }
            },
            "manel_tristonho@hotmail.com": {
                "games": {
                    "FIFA 19": {
                        "borrowers": {

                        }
                    },
                    "Overcooked 2": {
                        "borrowers": {

                        }
                    },
                    "Super Smash Bros Ultimate": {
                        "borrowers": {

                        }
                    }
                }
            },
            "marcelo_the_usurper@hotmail.com": {
                "games": {

                }
            },
            "a@a.com": { //ruizinho@hotmail.com
                "games": {
                    "FIFA 19": {
                        "borrowers": {
                            "docinho2019@hotmail.com": {
                                "lent": "pending",
                                "duration": "",
                                "messages": [{
                                        "user": "borrower",
                                        "content": "Hello, can you lend me this game?",
                                        "date": "2019/10/12",
                                        "time": "09:00",
                                        "read": true
                                    },
                                    {
                                        "user": "lender",
                                        "content": "Yes, ofc",
                                        "date": "2019/10/13",
                                        "time": "11:00",
                                        "read": true
                                    }
                                ]
                            }
                        }
                    }
                }
            },
            "aventureiro101@hotmail.com": {
                "games": {
                    "Uncharted 4: A Thief's End": {
                        "borrowers": {
                            "docinho2019@hotmail.com": {
                                "lent": "pending",
                                "duration": "",
                                "messages": [{
                                        "user": "borrower",
                                        "content": "Hello, can you lend me this game?",
                                        "date": "2019/10/12",
                                        "time": "09:00",
                                        "read": true                                 
                                    },
                                    {
                                        "user": "lender",
                                        "content": "Yes, ofc",
                                        "date": "2019/10/13",
                                        "time": "11:00",
                                        "read": true
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

//localStorage serve como backup, se existe, carrega json
if (localStorage.json) {
    json = JSON.parse(localStorage.json);
} else {
    localStorage.json = JSON.stringify(json);
}


currentUser = "assuncao-martins.verified@gmail.com"




//------------------------------------------------
//------------------------------------------------
//---------------GET functions--------------------
//------------------------------------------------
//------------------------------------------------


function getUser(userEmail) {
    return json.users_db[userEmail]
}

function getCurrentUser() {
    return currentUser;
}

//only active trades
function getLendingTo(userId) {
    trades = {}
    for (game in json.rental_history.lenders[userId].games) {
        for (borrower in json.rental_history.lenders[userId].games[game].borrowers) {
            if (json.rental_history.lenders[userId].games[game].borrowers[borrower].lent == "accepted") {
                trades[game] = borrower;
            }
        }
    }
    return trades;
}

function getBorrowingFrom(userId) {
    trades = {}
    for (lender in json.rental_history.lenders) {
        for (game in json.rental_history.lenders[lender].games) {
            if (json.rental_history.lenders[lender].games[game].borrowers[userId].lent == "accepted") {
                trades[game] = lender;
            }
        }
    }
    return trades;
}

function getAllGameLenders(gameName) {
    userList = [];
    for (users in json.game_rentals) {
        if (json.game_rentals[users].game_name == gameName) {
            userList.push(json.users_db[json.game_rentals[users].user_email])
        }
    }
    return userList;
}

function getBorrower(lender, game) {

    for (borrowerID in json.rental_history.lenders[lender].games[game].borrowers) {
        if (json.rental_history.lenders[lender].games[game].borrowers[borrowerID].lent == "accepted")
            return borrowerID;
    }
    return null;
}

function getDistanceByUser(userEmail1, userEmail2) {

    city1 = json.users_db[userEmail1].city_id;
    city2 = json.users_db[userEmail2].city_id;

    return json.cities[city1][city2];
}

function getDistance(city1, city2) {
    return json.cities[city1][city2]
}

function getCurrDate() {
    return new Date(new Date().getTime() + dayAdjustment * (1 * (1000 * 60 * 60 * 24)));
}

function dateToStr(date) {
    return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + (date.getUTCDate())
}

function strToDate(date) {
    date = date.split("/")
    return new Date(date[0], date[1] - 1, date[2]);
}

function getChat(userId1, userId2, game) {
    console.log(userId1, userId2)

    return json.rental_history.lenders[userId1].games[game].borrowers[userId2].messages
}

function getLendingMessages(userId, game) {
    messages = {}
    borrowers = json.rental_history.lenders[userId].games[game].borrowers
    for (borrower in borrowers) {
        messages[borrower] = json.rental_history.lenders[userId].games[game].borrowers[borrower].messages
    }
    return messages
}

function getBorrowingMessages(userId, game) {
    messages = {}
    for (lender in json.rental_history.lenders) {
        if (json.rental_history.lenders[lender].games[game] !== undefined)
            messages[lender] = json.rental_history.lenders[lender].games[game].borrowers[userId].messages
    }
    return messages
}


function getNotifications(userEmail) {
    notifications = []


    for(game in json.rental_history.lenders[userEmail].games){
        for(borrower in json.rental_history.lenders[userEmail].games[game].borrowers){
            last =  json.rental_history.lenders[userEmail].games[game].borrowers[borrower].messages.length - 1
            if(last>=0){
                objNotif = {}
                msg= json.rental_history.lenders[userEmail].games[game].borrowers[borrower].messages[last]
                objNotif.user = userEmail
                objNotif.otherUser = borrower
                objNotif.game = game
                objNotif.date = msg.date
                objNotif.time= msg.time
                objNotif.content = msg.content
                if(msg.user == "lender"){
                    objNotif.read = true
                } else {
                    objNotif.read = msg.read
                }
                notifications.push(objNotif)
            }
        }
    }

    for(lender in json.rental_history.lenders){
        for(game in json.rental_history.lenders[lender].games){
            for(borrower in json.rental_history.lenders[lender].games[game].borrowers){
                if(borrower == userEmail){
                    last =  json.rental_history.lenders[lender].games[game].borrowers[borrower].messages.length - 1
                    if(last>=0){
                        objNotif = {}
                        msg = json.rental_history.lenders[lender].games[game].borrowers[borrower].messages[last]
                        objNotif.user = userEmail
                        objNotif.otherUser = lender
                        objNotif.game = game
                        objNotif.date = msg.date
                        objNotif.time= msg.time
                        objNotif.content = msg.content
                        if(msg.user == "borrower"){
                            objNotif.read = true
                        } else {
                            objNotif.read = msg.read
                        }
                        notifications.push(objNotif)
                    }
                }        
            }
        }
    }


    return notifications.sort(function(first, second) {
        d1 = strToDate(first.date)
        d2 = strToDate(second.date)
        date1 = first.time.split(":")
        date2 = second.time.split(":")
        d1.setHours(date1[0]-0, date1[1]-0)
        d2.setHours(date2[0]-0, date2[1]-0)
        return d2 - d1;
    });
}

/*
getGames({
"gameName":"name",
"gameYear":[yearMin,yearMax],
"consoles":["console"],
"categories":["category"],
"distance":distance,
"duration":duration,
"byUser":"email"
})
*/
function getGames(filterObj) {
    console.log("filtering with", filterObj);
    games = [];
    savedList = {}
    borrower = filterObj.byUser;

    for (i = 0; i < json.game_rentals.length; i++) {
        gameRental = json.game_rentals[i];
        lender = gameRental.user_email;
        alreadySaved = savedList[gameRental.game_name];
        //console.log(filterObj.consoles, gameRental.console)
        respectsFilters = (filterObj.gameName ? gameRental.game_name.toLowerCase().indexOf(filterObj.gameName.toLowerCase()) != -1 : true) &&
            //(filterObj.gameYear ? gameRental.year == filterObj.gameYear : true) &&
            ((filterObj.gameYear && filterObj.gameYear.length) ? ((gameRental.year >= filterObj.gameYear[0]) && (gameRental.year <= filterObj.gameYear[1])) : true) &&

            ((filterObj.consoles && filterObj.consoles.length) ? (filterObj.consoles.some((val) => { return val.toLowerCase() == gameRental.console.toLowerCase() })) : true) &&

            ((filterObj.categories && filterObj.categories.length) ? gameRental.category.some((val) => { return filterObj.categories.includes(val) }) : true) &&
            ((filterObj.distance - 0) ? getDistanceByUser(lender, borrower) < filterObj.distance : true) &&
            ((filterObj.duration - 0) ? ((gameRental.duration_range[0] <= filterObj.duration) && (gameRental.duration_range[1] >= filterObj.duration)) : true);

        if (!alreadySaved && respectsFilters) {
            games.push(gameRental);
            savedList[gameRental.game_name] = true;
        }
    }
    console.log("returning", games);
    return games;
}

function getGameInfo(userId, gameName) {
    for (i in json.game_rentals) {
        if (json.game_rentals[i].user_email == userId && json.game_rentals[i].game_name == gameName) {
            return json.game_rentals[i];
        }
    }
}

function getGameData(gameName) {
    for (game in json.game_db) {
        if (json[game].name === gameName) {
            return json[game];
        }
    }
    return {};
}

function getGamesBorrowing(userId) {
    gamesRenting = {}
    for (lender in json.rental_history.lenders) {
        for (game in json.rental_history.lenders[lender].games) {
            if (json.rental_history.lenders[lender].games[game].borrowers[userId] !== undefined)
                if (json.rental_history.lenders[lender].games[game].borrowers[userId].lent == "accepted")
                    gamesRenting[game] = getGameInfo(lender, game);
        }
    }
    return gamesRenting;
}

function getGamesLending(userId) {
    gamesLending = {}
    if (json.rental_history.lenders[userId] != undefined)
        for (game in (json.rental_history.lenders[userId].games)) {
            gamesLending[game] = getGameInfo(userId, game);
        }
    return gamesLending;
}

//[{gameName:"cenas",daysLeft:1}]
function orderedGamesBorrowing(borrower) {
    games = getGamesBorrowing(borrower);
    gamesOrdered = []
    for (game in games) {
        gameData = games[game];
        daysLeft = strToDate(gameData.endDate) - getCurrDate();
        gameData.daysLeft = Math.round(daysLeft / ((1000 * 60 * 60 * 24)));
        gamesOrdered[gameData.name] = gameData;
    }
    return gamesOrdered.sort(function(first, second) {
        return first.daysLeft - second.daysLeft;
    });

}

function orderedGamesLending(lender) {
    games = getGamesLending(lender);
    gamesOrdered = []
    for (game in games) {
        gameData = games[game];
        daysLeft = strToDate(gameData.endDate) - getCurrDate();
        gameData.daysLeft = Math.round(daysLeft / ((1000 * 60 * 60 * 24)));
        gamesOrdered[gameData.name] = gameData;
    }
    return gamesOrdered.sort(function(first, second) {
        return first.daysLeft - second.daysLeft;
    });

}

function getGameData(gameName) {
    for (game in json.game_db) {
        if (json[game].name === gameName) {
            return json[game];
        }
    }
    return {};
}

//------------------------------------------------
//------------------------------------------------
//---------------ACTION functions-----------------
//------------------------------------------------
//------------------------------------------------


function addUser(userObj) {
    userObj.city_id = Math.ceil(Math.random() * 4)
    userObj.lender_rating = 5,
        userObj.borrower_rating = 5,
        userObj.llama_points = 100,
        userObj.total_borrowed = 0,
        userObj.total_lent = 0
    json.users_db[userObj.email] = userObj;

    json.rental_history.lender[userObj.email] = {}
    json.rental_history.lender[userObj.email].games = {}

    pushData();
}

/*
{
    "name": "Far Cry 4",
    "year": 2014,
    "category": ["fps", "action", "adventure"],
    "console": ["PS4", "Xbox One", "PC"],
    "image_url": "https://www.google.pt/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=2ahUKEwia_f_ZlePlAhUZ6OAKHd3DDwYQjRx6BAgBEAQ&url=https%3A%2F%2Fwww.lojapsngames.com.br%2Ffar-cry-4-midia-digital-xbox-one&psig=AOvVaw3DRWSX4jRe5aKB6R5M4MTS&ust=1573596434957711",
    "description": "Far Cry 4 is a first-person action-adventure game. Players assume control of Ajay Ghale, a Kyrati-American who is on a quest to spread his deceased mother's ashes in the fictional country of Kyrat."
}
*/
function addGame(userId, gameObj) {
    gameObj.user_email = userId;
    json.game_rentals.push(gameObj);
    json.rental_history.lenders[userId].games[gameObj.game_name] = {}
    json.rental_history.lenders[userId].games[gameObj.game_name].borrowers = {}
    pushData();
}

function deleteGame(userId, game_name) {
    for (i in json.game_rentals) {
        game = json.game_rentals[i];
        if (game.user_email == userId && game.game_name == game_name) {
            json.game_rentals.splice(json.game_rentals.indexOf(game), 1);
        }
    }
    pushData();
}

function markGameAsReturned(lenderEmail, gameName) {
    json.rental_history.lenders[lenderEmail].games[gameName].borrowers
    for (b in borrowers) {
        if (json.rental_history.lenders[lenderEmail].games[gameName].borrowers[b].lent == "accepted") {
            json.rental_history.lenders[lenderEmail].games[gameName].borrowers[b].lent = "past"
        }
    }
    pushData();
}

function markGameAsBorrowed(lenderEmail, borrowerEmail, gameName) {
    json.rental_history.lenders[lenderEmail].games[gameName].borrowers[borrowerEmail].lent = "accepted"
    pushData()
}

function acceptRental(lenderEmail, borrowerEmail, gameName) {
    json.rental_history.lenders[lenderEmail].games[gameName].borrowers[borrowerEmail].lent = "accepted"
    duration = json.rental_history.lenders[lenderEmail].games[gameName].borrowers[borrowerEmail].duration

    for (game in json.game_rentals) {
        if (json.game_rentals[game].user_email == lenderEmail && json.game_rentals[game].game_name == gameName) {
            json.game_rentals[game].active = false
        }
    }

    game = getGameInfo(lenderEmail, gameName);
    endDate = new Date(getCurrDate().getTime() + duration * (7 * (1000 * 60 * 60 * 24)));
    game.endDate = dateToStr(endDate);
    game.warned = false;
    pushData();
}

function refuseRental(lenderEmail, borrowerEmail, gameName) {
    json.rental_history.lenders[lenderEmail].games[gameName].borrowers[borrowerEmail].lent = "past"
    pushData();
}

/*"castelo_branquinho@gmail.com": {
  "lent": "accepted",
  pending,accepted,past
  "messages": [{
          "user": "borrower",
          lender, borrower, system
          "content": "Hello, darling! Lend me this game! Muah",
          "date": "2019/09/07",
          "time": "12:02"
      },*/

function getCurrDate() {
    return new Date(new Date().getTime() + dayAdjustment * (1 * (1000 * 60 * 60 * 24)));
}

function dateToStr(date) {
    return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + (date.getUTCDate())
}

function strToDate(date) {
    date = date.split("/")
    return new Date(date[0], date[1] - 1, date[2]);
}

function createRentalProposal(lender, borrower, gameName, duration, msg) {
    if (json.rental_history.lenders[lender] == undefined) {
        json.rental_history.lender[lender] = {}
        json.rental_history.lender[lender][gameName] = {}
    }
    entry = json.rental_history.lenders[lender].games[gameName].borrowers[borrower]
    if (entry == undefined) {
        newEntry = {}
        newEntry["lent"] = "pending"
        newEntry["duration"] = duration
        newEntry["messages"] = []
        json.rental_history.lenders[lender].games[gameName].borrowers[borrower] = newEntry
    }

    sendMsg(lender, borrower, msg, gameName);
    pushData();
}

function sendMsg(lender, borrower, msg, gameName, sender) {
    date = getCurrDate()
    hours = date.getUTCHours()
    mins = date.getUTCMinutes()
    time = hours + ":" + mins
    msgJson = {
        "user": sender,
        "content": msg,
        "date": dateToStr(getCurrDate()),
        "time": time,
        "read": false     
    }
    json.rental_history.lenders[lender].games[gameName].borrowers[borrower].messages.push(msgJson);
    pushData();
}

function sendNotifications(userEmail) {
    gamesBorrowing = orderedGamesBorrowing(userEmail)

    for (i in gamesBorrowing) {
        game = gamesLending[i];
        if (game.daysLeft <= 0) {
            sendMsg(game.user_email, userEmail, "The rental period is over. Don't forget to return this game!", game.game_name, "system")
        }
    }

    gamesLending = orderedGamesLending(userEmail)

    for (i in gamesLending) {
        game = gamesLending[i];
        if (game.daysLeft <= -2) {
            sendMsg(userEmail, getBorrower(userEmail, game.game_name), "Has this game been returned? Don't forget to mark this game as returned!", game.game_name, "system")
        }
    }
    pushData();
}