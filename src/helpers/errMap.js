
module.exports = err => err['errors'] 
    ? err.errors.map(it => it.message)
    : [err]