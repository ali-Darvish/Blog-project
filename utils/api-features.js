class apiFeatures {
  modelQuery;
  filter;
  sortKeys;
  page;
  limit;
  searchTitle;
  queryFields;
  constructor(
    modelQuery,
    { filter, sort, page = 1, limit = 10, search, ...fields }
  ) {
    this.modelQuery = modelQuery;
    this.filter = filter;
    this.sortKeys = sort;
    this.page = page;
    this.limit = limit;
    this.fields = fields;
    this.searchTitle = search;
  }

  sort() {
    if (!!this.sortKeys) {
      const keys = this.sortKeys.split(",").join(" ");
      this.modelQuery = this.modelQuery.sort(keys);
    } else {
      this.modelQuery = this.modelQuery.sort("-createdAt");
    }
    return this;
  }

  paginate() {
    const offset = (Number(this.page) - 1) * Number(this.limit);
    this.modelQuery = this.modelQuery.limit(this.limit).skip(offset);
    return this;
  }

  search() {
    if (!!this.searchTitle) {
      this.modelQuery = this.modelQuery.find({
        title: { $regex: this.searchTitle, $options: "i" },
      });
    }
    return this;
  }
}

module.exports = { apiFeatures };
