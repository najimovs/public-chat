import "@css/main.css"
import { io } from "socket.io-client"

const ul = document.querySelector( "ul" )
const input = document.querySelector( "input" )

const server = io( "http://localhost:3000" )

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
