from tornado import websocket, web, ioloop, httpserver
import tornado
import json
session = {}
WAITING_FOR_PLAYERS=0
GAME_IN_PROGRESS=1
game_state=WAITING_FOR_PLAYERS

class WSHandler(tornado.websocket.WebSocketHandler):

	def check_origin(self, origin):
		return True
		
	def open(self):
		print ("Connection opened")
		
	def on_message(self, message):
		print("server message received")
		msg = json.loads(message)
		if msg['type'] == 'join':
			self.join()
		elif msg['type'] == 'gameOver':
			self.game_over()
	def on_close(self):
		pass
		
	def get_player_address(self):
		return (self.request.remote_ip,self.stream.socket.getpeername()[1])

	def join(self):
		if len(session.keys()) < 2:
			player_address = self.get_player_address()
			session[player_address] = self
			print ("A player joined the session")
			game_state = GAME_IN_PROGRESS
			for key, value in session.items():
				#if the key is not the socket the message came in on - what does that mean?
				if(key == self.get_player_address()):
					self.write_message(self.format_message("success" , str(game_state)))
		
		else:
			for key, value in session.items():
				#if the key is not the socket the message came in on - what does that mean?
				if(key != self.get_player_address()):
					self.write_message(self.format_message("error" , "No available space: Two players already in the game!"))
					
	def game_over(self):
		if self.get_player_address() in session: 
			if len(session.keys()) > 0: 
				for key, value in session.items():
						#if the key is not the socket the message came in on - what does that mean?
						if(key == self.get_player_address()):
							game_state = WAITING_FOR_PLAYERS
							self.write_message(self.format_message("gameOver" , str(game_state)))
				session.clear()			
	def format_message(self,type,data):
		message = {'type' : type , 'data' : data}
		return json.dumps(message)
	
app= tornado.web.Application([
        	#map the handler to the URI named "test"
			(r'/wstest', WSHandler),
], debug = True)
 
if __name__ == '__main__':
			server_port=8080
			app.listen(server_port)
			ioloop.IOLoop.instance().start()
 
