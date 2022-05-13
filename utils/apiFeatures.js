class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  sort() {
    if (this.queryString) {
      const sortBy = this.queryString.sorts.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = -this.query.sort('email');
    }
    return this;
  }
}
module.exports = APIFeatures;
