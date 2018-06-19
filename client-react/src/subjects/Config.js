
export class Config {

  get(key) {
    switch(key) {
      case 'api-host':
        return 'http://localhost:8080'
      default:
    }
  }

}
