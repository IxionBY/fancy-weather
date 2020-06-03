export function toDetermineSeason (month){
    switch (month) {
        case (12||1||2):
            return 'Winter';
        case (3||4||5):
            return 'Spring';
        case (9||10||11):
            return 'Autumn';
        case (6||7||8):
            return 'Summer';
    }
}

export function toDetermineDayPeriod (hours){
    switch (true) {
        case  (6 <= hours && hours <= 11):
            return 'Morning';
        case (12 <= hours && hours <= 17):
            return 'Midday';
        case (18 <= hours && hours <= 23):
            return 'Evening';
        case (0 <= hours && hours <= 5):
            return 'Night';
    }
}
