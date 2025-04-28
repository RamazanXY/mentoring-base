import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'phoneNumber',
    standalone: true,
    pure: true
})

export class PhoneNumberPipe implements PipeTransform {
    transform(value: string) {
        if(!value) return value;
        return value.replace(/-/g, '');
    }

}