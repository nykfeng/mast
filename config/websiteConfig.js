[
  {
    websiteName: "prnewswire",
    websiteEntryUrl:
      "https://www.prnewswire.com/news-releases/financial-services-latest-news/acquisitions-mergers-and-takeovers-list/",
    hasPagination: true,
    hasForeignLanguage: true,
    requireClickNextPage: false,
    pagination: {
      baseUrl:
        "https://www.prnewswire.com/news-releases/financial-services-latest-news/acquisitions-mergers-and-takeovers-list/",
      queryString: "page=",
      queryStringSize: "pagesize=",
    },
    selectors: {
      getSection: ".arabiclistingcards",
      getHref: "a.newsreleaseconsolidatelink",
      getDate: ".card h3 small",
      getTitle: ".card h3",
    },
    requireSiteSpecificOperations: true,
  },
  {
    websiteName: "businesswire",
    websiteEntryUrl:
      "https://www.businesswire.com/portal/site/home/news/subject/?vnsId=31333",
    hasPagination: false,
    hasForeignLanguage: true,
    requireClickNextPage: true,
    pagination: "",
    selectors: {
      getSection: ".bwNewsList li",
      getHref: "a.bwTitleLink",
      getDate: ".bwTimestamp [datetime]",
      getTitle: ".bwTitleLink [itemprop=headline]",
    },
    requireSiteSpecificOperations: true,
  },
  {
    websiteName: "globenewswire",
    websiteEntryUrl: "https://www.globenewswire.com/en/search/subject/MNA",
    hasPagination: true,
    hasForeignLanguage: true,
    requireClickNextPage: false,
    pagination: {
      baseUrl: "https://www.globenewswire.com/en/search/subject/MNA",
      queryStringPage: "page=",
      queryStringSize: "pageSize=",
    },
    selectors: {
      getSection: ".pagnition-row",
      getHref: "a[data-autid=article-url]",
      getDate: "[data-autid=article-published-date]",
      getTitle: ".pagging-list-item-text-container [data-autid=article-url]",
    },
    requireSiteSpecificOperations: true,
  },
  {
    websiteName: "seekingalpha",
    websiteEntryUrl: "https://seekingalpha.com/market-news/m-a",
    hasPagination: true,
    hasForeignLanguage: false,
    requireClickNextPage: false,
    pagination: {
      baseUrl: "https://seekingalpha.com/market-news/m-a",
      queryStringPage: "page=",
      queryStringSize: "",
    },
    selectors: {
      getSection:
        "[data-test-id=original-market-news-card] [data-test-id=post-list-item]",
      getHref: "a[data-test-id=post-list-item-title]",
      getDate: "[data-test-id=post-list-date]",
      getTitle: "[data-test-id=post-list-item-title]",
    },
    requireSiteSpecificOperations: true,
  },
];