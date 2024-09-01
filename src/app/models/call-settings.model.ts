export class CallSettings {
    id: number;
    timeWindow: string;
    timesPerDay: number;
    timesPerWeek: number;
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
    active: boolean;
  
    constructor(
      id: number,
      timeWindow: string,
      timesPerDay: number,
      timesPerWeek: number,
      monday: boolean,
      tuesday: boolean,
      wednesday: boolean,
      thursday: boolean,
      friday: boolean,
      saturday: boolean,
      sunday: boolean,
      active: boolean
    ) {
      this.id = id;
      this.timeWindow = timeWindow;
      this.timesPerDay = timesPerDay;
      this.timesPerWeek = timesPerWeek;
      this.monday = monday;
      this.tuesday = tuesday;
      this.wednesday = wednesday;
      this.thursday = thursday;
      this.friday = friday;
      this.saturday = saturday;
      this.sunday = sunday;
      this.active = active;
    }
  }