import { Component, AfterViewInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { HubConnection } from "@aspnet/signalr";
// import 'rxjs/add/operator/map';
import { map, tap, catchError, flatMap } from "rxjs/operators";
import { Observable, Subject, pipe } from "rxjs";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements AfterViewInit {
  title = "app";
  baseUrl = "http://localhost:50809";
  connection: HubConnection;
  constructor(private http: HttpClient) {
    let url = this.baseUrl + "/signalR";
    let token = localStorage.getItem("auth_token");
    url += "?token=" + token;
    this.connection = new HubConnection(url);
  }
  ngAfterViewInit() {
    this.login("User", "Password123!").subscribe(
      a => {
        localStorage.setItem("auth_token", a.toString());
        this.getUserName().subscribe(x => x);
      },
      err => {
        console.log(err);
      }
    );

    this.connection.start();
  }

  getValues() {
    let headers = new HttpHeaders();
    const authToken = localStorage.getItem("auth_token");
    headers = headers.set("Authorization", `Bearer ${authToken}`);
    return this.http.get(this.baseUrl + "/api/values", { headers });
  }

  getUserName() {
    let headers = new HttpHeaders();
    const authToken = localStorage.getItem("auth_token");
    headers = headers.set("Authorization", `Bearer ${authToken}`);
    return this.http.get(this.baseUrl + "/api/values/getUserName", { headers });
  }

  login(userName, password) {
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json");

    return this.http
      .post(
        this.baseUrl + "/Account/LoginUser",
        JSON.stringify({ userName, password }),
        { headers: headers, responseType: "text" }
      )
      .pipe(map(res => res));
  }
}
