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

const browsers = []
const messages = []

io.on( "connection", browser => {

	browsers.push( browser )

	browser.emit( "PREV_MESSAGES", messages )

	browser.on( "NEW_MESSAGE_FROM_BROWSER_BY_INPUT", message => {

		messages.push( message )

		for ( const b of browsers ) {

			b.emit( "NEW_MESSAGE_FROM_SERVER", message )
		}
	} )
} )

httpServer.listen( PORT, "0.0.0.0", () => {

	console.log( `Server listening on port ${ PORT }` )
} )
