export class Book {
    id: number
    name: string
    subject: string
    authorId: number
    authorName: string
    available: boolean
    availableDate: Date
}

export class User {
    id: number
    name: string
    email: string
    accountRole: string
    password: string
    token: string
}

export class Author {
    id: number
    name: string
    dateOfBirth: string
}

export class Subject {
    id: number
    name: string
}