import { animate } from '../../vanillamation/_animate'

/**
 * Modal Javascript
 *
 * Handle modal animation and mechanics.
 *
 * @package vanillamation
 * @author Jefferson Real <me@jeffersonreal.uk>
 * @copyright Copyright 2024 Jefferson Real
 */


const bouncingBall = () => {

	const init = () => {
		const ball = document.querySelector( '#ball' )
		if ( ! ball ) return
		ball.addEventListener( 'click', ballClick )
	}


	/**
	 * Handle click on the ball.
	 *
	 * @param event
	 */
	const ballClick = async ( event ) => {

		const ball = event.target.closest( '#ball' )

		// Nesting yucky.
		animate( ball, 'bottom', 'easeOutCirc', 0, 300, 400 )
		.then( ( result )=> {
			console.log( result )
			
			animate( ball, 'bottom', 'easeInCirc', 300, 0, 400 )
			.then( ( result )=> {
				console.log( result )
			} )
			
		} )

	}


	// Poll for doc ready state.
	const docLoaded = setInterval( () => {
		if ( document.readyState === 'complete' ) {
			clearInterval( docLoaded )
			init()
		}
	}, 100 )
}

export { bouncingBall }
