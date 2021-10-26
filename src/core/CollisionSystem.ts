import { Sprite } from 'src/elements/Sprite';


export class CollisionSystem {

	public static isCollide ( objectA: Sprite, objectB: Sprite ): boolean {
		return this.isCollideUp( objectA, objectB )
			|| this.isCollideDown( objectA, objectB )
			|| this.isCollideLeft( objectA, objectB )
			|| this.isCollideRight( objectA, objectB )
	}

	protected static isCollideUp ( objectA: Sprite, objectB: Sprite ): boolean {
		const isHit: boolean = objectA.position.y + ( 1 - objectA.anchor.y ) * objectA.height >= objectB.position.y - objectB.anchor.y * objectB.height
			&& objectA.position.y <= objectB.position.y
			&& this.isSameX( objectA, objectB )
		return isHit;
	}

	protected static isCollideDown ( objectA: Sprite, objectB: Sprite ): boolean {
		const isHit: boolean = objectA.position.y - objectA.anchor.y * objectA.height <= objectB.position.y + ( 1 - objectB.anchor.y ) * objectB.height
			&& objectA.position.y >= objectB.position.y
			&& this.isSameX( objectA, objectB )
		return isHit;
	}

	protected static isCollideLeft ( objectA: Sprite, objectB: Sprite ): boolean {
		const isHit: boolean = objectA.position.x + ( 1 - objectA.anchor.x ) * objectA.width >= objectB.position.x - objectB.anchor.x * objectB.width
			&& objectA.position.x <= objectB.position.x
			&& this.isSameY( objectA, objectB )
		return isHit;
	}

	protected static isCollideRight ( objectA: Sprite, objectB: Sprite ): boolean {
		const isHit: boolean = objectA.position.x - objectA.anchor.x * objectA.width <= objectB.position.x + ( 1 - objectB.anchor.x ) * objectB.width
			&& objectA.position.x >= objectB.position.x
			&& this.isSameY( objectA, objectB )
		return isHit;
	}

	protected static isSameX ( objectA: Sprite, objectB: Sprite ): boolean {
		return Math.abs( objectA.x - objectB.x - objectA.width * objectA.anchor.x ) < objectB.width
			|| Math.abs( objectB.x - objectA.x - objectB.width * objectB.anchor.x ) < objectA.width;
	}

	protected static isSameY ( objectA: Sprite, objectB: Sprite ): boolean {
		return Math.abs( objectA.y - objectB.y - objectA.height * objectA.anchor.y ) < objectB.height
			|| Math.abs( objectB.y - objectA.y - objectB.height * objectB.anchor.y ) < objectA.height;
	}

}