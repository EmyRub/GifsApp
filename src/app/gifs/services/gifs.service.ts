import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  // 'root' lo vuelve global, no necesita importarse
  providedIn: 'root'
})
export class GifsService {

  // La clave de la API
  private apiKey: string = '8IX5gCUFDYSzWLr6TUxuIP7eS16lnAZh';
  // La URL de la API
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';

  private _historial: string[] = [];

  // TO DO: Cambiar any por su tipo correspondiente,
  // Almacena los últimos datos de la busqueda, tipo Gif viene de interface
  public resultados: Gif[] = [];

  // Getters métodos que permiten acceder al valor de un atributo
  // El nombre del método depende de cada programador.
  // El getter se llama historial y permite el acceso de _historial que es privado
  get historial() {
    // (...) Evita modificar el arreglo original
    return [...this._historial];
  }

  constructor(private http: HttpClient) {

    // Dos métodos para el localstorage

    // Si regresa null, retorna un arreglo vacío en caso de que el historial se borre del sistema, (!) pero también confia en mi
    this._historial = JSON.parse(localStorage.getItem('historial')!) || []

    // Parse, toma un objeto serializado y lo transforma a objeto literal o un arreglo o string o primitivo
    if (localStorage.getItem('resultados')) {
      // (!) confía en mi
      this.resultados = JSON.parse(localStorage.getItem('resultados')!);
    }

  }

  buscarGifs(query: string) {

    query = query.trim().toLowerCase();

    // verifica que en el arreglo no tenga repetidos
    if (!this._historial.includes(query)) {

      // Agrega la busqueda al inicio de la lista
      this._historial.unshift(query);

      // Corta la lista hasta 10 busquedas
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    // Permite construir parámetros, proviene de Angular
    // Serían los parámetros de postman
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

      // Trabaja con observables, tiene más control que las promesas,
      // además puede añadir funcionalidades a la hr de hacer la petición
      //<SearchGifsResponse> Hace referencia a la interface de interfaces
      // {params: params} se deja {params}
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, { params })
      .subscribe((resp) => {
        //console.log(resp.data);
        this.resultados = resp.data;

        // (localStorage) Proveniente del navegador web
        // Set item, nombre, value (solo acepta string)
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      })

  }
}
