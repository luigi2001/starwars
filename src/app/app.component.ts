import { Component } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { map} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'starwars';
  personaggi: [] = []
  films: [] = []
  astronavi: [] = []
  birtday: [] = []
  next = 1
  boolnext1 = false
  boolnext2 = false
  personaggibool = false
  filmsbool = false
  astronavibool = false
  nome = ""

  constructor(private http: HttpClient){}

  Next(){
    this.next += 1
    this.personaggi = []
    this.Personaggi()
  }

  Next2(){
    this.next += 1
    this.astronavi = []
    this.Astronavi()
  }

  Cerca(){
    this.http
      .get("https://localhost:7119/api/Acquirentes/&" + this.nome)
      .pipe(map((response: [] ) => {
        return response
      }))
      .subscribe(resp => {
        this.birtday = resp
      },(err: HttpErrorResponse) => {
        if(err.status == 500){
          alert("il nome non esiste!!!")
        }
      })
  }

  Personaggi(){

    this.http
      .get("https://swapi.dev/api/people/?page=" + this.next)
      .pipe(map((response: [] ) => {
        return response
      }))
      .subscribe(resp => {
        this.personaggi = resp
        this.boolnext1 = true
      },(err: HttpErrorResponse) => {
        if(err.status == 404){
          this.boolnext1 = false
          this.next = 1
          this.personaggi = []
        }
      }
      )

      this.personaggibool = true
      this.filmsbool = false
      this.astronavibool = false
  }

  Film(){
    this.http
      .get("https://swapi.dev/api/films")
      .pipe(map((response: [] ) => {
        return response
      }))
      .subscribe(resp => {
        this.films = resp
      }
      )

      this.filmsbool = true
      this.personaggibool = false
      this.astronavibool = false
  }

  Astronavi(){
    this.http
      .get("https://swapi.dev/api/starships/?page="+ this.next)
      .pipe(map((response: [] ) => {
        return response
      }))
      .subscribe(resp => {
        this.astronavi = resp
        this.boolnext2 = true
      },(err: HttpErrorResponse) => {
        if(err.status == 404){
          this.boolnext2 = false
          this.next = 1
          this.astronavi = []
        }
      }
      )

      this.astronavibool = true
      this.filmsbool = false
      this.personaggibool = false
  }
}
