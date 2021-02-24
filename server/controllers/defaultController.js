const axios = require("axios");
const admin = require("firebase-admin");
const uniqid = require("uniqid");
const {parseDomain, fromUrl} = require("parse-domain")
const schedule = require('node-schedule');

var serviceAccount = require("../lib/serviceAccountKey.json");


exports.addWebsitesToDB = async (req, res) => {
  console.log('adding website');
  const result = {};
  result.status = 200;
  let db = admin.firestore();

  const siteURL = req.body.siteURL;
  const userObj = req.body.user;

  console.log(siteURL)

  const {domain, topLevelDomains} = parseDomain(
    fromUrl(siteURL),
  );

  let domainURL = domain + '.' + topLevelDomains;
  domainURL = domainURL.replace(/,/g, '.')
  let websiteRef = db.collection("websites").doc(domainURL);

  try {
    let setWebsites = websiteRef.set({
        adminID: userObj.uid,
        website_url: siteURL,
        domain: domainURL,
        crawler_frequencies:
         { internal_link_graph_calculation_frequency: 1,
           custom_pages_to_crawl: null,
           internal_html_crawling_frequency: 1 },
        data_checks:
         { is_raw_google_search_console_data_populated: false,
           is_html_differences_data_available: false,
           is_crawled_raw_html_data_in_gsc: false,
           is_raw_google_analytics_data_populated: false,
           is_structured_markup_data_extracted: false,
           are_domains_same_on_google_search_console_and_google_analytics: false },
        raw_data_locations:
         { raw_google_analytics_data_gsc_uri: {},
           raw_google_search_console_data_gcs_uri: {},
           raw_html_daily_data_gsc_uri: {}},
        html_extractor_data_locations:
         { keywords_entities_text_gsc_uri: {},
           html_differences_gsc_uri: {},
           html_features_gsc_uri: {},
           structured_data_gsc_uri: {},
           internal_link_graph_gcs_uri: {},
           content_quality_gsc_uri: {} 
          },
        google_analytics_details: 
        { 
          ga_account_id: '', 
          ga_property_id: '', 
          ga_view_id: '',
          ga_account_name: '', 
          ga_view_name: '', 
          ga_property_name: ''
        },
        conditions:
         { competitor_domains: null,
           is_competitor_html_serp_scraping_activated: false },
        feature_dates_data: { latest_html_differences_date_firebase: null },
        raw_dates_data:
         { latest_google_search_console_date_in_firebase: null,
           last_internal_html_crawled_date: null,
           latest_google_search_console_date_in_gcs: null,
           latest_google_analytics_date_firebase: null,
           latest_google_analytics_date_gcs: null,
           last_link_graph_created_date: null },
        integrations:
         { is_google_search_console_integrated: false,
           is_ahrefs_api_integrated: false,
           is_google_analytics_integrated: false 
        },
       uid: '',
       website_sitemap_data: {}
      });
    res.send(result);
  } catch (error) {
    result.status = 404;
    console.log(error)
    res.send(result)
  }
}

exports.getWebsite = async (req, res) => {
  console.log('getting website')
  let db = admin.firestore();
  let pagesRef = db.collection("websites");
  let queryRef = await pagesRef
  // // need to get data for page from specific user
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        console.log("No matching documents.");
        return;
      }

      snapshot.forEach((doc) => {
        console.log(doc.data())
      });
    })
    .catch((err) => {
      console.log("Error getting documents", err);
    });

}

exports.getPagesData = async (req, res) => {
  let db = admin.firestore();
  let allData = [];
  let data = [];
  const userID = req.query.userID;
  const unformattedSiteURL = req.query.siteURL;

  if (unformattedSiteURL) {
    let siteURL = unformattedSiteURL.slice(8);
    siteURL = siteURL.substring(0, siteURL.length - 1)
  
    let pagesRef = db.collection("pages");
    let queryRef = await pagesRef
    // // need to get data for page from specific user
      .where('domain', '==', siteURL).get()
      .then((snapshot) => {
        if (snapshot.empty) {
          console.log("No matching documents.");
          return;
        }
  
        snapshot.forEach((doc) => {
          allData.push(doc.data())
        });
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });
      // console.log(allData)
      
      // only send over data for the user specified
      allData.forEach((element) => {
        if (element.id === userID) {
            data.push(element);
        }
      });
      res.send(data);
  } else {
    const error = {
      status: 400,
      error: 'No site URL, go back to website page and choose a website'
    }
    res.send(error)
  }
}

exports.postPagesData = async (req, res) => {
  let db = admin.firestore();
  const result = {};
  result.status = 200;

  const {data, domain} = req.body;
  const userID = req.body.userID.uid;
  const email = req.body.userID.email;
  const figureData = data.data;


  let pages = [];

  for (let i = 0; i < figureData.length; i++) {
    const page = figureData[i];
    // console.log(page)
    let pagesRef = db.collection("pages").doc(uniqid());

    try {
      let setPages = pagesRef.set({
        id: userID,
        domain,
        page
      });
    } catch (error) {
      result.status = 404;
      console.log(error)
      // res.send(result)
  
    }
  }
}

exports.checkActiveUserDB = async (req, res) => {
  // NEED USER ID AND SITEURL
  console.log('getting active users')
  const userID = req.query.userID;

  let db = admin.firestore();
  // need to get user id to look into for active sites
  // // need to see if the domain is under the user
  let activeUsersRef = await db.collection("active_user_dashboard_websites").doc(userID);
  let queryRef = await activeUsersRef
    .get();
    let activeWebsites = queryRef.data();
    activeWebsites = activeWebsites.activeWebsites;
    console.log(activeWebsites[0]);

    res.send(activeWebsites[0]);
}
