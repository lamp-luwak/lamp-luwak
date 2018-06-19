

export class Account {

  @mut token;
  @mut loading;

  async load() {
    this.loading = true;
    const data = await fetch('/account/token');
    this.loading = false;
    this.token = data.token;
  }

}
