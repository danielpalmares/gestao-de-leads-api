import crypto from 'crypto'

export class Lead {
  public id?: string
  public name!: string
  public email!: string
  public phone_number!: string
  public role!: string
  public birth_date!: Date
  public message!: string

  constructor(props: Omit<Lead, 'id'>, id?: string) {
    Object.assign(this, props)

    this.id = id ? id : crypto.randomUUID()
  }
}
