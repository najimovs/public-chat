import "@css/main.css"
import { io } from "socket.io-client"

const ul = document.querySelector( "ul" )
const input = document.querySelector( "input" )

const server = io( "http://localhost:3000" )

server.on( "PREV_MESSAGES", messages => {

	for ( const m of messages ) {

		const li = document.createElement( "li" )
		li.textContent = m

		ul.appendChild( li )
	}
} )

input.addEventListener( "keyup", e => {

	if ( e.code === "Enter" ) {

		server.emit( "NEW_MESSAGE_FROM_BROWSER_BY_INPUT", input.value )

		input.value = ""
	}
} )

server.on( "NEW_MESSAGE_FROM_SERVER", message => {

	const li = document.createElement( "li" )
	li.textContent = message

	ul.appendChild( li )
} )
