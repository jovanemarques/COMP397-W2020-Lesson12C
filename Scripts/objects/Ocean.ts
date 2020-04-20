module objects
{
    export class Ocean extends GameObject
    {
        // PRIVATE INSTANCE MEMBERS
        private _verticalSpeed?:number;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super(config.Game.OCEAN_ATLAS, "ocean");

            this.Start();
        }

        // PRIVATE METHODS

        protected _checkBounds(): void
        {
            if(this.y >= 0)
            {
                this.Reset();
            }
        }

        private _move():void
        {
            this.position = util.Vector2.add(this.position, this.velocity);
        }

        // PUBLIC METHODS
        public Start(): void
        {
            this.type = enums.GameObjectType.OCEAN;
            this._verticalSpeed = 5; // 5 px per frame
            this.velocity = new util.Vector2(0, this._verticalSpeed);
            this.Reset();
        }

        public Update(): void
        {
            this._move();
            this._checkBounds();
        }

        public Reset(): void
        {
            this.position = new util.Vector2(0, -960);
        }


    }
}
