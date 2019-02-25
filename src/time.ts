export class HoursMinutes {
    hours: Number
    minutes: Number
    constructor(hours, minutes) {
        this.hours = hours
        this.minutes = minutes
    }
    hasPassed(hm: HoursMinutes) {
        if (hm.hours > this.hours) {
            return true
        }
        else if (hm.hours == this.hours && hm.minutes >= this.minutes) {
            return true
        }
        return false
    }
    toString(): string {
        return this.hours + ":" + this.minutes
    }
}

export function stringToHoursMinutes(str: string) {
    if (str.length != 4) {
        return null
    }
    if (!(/^\+?\d+$/.test(str))) {
        return null
    }

    let hours: Number = Number(str.substring(0, 2).replace(/^0+/, ''))
    let minutes: Number = Number(str.substring(2, 4).replace(/^0+/, ''))
    
    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
        return null
    }

    return new HoursMinutes(hours, minutes)
}