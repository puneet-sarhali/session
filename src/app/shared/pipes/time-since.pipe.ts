import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeSince'
})
export class TimeSincePipe implements PipeTransform {

  transform(date: Date, ...args: unknown[]): String {
    const seconds = Math.floor((+new Date() - new Date(date).getTime()) / 1000);
    let intervalType;

    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      intervalType = 'y';
    } else {
      interval = Math.floor(seconds / 2592000);
      if (interval >= 1) {
        intervalType = 'm';
      } else {
        interval = Math.floor(seconds / 86400);
        if (interval >= 1) {
          intervalType = 'd';
        } else {
          interval = Math.floor(seconds / 3600);
          if (interval >= 1) {
            intervalType = "hr";
          } else {
            interval = Math.floor(seconds / 60);
            if (interval >= 1) {
              intervalType = "min";
            } else {
              interval = seconds;
              intervalType = "sec";
            }
          }
        }
      }
    }
    if (interval > 1 || interval === 0) {
      intervalType += 's';
    }
    return interval + ' ' + intervalType;
  }

}
