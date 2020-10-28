export class Menu {
  constructor(public _id:number,public menu_name: string,public arabic_name:string,public image: string, public status: string) {
    this._id = _id;
    this.menu_name = menu_name;
    this.arabic_name = arabic_name;
    this.image = image;
    this.status = status;
  }
}
