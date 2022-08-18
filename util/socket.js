const redis = require("redis");
const axios = require("axios");
const socketIO = require("socket.io");
const redisClient = redis.createClient({ url: process.env.REDISURL });

function apiScoreCalls(path) {
    const options = {
        method: 'GET',
        url: `${process.env.RAPIDAPIURL}/${path}`,
        headers: {
            'X-RapidAPI-Key': process.env.RAPIDAPIKEY,
            'X-RapidAPI-Host': process.env.RAPIDAPIHOST
        }
    };
    return axios.request(options).then((response) => {
        return response.data.results
    }).catch((error) => {
        return { 'status': "error", 'data': error?.message }
    });
}

let socket;
exports.listen = async (server) => {
    socket = new socketIO.Server(server)
    await redisClient.connect();

    socket.on("connection", (client) => {
        let allRooms = {}
        client.on("subscribe", async (eventID) => {
            client.join(eventID);
            allRooms[eventID] = true
            let checkKey = await redisClient.get(`fetch_${eventID}`)
            if (!checkKey) {
                await redisClient.set(`fetch_${eventID}`, "true");
            }
        })

        client.on("unSubscribe", (eventID) => {
            client.leave(eventID);
        })

        setInterval(async () => {
            for (let key in allRooms) {
                let size = socket.sockets.adapter.rooms.get(key)?.size
                if (!size) {
                    redisClient.expire(`fetch_${key}`, 5)
                }
            }
        }, 2000)

    })

    setInterval(async () => {
        let allKey = await redisClient.keys(`*`)
        for (let key of allKey) {
            let value = key.split('_')
            if (value[0] === 'fetch') {
                let matchId = value[1]
                let data = await apiScoreCalls(`match/${matchId}`)
                socket.to(matchId).emit("message", data);
            }
        }
    }, 5000)

};