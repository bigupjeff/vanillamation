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


const modal = () => {

	let animating = false // True when animation is in progress.
	let active = false // True when modal is displayed.
	let mobile // True when screen width is less than 768px.
	let scrollbarWidth

	let overlay
	let dialog
	let buttonClose


	const init = () => {
		const openButtons = document.querySelectorAll( '.modal_control-open' )
		openButtons.forEach( ( button ) => {
			button.addEventListener( 'click', modalLaunch )
		} )
	}


	/**
	 * Open the model popup.
	 *
	 * @param event
	 */
	const modalLaunch = async ( event ) => {
		// Get the modal elements.
		const id = event.currentTarget.getAttribute( 'data-modal-target-id' )
		overlay  = document.querySelector( '#' + id )

		dialog      = overlay.querySelector( '.modal_dialog' )
		buttonClose = overlay.querySelector( '.modal_control-close' )

		buttonClose.onclick = () => {
			closeModal()
		}

		// If a click event is not on dialog.
		window.onclick = function ( event ) {
			if (
				dialog !== ! event.target &&
				! dialog.contains( event.target )
			) {
				closeModal()
			}
		}

		mobile = await setDeviceSize()
		scrollbarWidth = await setScrollbarWidth()
		openModal()
	}

	const setDeviceSize = async () => {
		const pageWidth = parseInt( document.querySelector( 'html' ).getBoundingClientRect().width, 10 )
		const isMobile = ( pageWidth <= 768 ) ? true : false

		if ( isMobile && active && ! animating ) {
			dialog.style.left = '0'
			dialog.style.transform = 'scale(1)'
			dialog.style.opacity = '1'
			overlay.style.display = 'contents'
			overlay.style.opacity = '1'
		} else if ( isMobile && ! active && ! animating ) {
			dialog.style.left = '-768px'
			dialog.style.transform = 'scale(1)'
			dialog.style.opacity = '1'
			overlay.style.display = 'contents'
			overlay.style.opacity = '1'
		} else if ( ! isMobile && active && ! animating ) {
			dialog.style.left = '0'
			dialog.style.transform = 'scale(1)'
			dialog.style.opacity = '1'
			overlay.style.display = 'flex'
			overlay.style.opacity = '1'
		} else if ( ! isMobile && ! active && ! animating ) {
			dialog.style.left = '0'
			dialog.style.transform = 'scale(0)'
			dialog.style.opacity = '0'
			overlay.style.display = 'none'
			overlay.style.opacity = '0'
		}
		return isMobile
	}


	/**
	 * Restyle the modal on window resize.
	 *
	 * This prepares the modal by switching between different device
	 * layouts as required. Without this check, there is an inconsistancy in
	 * transitions if for example, the modal is launched as 'desktop' then
	 * closed as 'mobile'.
	 *
	 */
	const setResizeListener = () => {
		let resizeTimer
		const resizeListener = ( event ) => {
			if ( resizeTimer !== null ) window.clearTimeout( resizeTimer )
			resizeTimer = window.setTimeout( () => {
				if ( ! active ) {
					window.removeEventListener( 'resize', resizeListener )
					return
				}
				mobile = setDeviceSize()
			}, 20 )
		}
		window.addEventListener( 'resize', resizeListener )
	}


	/**
	 * Open the modal.
	 */
	const openModal = async () => {
		if ( ! active && ! animating ) {
			active = true
			animating = true
			disableScroll()
			setResizeListener()

			if ( mobile ) {
				dialog.style.transform = 'scale(1)'
				dialog.style.opacity = '1'
				overlay.style.display = 'contents'
				overlay.style.opacity = '1'
				await animate( dialog, 'left', 'easeInOutCirc', -768, 0, 800 )
				animating = false
			} else {
				dialog.style.left = '0'
				overlay.style.display = 'flex'
				await Promise.all( [
					animate( overlay, 'opacity', 'easeInOutCirc', 0, 1, 800 ),
					animate( dialog, 'opacity', 'easeInOutCirc', 0, 1, 800 ),
					animate( dialog, 'scale', 'easeInOutCirc', 0, 1, 800 )
				] )
				animating = false
			}
		}
	}


	// Close the modal.
	const closeModal = async () => {
		if ( active && ! animating ) {
			active = false
			animating = true
			enableScroll()
			mobile = await setDeviceSize()

			if ( mobile ) {
				dialog.style.transform = 'scale(1)'
				dialog.style.opacity = '1'
				overlay.style.display = 'contents'
				overlay.style.opacity = '1'
				await animate( dialog, 'left', 'easeInOutCirc', 0, -768, 800 )
				animating = false
			} else {
				dialog.style.left = '0'
				overlay.style.display = 'flex'
				await Promise.all( [
					animate( overlay, 'opacity', 'easeInOutCirc', 1, 0, 800 ),
					animate( dialog, 'opacity', 'easeInOutCirc', 1, 0, 800 ),
					animate( dialog, 'scale', 'easeInOutCirc', 1, 0, 800 )
				] )
				overlay.style.display = 'none'
				animating = false
			}
		}
	}

	const setScrollbarWidth = async () => {
		const widthWithScrollbar = window.innerWidth
		const widthWithoutScrollbar = document.querySelector( 'html' ).getBoundingClientRect().width
		scrollbarWidth = parseInt( widthWithScrollbar - widthWithoutScrollbar, 10 ) + 'px'
		return scrollbarWidth
	}


	/**
	 * Lock scrolling and hide scrollbar.
	 */
	const disableScroll = () => {
		const scrollMask = document.getElementById( 'js_scrollMask' )

		// Get body background colour to fill the scrollMask with.
		const bodyStyles = window.getComputedStyle( document.querySelector( 'body' ) )
		const bodyColour = bodyStyles.getPropertyValue( 'background-color' )

		// Check is it's unset/transparent and set to white if so.
		const rgba   = bodyColour.replace( / /g, '' )
		// Browser computed colour should always return rgba format.
		const colour = ( rgba === 'rgba(0,0,0,0)' ) ? '#fff' : rgba

		// Show or create and insert the scrollbar mask.
		if ( scrollMask ) {
			scrollMask.style.display = 'block'
		} else {
			const scrollMask = document.createElement( 'div' )
			scrollMask.setAttribute( 'id', 'js_scrollMask' )
			scrollMask.style.position = 'fixed'
			scrollMask.style.right = '0'
			scrollMask.style.top = '0'
			scrollMask.style.bottom = '0'
			scrollMask.style.width = scrollbarWidth
			scrollMask.style.background = colour
			scrollMask.style.zIndex = '9'
			document.body.appendChild( scrollMask )
		}
		document.querySelector( 'body' ).style.overflow = 'hidden'
		document.querySelector( 'html' ).style.paddingRight = scrollbarWidth
	}


	/**
	 * Unlock scrolling and show scrollbar.
	 */
	const enableScroll = () => {
		const elemExists = document.getElementById( 'js_scrollMask' )
		if ( elemExists !== null ) {
			document.getElementById( 'js_scrollMask' ).style.display = 'none'
			document.querySelector( 'body' ).style.overflow = 'visible'
			document.querySelector( 'html' ).style.paddingRight = '0'
		}
	}


	// Poll for doc ready state.
	const docLoaded = setInterval( () => {
		if ( document.readyState === 'complete' ) {
			clearInterval( docLoaded )
			init()
		}
	}, 100 )
}

export { modal }
