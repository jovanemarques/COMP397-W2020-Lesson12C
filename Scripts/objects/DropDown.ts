module objects
{
    export class DropDown extends createjs.Container
    {
        // PRIVATE INSTANCE VARIABLES
        private _shape : createjs.Shape;
        private _itemList : Array<string>;
        private _buttonList: Array<objects.Button>;
        private _itemSelected : number;

        private _position : objects.Vector2;
        private _width : number;
        private _height : number;

        private _defualtBackColour : objects.Color;
        private _borderColour : objects.Color;

        private _defaultLabelColor : string;
        private _mouseOverBackColour : objects.Color;
        private _mouseOverLabelColour : string;

        // PUBLIC PROPERTIES
        public get shape() : createjs.Shape
        {
            return this._shape;
        }

        public set shape(v : createjs.Shape)
        {
            this._shape = v;
        }

        public get itemList() : Array<string>
        {
            return this._itemList;
        }

        public set itemList(v : Array<string>)
        {
            this._itemList = v;
        }

        public get itemSelected() : number
        {
            return this._itemSelected;
        }

        public set itemSelected(v : number)
        {
            this._itemSelected = v;
        }

        get position():Vector2
        {
            return this._position;
        }

        set position(newPosition:Vector2)
        {
            this._position = newPosition;
            this.x = newPosition.x;
            this.y = newPosition.y;
        }

        public get width() : number
        {
            return this._width;
        }

        public set width(v : number)
        {
            this._width = v;
        }

        public get height() : number
        {
            return this._height;
        }

        public set height(v : number)
        {
            this._height = v;
        }

        public get defaultBackColour() : objects.Color
        {
            return this._defualtBackColour;
        }

        public set defaultBackColour(v : objects.Color)
        {
            this._defualtBackColour = v;
        }

        public get mouseOverBackColour() : objects.Color
        {
            return this._mouseOverBackColour;
        }

        public set mouseOverBackColour(v : objects.Color)
        {
            this._mouseOverBackColour = v;
        }

        public get defaultLabelColour() : string
        {
            return this._defaultLabelColor;
        }

        public set defaultLabelColour(v : string)
        {
            this._defaultLabelColor = v;
        }

        public get mouseOverLabelColour() : string
        {
            return this._mouseOverLabelColour;
        }

        public set mouseOverLabelColour(v : string)
        {
            this._mouseOverLabelColour = v;
        }

        public get borderColour() : objects.Color
        {
            return this._borderColour;
        }

        public set borderColour(v : objects.Color)
        {
            this._borderColour = v;
        }

        // CONSTRUCTOR
        constructor(list:Array<string>,
            defaultLabelColour:string = config.Color.BLACK,
            mouseOverLabelColour: string = config.Color.WHITE,
            width:number=0, height:number=0,
            defaultBackColour: string = config.Color.WHITE_SMOKE,
            mouseOverBackColour: string = config.Color.LIGHT_GREY,
            borderColour: string = config.Color.BLACK,
            position:objects.Vector2 = new objects.Vector2(), isCentered: boolean = false)
        {
            super();

            this.itemList = list;

            this.defaultLabelColour = defaultLabelColour;
            this.mouseOverLabelColour = mouseOverLabelColour;

            this.defaultBackColour = new objects.Color(defaultBackColour);
            this.mouseOverBackColour = new objects.Color(mouseOverBackColour);
            this.borderColour = new objects.Color(borderColour);

            this.shape = new createjs.Shape();

            this.width = width;
            this.height = height;

            if (isCentered) {
                this.regX = this.width * 0.5;
                this.regY = this.height * 0.5;
            }

            this.position = position;

            this._showDefaultDropDownShape();
            this.addChild(this.shape);

            this._buildListButtons();
            this._collapseDropDown();

            this.on("mouseover", this._expandDropDown);
            this.on("mouseout", this._collapseDropDown);
        }

        // PRIVATE METHODS
        private _showDefaultDropDownShape():void
        {
            this.shape.graphics.clear();
            this.shape.graphics.setStrokeStyle(1);
            this.shape.graphics.beginStroke(this.borderColour.hex);
            this.shape.graphics.beginFill(this.defaultBackColour.hex);
            this.shape.graphics.drawRect(0, 0, this.width, this.height);
            this.shape.graphics.endFill();
        }

        private _showExpandedDropDownShape():void
        {
            this.shape.graphics.clear();
            this.shape.graphics.setStrokeStyle(1);
            this.shape.graphics.beginStroke(this.borderColour.hex);
            this.shape.graphics.beginFill(this.defaultBackColour.hex);
            this.shape.graphics.drawRect(0, 0, this.width, this.height * this.itemList.length);
            this.shape.graphics.endFill();
        }

        private _buildListButtons():void
        {
            this.itemList.unshift(' ');
            this.itemSelected = 0;

            this._buttonList = new Array<objects.Button>();

            for (let itemIndex = 0; itemIndex < this.itemList.length; itemIndex++) {

                let itemPosition = new objects.Vector2(1, 1 + (this.height * itemIndex));
                let itemButton = new objects.Button(this.itemList[itemIndex], this.defaultLabelColour, this.mouseOverLabelColour,
                    this.width - 2, this.height - 2, this.defaultBackColour.hex, this.mouseOverBackColour.hex, this.defaultBackColour.hex, itemPosition, false);

                itemButton.label.isCentered = false;
                itemButton.label.x = itemButton.width * 0.1;
                itemButton.label.y = itemButton.height * 0.25;

                itemButton.on("click", ()=>{
                    this.itemSelected = itemIndex;
                    this._collapseDropDown();

                    this.dispatchEvent("change");
                });

                this.addChild(itemButton);
                this._buttonList.push(itemButton);
            }
        }

        private _collapseDropDown():void
        {
            this._showDefaultDropDownShape();

            for (let buttonIndex = 0; buttonIndex < this._buttonList.length; buttonIndex++) {

                if(buttonIndex != this.itemSelected)
                {
                    this._buttonList[buttonIndex].Hide();
                }
            }

            this._buttonList[this.itemSelected].position.y = 1;
        }

        private _expandDropDown():void
        {
            //this.parent.removeChild(this);
            this.parent.addChild(this);
            this._showExpandedDropDownShape();

            for (let buttonIndex = 0; buttonIndex < this._buttonList.length; buttonIndex++) {
                this._buttonList[buttonIndex].position.y = 1 + (buttonIndex * this.height);
                this._buttonList[buttonIndex].Show();
            }
        }


        // PUBLIC METHODS

        public Update():void
        {

        }

    }
}
