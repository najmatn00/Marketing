import moment from 'jalali-moment'
import DateObject from 'react-date-object'

export const genderConvertor = (gender?: string) => {
    switch (gender) {
        case 'MALE':
            return 'مرد'
        case 'FEMALE':
            return 'زن'
        case 'NOT_SPECIFIED':
            return 'تعیین نشده'
        default:
            return 'نامشخص'
    }
}

// Date Format To Jalali

export const formateDateToJalali = (date: string) => {
    const jalaliDate = date ? moment(date).locale('fa').format('jYYYY/jMM/jDD') : null
    return jalaliDate
}

// Date Format to Gregorian
export const formateStringDateToGregorian = (selectedDate: string) => {
    const gregorianDate = moment.from(selectedDate, 'fa', 'YYYY/MM/DD').format('YYYY-MM-DD')
    return gregorianDate
}

// Time Format To Jalali

export const formateTimeToJalali = (time: string) => {
    const jalaliDate = time ? moment(time).locale('fa').format('HH:mm:ss - jYYYY/jMM/jDD') : null
    return jalaliDate
}

// Convert Seconds to Time

export const formateSecondsToTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}:${minutes.toString().padStart(2, '0')}`
}

// Format date object to gregorian date
export const formateDateToGregorian = (selectedDate: unknown) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const gregorianDate = new DateObject(selectedDate as any)
        // @ts-expect-error - DateObject convert method exists at runtime but not in types
        .convert('gregorian')
        .toDate()
    const formattedDate = `${gregorianDate.getFullYear()}-${(gregorianDate.getMonth() + 1).toString().padStart(2, '0')}-${gregorianDate.getDate().toString().padStart(2, '0')}`
    return formattedDate
}

// Get current time in HH:MM:SS format

export function getCurrentTime(): string {
    const now = new Date()

    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')

    const formattedDateTime = `${hours}:${minutes}:${seconds}`
    return formattedDateTime
}

// Calculate time difference

export function calculateTimeDifference(targetTime: string): string {
    const now = new Date()

    const [targetHours, targetMinutes, targetSeconds] = targetTime.split(':').map(Number)

    const targetDate = new Date()
    targetDate.setHours(targetHours, targetMinutes, targetSeconds)

    targetDate.setMinutes(targetDate.getMinutes() + 2)

    const timeDifferenceInSeconds = Math.floor((targetDate.getTime() - now.getTime()) / 1000)

    if (timeDifferenceInSeconds <= 0) {
        return '00:00'
    }

    const minutes = Math.floor(timeDifferenceInSeconds / 60)
    const seconds = timeDifferenceInSeconds % 60

    const formattedMinutes = minutes.toString().padStart(2, '0')
    const formattedSeconds = seconds.toString().padStart(2, '0')

    return `${formattedMinutes}:${formattedSeconds}`
}

// Date Format to Fa

export const formateDate = (date: string) => {
    const jalaliDate = moment(date).locale('fa').format('jYYYY/jMM/jDD')
    return jalaliDate
}

// Convert date to age

export function convertDateToAge(birthDate: string): number | string {
    const format = 'YYYY-MM-DD'
    const birthMoment = moment(birthDate, format)

    if (!birthMoment.isValid()) {
        return "Invalid date format. Please use 'YYYY-MM-DD'."
    }

    const today = moment().format('jYYYY/jMM/jDD')
    const todayMoment = moment(today, 'jYYYY/jMM/jDD')

    const yearsDifference = todayMoment.jYear() - birthMoment.jYear()

    if (
        todayMoment.jMonth() < birthMoment.jMonth() ||
        (todayMoment.jMonth() === birthMoment.jMonth() && todayMoment.jDate() < birthMoment.jDate())
    ) {
        return yearsDifference - 1
    }

    return yearsDifference
}

// Convert Persian Digits To English

export function convertPersianDigitsToEnglish(num: string | number | null | undefined): string | null {
    const id: Record<string, string> = {
        '۰': '0',
        '۱': '1',
        '۲': '2',
        '۳': '3',
        '۴': '4',
        '۵': '5',
        '۶': '6',
        '۷': '7',
        '۸': '8',
        '۹': '9',
    }
    return num
        ? num.toString().replace(/[^0-9.]/g, function (w) {
              return id[w] || w
          })
        : null
}

export function diff(prev: Record<string, unknown>, next: Record<string, unknown>): Record<string, unknown> {
    const result: Record<string, unknown> = {}

    for (const key in next) {
        const oldVal = prev[key]
        const newVal = next[key]

        if (oldVal instanceof Date && newVal instanceof Date) {
            if (oldVal.getTime() !== newVal.getTime()) {
                result[key] = newVal
            }
            continue
        }

        if (oldVal !== newVal) {
            result[key] = newVal === '' ? undefined : newVal
        }
    }

    return result
}

export function toPercent(value: string): number {
    return Math.round(Number(value) * 100)
}

export const persianDays = {
    0: 'یکشنبه',
    1: 'دوشنبه',
    2: 'سه‌شنبه',
    3: 'چهارشنبه',
    4: 'پنجشنبه',
    5: 'جمعه',
    6: 'شنبه',
}

export function getPersianDate(date: Date) {
    const persianDate = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(date)

    return persianDate
}

export function scrollToTop(behavior: ScrollBehavior = 'smooth'): void {
    window.scrollTo({
        top: 0,
        behavior,
    })
}
