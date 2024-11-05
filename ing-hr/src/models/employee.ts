export interface Employee {
    id: string
    firstName: string
    lastName: string
    dateOfEmployment: string
    dateOfBirth: string
    phone: string
    email: string
    department: 'Analytics' | 'Tech'
    position: 'Junior' | 'Medior' | 'Senior'
}