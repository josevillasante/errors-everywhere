import { Component, EventEmitter, Input, Output, HostListener, ElementRef, Renderer2 } from '@angular/core'; // #.la libreria no tiene el @
import { ProcessData } from '../../models/process-data.interface';
import { MyServiceService } from '../../services/my-service.service';

@Component({
    selector: 'my-component',
    templateUrl: './my-component.component.html'
})
export class MyComponent {
    // @Input() label: number;
    @Input() set label(value: string) {
        if (value) {
            this.label = value;
        } else {
            this.label = 'Empty';
        }
    }
    @Output() onDelete: EventEmitter<string> = new EventEmitter<string>(); // 2.no se declaro correctamente

    id: string = "";
    someData: ProcessData[] = [];
    parsedData: ProcessData[] = [];
    border: string = ""; // #.falto declarar

    // indicamos el ambito privado del servicio
    constructor(private myService: MyServiceService, private renderer: Renderer2) {
        // #.removemos estas lineas hacia el setter del input
        /* if (this.label === '') {
            this.label = 'Empty';
        } */
        this.subscribeToData();
        // this.processData(this.someData); // #.quitamos esta linea porque no cargar de forma sincronica
    }

    private subscribeToData() {
        // #.se consulto la informacion de la funcion con parentesis
        this.myService.onSomeEvent().subscribe((data: ProcessData[]) => {
            this.someData = data;
            this.processData(this.someData); // #.agregamos esta linea para que pueda aplicar los cambios en la respuesta
        });
    }

    @HostListener('class')
    onMouseOver() {
        this.border = '5px solid green';
    }

    public processData(originalData: ProcessData[]) {
        let newData: ProcessData[] = []; // #.falta declarar correctamente
        originalData.forEach(oneData => {
          const oneDataChanged = oneData;

          // Le pongo 2 decimales unicamente
          oneDataChanged.quantity = parseFloat(oneData.quantity.toFixed(2));

          newData.push(oneData);
        });

        return newData;

    }

    // Suponemos que este metodo se ejecuta cuando en el html hacen click en un boton
    // cambiamos a la variable publica para que se pueda acceder desde el html
    // falta el tipado de datos
    public clickDeleteButton(id: string) {
        // this.onDelete = id; // no se emitio correctamente
        this.onDelete.emit(id);
    }

    updateIdWhenIsPossible(id: string) {
        if (this.id !== id) {
            this.id = id;
            this.notififyIdChanges(id)
        }
    }

    // falta colocar el tipado de dato
    notififyIdChanges(id: string) {
        console.log('Your ID has changed to: ' + id + '!');
    }

    changeColour(element: ElementRef, color: string) {
        // #.falta declarar la instancia en el constructor
        // #.el evento de este click podria cambiar una clase y que la clase tenga ya definida el estilo que le corresponde
        this.renderer.setStyle(element, 'color', color);
    }

}
