import express from 'express'
import logger from 'morgan'
import dotenv from 'dotenv'
import { createClient } from '@libsql/client'

import { Server } from 'socket.io'
import { createServer } from 'http'

dotenv.config()

const port = process.env.PORT ?? 3000

const app = express()
const server = createServer(app)
const io = new Server(server, {
    // para recuperar mensajes no recibidos al estar offline
    connectionStateRecovery: {}
})

// creamos la conexion a la BBDD
const db = createClient({
    url: "libsql://my-db-tomas-machin.turso.io",    // URL del comando turso db show <nombre-db> 
    // token generado con el comando turso db tokens create <nombre-db>
    authToken: process.env.DB_TOKEN     // variable de entorno del archivo .env
})

await db.execute(`
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT,
        user TEXT
    )    
`)

io.on('connection', async (socket) => {
    console.log('Se ha conectado un usuario nuevo!')

    socket.on('disconnect', () => {
        console.log("Se ha desconectado un usuario :(")
    })

    socket.on('chat message', async (msg) => {
        let result
        const username = socket.handshake.auth.username ?? 'anonymous'
        try {
            result = await db.execute({
                sql: 'INSERT INTO messages (content, user) VALUES (:msg, :username)',
                args: { msg, username }  // este msg es el valor de :msg del VALUES (tienen que llamarse igual obvio) | evita inyeccion S  QL
            })
        }
        catch (e){
            console.error(e);
            return
        }

        io.emit('chat message', msg, result.lastInsertRowid.toString(), username)    // broadcast del mensaje a todos los usuarios conectados | id del mensaje
    })
    if (!socket.recovered) {    // recuperase los mensajes de sin conexion 
        try {
            const results = await db.execute({
                sql: `SELECT id, content, user FROM messages WHERE id > ?`,
                args: [socket.handshake.auth.serverOffset ?? 0]
            })
            results.rows.forEach(row => {
                socket.emit('chat message', row.content, row.id.toString(), row.user)
            })
        }
        catch (e) {
            console.log(e)
        }
    }
})

app.use(logger('dev'))

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/client/index.html')
})

server.listen(port, () => {
    console.log(`Server running on localhost:${port}`)
})