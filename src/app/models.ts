export class Book {
    name: string
    subject: string
    authorID: string
    available: boolean
    availableDate: Date
}

export class User {
    id: string
    name: string
    email: string
    accountRole: string
    password: string
    token: string
}

// TODO semicolon is missing after every field. Also Move this to a folder Models and keep related models inside separate model files
