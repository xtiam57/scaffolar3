export const AppSettings = {
  /**
   * App API environments settings
   * NOTE: DO NOT TOUCH THIS IN RUN TIME
   */
  environment: 'test',
  /**
   * App basic information
   */
  name: 'Scaffolar 3',
  version: '0.0.0',
  /**
   * Last update information
   */
  day: 30,
  month: 11,
  year: 2018,
  /**
   * Environments
   * NOTE: DO NOT TOUCH THIS IN RUN TIME
   */
  apis: {
    test: {
      protocol: 'http',
      host: 'api.plos.org',
      port: null,
      prefix: null,
      version: null
    }
  },

  /**
   * Returns the last update
   * @return A javascript Date
   */
  get lastUpdate() {
    return new Date(this.year, this.month - 1, this.day);
  },
  /**
   * Returns the URL given an environment
   * @return A string with the API URL
   */
  get api() {
    let { protocol, host, port, prefix, version } = this.apis[this.environment];

    // Defaults
    protocol = `${protocol ? protocol : 'http'}://`;
    host = host ? host : 'api.plos.org';
    port = port ? `:${port}` : '';
    prefix = prefix ? `${prefix}/` : '';
    version = version ? `${version}/` : '';

    return `${protocol}${host}${port}/${prefix}${version}`;
  }
};
