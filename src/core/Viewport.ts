import { Singleton } from 'typescript-ioc';

@Singleton
export class Viewport {

	protected _width: number;
	public get width (): number {
		return this._width;
	}

	protected _height: number;
	public get height (): number {
		return this._height;
	}

	constructor ( config: IViewport ) {
		this._width = config.width;
		this._height = config.height;
	}
}

export interface IViewport {
	width: number;
	height: number;
}