import { Component, HostListener, PLATFORM_ID, Inject, AfterViewInit, ChangeDetectorRef, OnInit } from '@angular/core';
import { Partida } from '../../models/partida.models';
import { todasLasCiudades, Ciudad } from '../../models/ciudad.models';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { Personaje, listaPersonas } from '../../models/personaje.model';
import { Enfermedad, listEnfermedades } from '../../models/enfermedad.models';
import { SavePartidaService } from '../../services/save-partida.service';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-partida',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './partida.component.html',
  styleUrls: ['./partida.component.css']
})
export class PartidaComponent implements AfterViewInit {
  
  partida: Partida = new Partida(0, 4, todasLasCiudades, listEnfermedades, listaPersonas);
  scalingFactorX: number = 1;
  scalingFactorY: number = 1;
  originalWidth = 850;  
  originalHeight = 1550; 
  ciudadSeleccionada: Ciudad = {} as Ciudad;
  listPersonajes:Personaje[] = listaPersonas;
  personajeSeleccionado:Personaje = {} as Personaje;
  ciudadPersonajeSeleccionado:Ciudad = {} as Ciudad;
  zoomLevel: number = 1;       
  offsetX: number = 0;         
  offsetY: number = 0;         
  isPanning: boolean = false;  
  startX: number = 0;          
  startY: number = 0; 
  // variable necesaria para dispositivos moviles
  initialDistance: number = 0;
  isBrowser: boolean;
  showCharacterActionUI:boolean = false;
  showCiudadesMasInfectadas:boolean = false;
  // para no cargar mas veces 
  cargado:boolean = false;
  //desplegable de las opciones
  opcionesDesp:boolean = false;
  


  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdRef: ChangeDetectorRef, private savePartidaService:SavePartidaService, private authService:AuthServiceService, private router:Router
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  
  // se calcula el tamaño de pantalla para posicionar las ciudades
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.calculateScalingFactors();
      this.cdRef.detectChanges();  
    }, 50);
    if(this.authService.userIsAuthenticated()){
      this.router.navigate(['login']);
    }  
  }


  // guardar partida nueva en bd, añadir funcionalidad con ID de partida y partida interface para que funcione con 
  // partidas existentes 
  guardarPartida(){
    if(this.partida.id === 0){
      this.savePartidaService.guardarPartida(this.partida)
    }
  }
  
  
  // ordenador
  @HostListener('window:resize', ['$event'])
  onResize() {
    // Recalcular los factores de escalado cuando se redimensiona la ventana
    this.calculateScalingFactors();
  }


  // formatear ciudades
  calculateScalingFactors(): void {
    if (this.isBrowser) {
      const container = document.querySelector('.map-container');
      if (container) {
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        // Calcular los factores de escalado
        this.scalingFactorX = containerWidth / this.originalWidth;
        this.scalingFactorY = containerHeight / this.originalHeight;
        console.log("Container Width:", containerWidth);
        console.log("Container Height:", containerHeight);
        console.log("Scaling Factor X:", this.scalingFactorX);
        console.log("Scaling Factor Y:", this.scalingFactorY);
      }
    }
  }
  // mostrar ui y seleccionar personaje
  selectChar(char:Personaje, c:Ciudad){
    this.personajeSeleccionado = char;
    this.ciudadPersonajeSeleccionado = c;
    this.showCharacterActionUI=true;
  }
  // cerrar ui 
  closeUI(){
    this.showCharacterActionUI=false;
  }
  // mostrar menu
  mostrarCiudadesMasInfectadas(){
    this.showCiudadesMasInfectadas=true;
  }
  // ocultar menu
  cerrarCiudadesMasInfectadas(){
    this.showCiudadesMasInfectadas=false;
  }

  getEnfermedadByName(name:string):Enfermedad|undefined{
    let enfermedad:Enfermedad|undefined =  this.partida.listEnfermedades.find(enf=>enf.name===name);
    return enfermedad;
  }



  getCiudad(nombre: string): Ciudad | undefined {
    return this.partida.listCiudades.find(c => c.nombre === nombre);
  }

// usabilidad
  showData(ciudad: Ciudad) {
    this.ciudadSeleccionada = ciudad;
  }
// usabilidad
  onZoom(event: WheelEvent) {
    event.preventDefault();  
    this.zoomLevel += event.deltaY * -0.001;  
    this.zoomLevel = Math.min(Math.max(this.zoomLevel, 0.5), 3); 
  }
  // usabilidad
  onMouseDown(event: MouseEvent) {
    this.isPanning = true;
    if(this.isPanning){
      document.body.style.cursor = "grab";
    }
    this.startX = event.clientX - this.offsetX;
    this.startY = event.clientY - this.offsetY;

  }
  // usabilidad
  onMouseMove(event: MouseEvent) {
    if (this.isPanning) {
      this.offsetX = event.clientX - this.startX;
      this.offsetY = event.clientY - this.startY;
    }
  }
  // usabilidad
  onMouseUp() {
    this.isPanning = false;
    if(!this.isPanning){
      document.body.style.cursor = "default";
    }
  }
  


  
  // metodos para dispositivos moviles : 
  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    if (event.touches.length === 1) {
      // Un solo toque: iniciamos el desplazamiento
      this.isPanning = true;
      this.startX = event.touches[0].clientX - this.offsetX;
      this.startY = event.touches[0].clientY - this.offsetY;
    } else if (event.touches.length === 2) {
      // Dos toques: iniciar zoom por pellizco
      this.isPanning = false;
      this.initialDistance = this.getDistance(event.touches[0], event.touches[1]);
    }
  }


  // movil
  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    event.preventDefault();
    if (this.isPanning && event.touches.length === 1) {
      // Desplazamiento con un solo toque
      this.offsetX = event.touches[0].clientX - this.startX;
      this.offsetY = event.touches[0].clientY - this.startY;
    } else if (event.touches.length === 2) {
      // Zoom por pellizco con dos toques
      const currentDistance = this.getDistance(event.touches[0], event.touches[1]);
      const scaleChange = currentDistance / this.initialDistance;
      this.zoomLevel = Math.min(Math.max(this.zoomLevel * scaleChange, 0.5), 3);
      this.initialDistance = currentDistance;
    }
  }

  // movil
  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    if (event.touches.length < 2) {
      this.isPanning = false;
    }
  }

  // Calcular la distancia entre dos puntos táctiles para el pellizco
  private getDistance(touch1: Touch, touch2: Touch): number {
    const dx = touch2.clientX - touch1.clientX;
    const dy = touch2.clientY - touch1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  desplegarOpciones(){
    this.opcionesDesp = !this.opcionesDesp;
  }
}

