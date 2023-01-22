const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WebConfigSchema = new Schema({
  name: { type: String, required: true },
  domain: { type: String, required: true },
  entryUrl: { type: String, required: true },
  hasPagination: { type: Boolean, default: true },
  hasForeignLanguage: { type: Boolean, default: true },
  requireClickNextPage: { type: Boolean, default: false },
  paginationType: { type: String, default: "queryString" },
  pagination: [
    {
      paginationTypeName: { type: String },
      paginationTypeComponents: [
        {
          paginationTypeComponentName: { type: String },
          paginationTypeComponentString: { type: String },
        },
      ],
    },
  ],
  selectors: {
    getSection: { type: String },
    getHref: { type: String },
    getDate: { type: String },
    getTitle: { type: String },
  },
  selectorAttributes: {
    getHref: { type: String },
    getDate: { type: String },
    getTitle: { type: String },
  },
  exclusionTypeList: { type: [String] },
  exclusionSelectors: [
    {
      exclusionTypeName: { type: String },
      exclustionTypeSelector: { type: String },
    },
  ],

  exclusionSelectorAttributes: [
    {
      exclusionTypeName: { type: String },
      exclustionTypeAttribute: { type: String },
    },
  ],
  exclusionCriteria: [
    {
      exclusionTypeName: { type: String },
      exclusionTypeCriteria: { type: [String] },
    },
  ],
  requireSiteSpecificOperations: { type: Boolean, default: true },
});

module.exports = mongoose.model("WebConfig", WebConfigSchema);