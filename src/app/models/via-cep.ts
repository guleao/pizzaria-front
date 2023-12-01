import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";

export class ViaCep {

    constructor() { }

    http = inject(HttpClient)

    getCepData(cep: string) {
        return this.http.get(`https://viacep.com.br/ws/${cep}/json/`);
    }
}
