export class Category {
    constructor(public _id:number,public english_name: string,public arabic_name:string,public image: string, public status: string) {
      this._id = _id;
      this.english_name = english_name;
      this.arabic_name = arabic_name;
      this.image = image;
      this.status = status;
    }
  }
  