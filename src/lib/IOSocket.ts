import { createClient } from 'redis';
import axios from 'axios';
import { Server } from "socket.io";
import settings from '../settings';
const redisClient = createClient({ url: settings.redisUrl });

function apiScoreCalls(path: any) {
    const options = {
        method: 'GET',
        url: `${settings.rapidAPIUrl}/${path}`,
        headers: {
            'X-RapidAPI-Key': settings.rapidAPIKey,
            'X-RapidAPI-Host': settings.rapidAPIHost
        }
    };
    return axios.request(options).then((response) => {
        return response.data.results
    }).catch((error) => {
        return { 'status': "error", 'data': error?.message }
    });
}

let socket: any;
const listen = async (server: any) => {
    socket = new Server(server)
    await redisClient.connect();

    socket.on("connection", (client: any) => {
        let allRooms: any = {}
        client.on("subscribe", async (eventID: any) => {
            client.join(eventID);
            allRooms[eventID] = true
            let checkKey = await redisClient.get(`fetch_${eventID}`)
            if (!checkKey) {
                await redisClient.set(`fetch_${eventID}`, "true");
            }
        })

        client.on("unSubscribe", (eventID: any) => {
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
                // let data = await apiScoreCalls(`match/${matchId}`)
                // socket.to(matchId).emit(data);
            }
        }
    }, 5000)

};

export default {
    listen: listen
};