export class Menu {
  constructor(public _id: number,public menuName: string,public fileUpload: string, public status: string) {
    this._id = _id;
    this.menuName = menuName;
    this.fileUpload = fileUpload;
    this.status = status;
  }
}
