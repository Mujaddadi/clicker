import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';


import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()

export class HttpService {

    constructor(private http: Http) {} // Instantiate the Http service


// Fucntion to get the data

    getData(_productUrl: string) {

    console.log(_productUrl);
              console.log("Running get Data Service");
        return this.http.get(_productUrl).map((res: Response) => res.json());
    }


 // Function to insert the data

    setData(_productUrl: string , newObject: Object) {
    
        console.log("Running set Data Service");

        
    console.log(_productUrl);

        let headers = new Headers({'Content-Type': 'application/json'});  // ... Set content type to JSON    
        let options       = new RequestOptions({ headers: headers });     // Create a request option

        let objectString = JSON.stringify(newObject); // Stringify payload

        return this.http.post(_productUrl, objectString, options).map((res: Response) => res.json());
    }



// Function to update the data

    updateData(_productUrl: string, updateobject: Object ) {

            console.log("Running update Data Service");
   // console.log("The product URL received is " + _productUrl);

        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option

        let objectString = JSON.stringify(updateobject); // Stringify payload

    return this.http.put(_productUrl, objectString, options).map((res: Response) => res.json());
}

}
