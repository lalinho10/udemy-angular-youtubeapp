import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class YoutubeService {
  private yotubeUrl = 'https://www.googleapis.com/youtube/v3'; // '/channels'; // '/playlists'; // '/playlistItems';
  private apiKey = 'AIzaSyCgHg52klBGxd8PPdgjy7Na9VBa49iuDXM';
  private playlistId = 'UUEuOwB9vSL1oPKGNdONB4ig';
  private nextPageToken = '';

  constructor( private http: HttpClient ) {}

  getChannel(): Observable<any> {
    const channelUrl = `${this.yotubeUrl}/channels`;

    return this.http.get( channelUrl );
  }

  getPlaylistItems( nextPageToken?: string ): Observable<any> {
    const playlistItemsUrl = `${ this.yotubeUrl }/playlistItems`;

    const getParams: any = {};

    getParams.part = 'snippet';
    getParams.maxResults = '10';
    getParams.playlistId = this.playlistId;
    getParams.key = this.apiKey;

    if ( nextPageToken ) {
      getParams.nextPageToken = nextPageToken;
    }

    return this.http.get( playlistItemsUrl, { params: getParams });
  }

}
