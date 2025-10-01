import crypto from 'crypto'

export class Lead {
  public id?: string
  public nome!: string
  public email!: string
  public telefone!: string
  public cargo!: string
  public dataDeNascimento!: Date
  public mensagem!: string

  constructor(props: Omit<Lead, 'id'>, id?: string) {
    Object.assign(this, props)

    this.id = id ? id : crypto.randomUUID()
  }
}
