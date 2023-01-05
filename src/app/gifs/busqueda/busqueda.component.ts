import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  //Puede buscar por directivas, clases, referencias
  // ElementRef es su tipo de dato
  // txtBuscar: marca error porque typeScript dice que puede que no exista el elemento, puede ser null o no estar inicializado
  // (!) non-null assertion operator para asegurar que el objeto no es nulo
  // Para quitar el génerico, se agrega <HTMLInputElement>
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  // Permite el uso de servicios
  constructor(private gifsService: GifsService) { }

  buscar() {
    // Obtiene el valor desde el ElementRef
    const valor = this.txtBuscar.nativeElement.value;

    // No agrega nada si el buscador esta en cero
    if (valor.trim().length === 0) {
      return;
    }

    // Almacena en el arreglo las busquedas
    this.gifsService.buscarGifs(valor);

    // Al presionar enter la búsqueda se borra en input
    this.txtBuscar.nativeElement.value = '';
  }
}
