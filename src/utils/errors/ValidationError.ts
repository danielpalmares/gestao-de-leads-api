interface ValidationErrorIssues {
  field: string
  message: string
}

export class ValidationError extends Error {
  public statusCode = 422
  public issues: ValidationErrorIssues[]

  constructor(issues: ValidationErrorIssues[]) {
    super('Validation Error')
    this.issues = issues
  }
}
