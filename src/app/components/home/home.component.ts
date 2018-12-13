import { Component, OnInit } from '@angular/core';

import { YoutubeService } from '../../services/youtube.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})

export class HomeComponent implements OnInit {
  videos = [];
  selVideo: any;
  nextPageToken: string;

  constructor( private youtubeService: YoutubeService ) {}

  ngOnInit() {
    this.youtubeService.getPlaylistItems().subscribe( response => {
      this.setTokenyVideos( response );
    });
  }

  cargarMas(): void {
    this.youtubeService.getPlaylistItems( this.nextPageToken ).subscribe( response => {
      this.setTokenyVideos( response );
    });
  }

  private setTokenyVideos( response: any ): void {
    this.nextPageToken = response.nextPageToken;

    for ( const item of response.items ) {
      const video = item.snippet;
      this.videos.push( video );
    }
  }

  verVideo( video: any ): void {
    this.selVideo = video;
  }

  cerrarModal(): void {
    $( '#videoModal' ).modal( 'hide' );
    this.selVideo = undefined;
  }

}
