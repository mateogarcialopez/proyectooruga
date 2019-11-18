import { Pipe, PipeTransform } from '@angular/core';
@Pipe({

    name: 'FilterPipe',

})

/* {{ item.algo | FilterPipe:searchtext }}*/
export class FilterPipe implements PipeTransform {
    //pasa un string al estilo 'a.b.c' a un json al ejemplo  json={a:{b :c}}
    transform(items: any[], filter: any): any {
        if(filter){
            filter=filter.toLowerCase();
        }
        if (!items || !filter) {
           return items;
        }


        return items.filter((elemento)=>{
            console.log("ke");
            return  elemento.toLowerCase().search(filter)!=-1;
        })
        // filter items array, items which match and return true will be

        // kept, false will be filtered out

  
  }
}