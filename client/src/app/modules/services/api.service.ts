import { Injectable } from '@angular/core';
import { Menu } from '../../models/menu.model';
import { EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from '../../shared/constant';

@Injectable()

export class ApiService{

    menuChanged = new EventEmitter<Menu[]>();
    constructor(private http: HttpClient) { }

    public getData(route) {
        return new Promise((resolve, reject) => {
         this.http.get(`${SERVER_URL+route}`).subscribe(
            (data: any) => {
              return resolve(data);
            },
            (err: any) => {
              reject(err)
            }
          )
        })
    }
    
    public onAddImage(data,route) {
    return new Promise((resolve, reject) => {
        this.http.post(`${SERVER_URL+route}`, data)
        .subscribe(
            (res:any)=>{
                return resolve(res.key);
            },
            (err:any)=>{
                reject(err);
            });
        });
    }

    public onAddData(data:any,route){
        return new Promise((resolve, reject) => {
        this.http.post(`${SERVER_URL+route}`,data).subscribe(
            (res: any) => {
                resolve(res);
            },
            (err: any) => {
                reject(err);
            }
          );
        }); 
    }
    
    public removeData(data:any,route) {
        return new Promise((resolve, reject) => {
            this.http.delete(`${SERVER_URL+route}`,data).subscribe(
                (res: any) => {
                    resolve(res);
                },
                (err: any) => {
                    reject(err);
                }
              );
            });
    }
    
    public getDataById(id:any,route) {
        return new Promise((resolve, reject) => {
            this.http.get(`${SERVER_URL+route+id}`).subscribe(
            (res:any) => {
              return resolve(res);
            },
            (err:any) => {
              reject(err);
            }
          )
        })
    }
    
    public onEditData(data,route) {
        return new Promise((resolve, reject) => {
            this.http.put(`${SERVER_URL+route}`,data).subscribe(
            (res:any) => {
              return resolve(res);
            },
            (err:any) => {
              reject(err);
            }
          )
        })
    }
};