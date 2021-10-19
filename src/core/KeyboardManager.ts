import { Singleton } from 'typescript-ioc';
import * as MiniSignal from 'mini-signals';

@Singleton
export class KeyboardManager {

	public onKeyDownSignal: MiniSignal = new MiniSignal();
	public onKeyUpSignal: MiniSignal = new MiniSignal();
	public onKeyPressSignal: MiniSignal = new MiniSignal();

	public keysState: Array<IKeyboardButtonState> = new Array<IKeyboardButtonState>();

	constructor () {
		window.addEventListener( 'keydown', this.onKeyDown.bind( this ) );
		window.addEventListener( 'keyup', this.onKeyUp.bind( this ) );
	}

	protected onKeyDown ( e: KeyboardEvent ): void {
		const keyState = this.keysState.find( state => state.key === e.key );
		if ( !keyState ) {
			this.keysState.push( {
				key: e.key,
				isPress: true,
				isTouch: true
			} );
		} else {
			keyState.isTouch = !keyState.isPress;
			keyState.isPress = true;
		}
		const data: IKeyboardEventData = {
			key: e.key
		};
		this.onKeyDownSignal.dispatch( data );
	}

	protected onKeyUp ( e: KeyboardEvent ): void {
		const keyState = this.keysState.find( state => state.key === e.key );
		if ( !keyState ) {
			return;
		}
		keyState.isTouch = false;
		keyState.isPress = false;
		const data: IKeyboardEventData = {
			key: e.key
		};
		this.onKeyUpSignal.dispatch( data );
	}

	public updateKeyboard (): void {
		this.keysState.forEach( state => {
			if ( state.isPress ) {
				const data: IKeyboardEventData = {
					key: state.key
				};
				this.onKeyPressSignal.dispatch( data );
			}
		} );
	}

}

export interface IKeyboardButtonState {
	key: string;
	isPress: boolean;
	isTouch: boolean;
}

export interface IKeyboardEventData {
	key: string;
}

export enum KeyboardButton {
	ARROW_UP = 'ArrowUp',
	ARROW_DOWN = 'ArrowDown',
	ARROW_LEFT = 'ArrowLeft',
	ARROW_RIGHT = 'ArrowRight'
}