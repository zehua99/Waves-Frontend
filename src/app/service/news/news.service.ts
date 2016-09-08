import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable }     from 'rxjs/Observable';

@Injectable()
export class NewsService {
    constructor (private http: Http) {}

    get (id: Number): Observable<{}> {
        return this.http.get('http://localhost:3080/news/' + id)
                        .map(this.extractData)
                        .catch(this.handleError);
    }

    add (url: string): Observable<{}> {
        let newsInfo = JSON.stringify({
            'url': url
        });
        let headers = new Headers({ 'Content-Type': 'text/plain' });
        let options = new RequestOptions({ headers: headers, withCredentials: true });

        return this.http.post('http://localhost:3080/user/login', newsInfo, options)
                        .map((res: Response) => {
                            return { data: this.extractData(res), status: res.status }
                        })
                        .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || { };
    }

    private handleError (error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
    // get(newsID: number): any {
    //     let returnNews: any = news[newsID];
    //     returnNews.time = returnNews.time.toLocaleString();
    //     return returnNews;
    // }
}
