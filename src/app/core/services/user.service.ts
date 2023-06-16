import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { UserModel } from 'src/app/private/models/user.model';
import { UserListInfo } from 'src/app/private/components/user-table/user-table.component';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly apiUrl = 'https://localhost:7141/api/user';
  constructor(private http: HttpClient) {}
  createUser(data:any){
    return this.http.post<string>(this.apiUrl+'/createUser',data);
  }
  loginUser(email:string){
    return this.http.get<string>(this.apiUrl+`/loginUser?email=${email}`);
  }
  getUserDetails(userId:string){
    return this.http.get<any>(this.apiUrl+`/userDetail?userId=${userId}`);
  }
  getFavoriteProducts(userId:string){
    return this.http.get<any>(this.apiUrl+`/favorites?userId=${userId}`);
  }
  addFavoriteProduct(userId:string,productId:number){
    return this.http.post<any>(this.apiUrl+`/addFavorite?userId=${userId}&productId=${productId}`,null);
  }
  removeFavoriteProduct(userId:string,productId:number){
    return this.http.delete<any>(this.apiUrl+`/removeFavorite?userId=${userId}&productId=${productId}` ,{observe:'response'});
  }
  updateUserDetails(userId:string,productId:number){
    return this.http.post<any>(this.apiUrl+`/update-user-details?userId=${userId}&productId=${productId}`,null);
  }
  getUserList(){
    return this.http.get<UserListInfo[]>(this.apiUrl+`/userList`);
  }

}
