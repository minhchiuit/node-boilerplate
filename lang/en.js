const transValidations = {
  password_incorrect:
    'Password must contain at least 1 letter and 1 number, and at least 6 or more characters',
  email_incorrect: 'Please fill a valid email address',
  objectId_type_incorrect: 'Please fill a valid mongoose object id',
  upload_issue: 'Issue with uploading this image.',
  upload_not_supported: 'This file is not supported.',
  upload_limit_size: 'This file is too large (Max: 1MB ).',
}

export { transValidations }
