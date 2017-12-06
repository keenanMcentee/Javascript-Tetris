/** 
 *  @fileOverview Create an instance of game.
 *
 *  @author       Keenan McEntee
 */

/**
 * Creates an instance of Game and calls initialise on it.
 */
var gameNs = {};

function main()
{
	const game = new Game();
	gameNs.game = game;
	game.initWorld();
	game.update();

}