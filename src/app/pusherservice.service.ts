import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';
@Injectable({
  providedIn: 'root'
})
export class PusherserviceService {
  private pusher: Pusher;


  constructor() {
    this.pusher = new Pusher('58971535abaec16e7301', {
      cluster: 'us3',
      forceTLS: true
    });

    this.pusher.subscribe('genero-channel');
  }

  subscribeToGeneroUpdatedEvent(callback: (data: any) => void): void {
    const channel = this.pusher.subscribe('genero-channel');
    channel.bind('GeneroActualizado', callback);
  }

  subscribeToJoinGame(callback: (data: any) => void): void {
    const channel = this.pusher.subscribe('genero-channel');
    channel.bind('Partidainicio', callback);
  }
  finPartida(callback: (data: any) => void): void {
    const channel = this.pusher.subscribe('genero-channel');
    channel.bind('GeneroActualizado', callback);
  }

  marcador(callback: (data: any) => void): void {
    const channel = this.pusher.subscribe('genero-channel');
    channel.bind('marcador', callback);
  }
  
  onShotReceived(callback: (data: any) => void): void {
    const channel = this.pusher.subscribe('genero-channel');
    channel.bind('casilla', callback);
  }

  unsuscribe(channel: string): void {
    this.pusher.unsubscribe(channel);
  }
}
