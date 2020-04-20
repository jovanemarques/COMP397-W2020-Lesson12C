module objects
{
    export class Player extends GameObject
    {
        // PRIVATE INSTANCE MEMBERS

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            this.Start();
        }

        // PRIVATE METHODS
        protected _checkBounds(): void {

        }

        // PUBLIC METHODS


        public Start(): void {
            this.type = enums.GameObjectType.PLAYER;
        }

        public Update(): void {
           this.position = new util.Vector2(this.stage.mouseX, this.stage.mouseY);
        }

        public Reset(): void {

        }


    }
}
