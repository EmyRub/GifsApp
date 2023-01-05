import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  // historial() es la propiedad de la clase del sidebarComponent,
  // es el nombre con el que se identifica en side html
  get historial() {
      // .historial hace referencia al get historial() de gifs.service
      // que a su vez tiene la data de _historial
    return this.gifsService.historial;
  }

  constructor(private gifsService: GifsService) { }

  // Rehace la busqueda desde las opciones del sidebar
  buscar(termino: string) {
    this.gifsService.buscarGifs(termino);
    //console.log(termino);
  }

}
