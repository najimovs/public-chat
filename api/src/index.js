import { createServer } from "node:http"
import { Server } from "socket.io"

const PORT = 3000

const httpServer = createServer( ( req, res ) => {

	res.writeHead( 200, { "Content-Type": "text/plain" } )
	res.end( "Socket server is running" )
} )

const io = new Server( httpServer, {
	cors: {
		origin: "*",
		methods: [ "GET", "POST" ],
	}
} )

io.on( "connection", browser => {

	console.log( "New connection" )
} )

httpServer.listen( PORT, "0.0.0.0", () => {

	console.log( `Server listening on port ${ PORT }` )
} )
