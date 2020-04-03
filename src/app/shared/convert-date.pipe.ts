import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'convertdate'
})
export class ConvertDatePipe extends DatePipe implements PipeTransform {
    transform(value: string): string {
        return super.transform(value, 'yyyy-MM-dd');
    }
}
