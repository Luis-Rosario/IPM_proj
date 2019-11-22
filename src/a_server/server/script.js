var peer = new Peer("lleme-play-server-2");

function handleData(data, person) {
    console.log(data);
    newList = connList.filter(r => {
        return r != person;
    });
    newList.forEach(conn => {
        sendMsg(conn, data);
    });
    console.log("gotData", data);
    document.getElementById("list").innerHTML +=
        "<li>Got data from: " + person + "</li>";
}

function sendMsg(conn, msg) {
    conn.send(msg);
    console.log("sent update", msg);
    document.getElementById("list").innerHTML +=
        "<li>Sent Update to " + conn.peer + "</li>";
}

connList = [];

//outra pessoa ligou-se a mim
function connected(conn) {
    connList.push(conn);
    conn.on("data", data => {
        handleData(data, conn);
    });
    console.log("other connected to me");

    //ignore, test stuff
    $("#msg-go").click(function() {
        var value = $("#other-id").val();
        sendMsg(conn, value);

    });
}

function main(id) {
    $("#my-id").text("My ID: " + id);
    console.log(id);
    peer.on("connection", connected);
}

console.log(peer.id);
console.log("aa");
peer.on("open", main);