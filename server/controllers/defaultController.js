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
      sitemap_xml: '',
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
       { raw_google_analytics_data_gsc_uri: '',
         raw_google_search_console_data_gcs_uri: '',
         raw_html_daily_data_gsc_uri: '' },
      html_extractor_data_locations:
       { keywords_entities_text_gsc_uri: '',
         html_differences_gsc_uri: '',
         html_features_gsc_uri: '',
         structured_data_gsc_uri: '',
         internal_link_graph_gcs_uri: '',
         content_quality_gsc_uri: '' },
      google_analytics_details: { ga_account_id: '', ga_property_id: '', ga_view_id: '' },
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
      cloudflare_integration_details: { cloudflare_id: '' },
      integrations:
       { is_google_search_console_integrated: false,
         is_cloudflare_integrated: false,
         is_ahrefs_api_integrated: false,
         is_google_analytics_integrated: false } 
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

exports.scheduledJob = async () => {
  console.log('scheduling job')
  const { google } = require("googleapis");
  const OAuth2 = google.auth.OAuth2;
  // getting all users in db
  let db = admin.firestore();
  let allData = [];
  let data = [];
  
  let usersRef = db.collection("users");
  let queryRef = await usersRef
    .get()
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

  // console.log('one set');

  // loop through users array
  for (let i = 0; i < allData.length; i++) {
    // console.log('old allData[i]');
    // console.log(allData[i]);
    // console.log('old allData[i]');

    // get new access token
    const oauth2Client = new OAuth2(
      "45551424691-5ronoojbj87eftlnu82vcjsqrfo58tln.apps.googleusercontent.com",
      "NpVNQs7MhXsBdzPT9KyJ--Yt",
      "http://localhost:3000"
    );

    oauth2Client.setCredentials({
      refresh_token:
        allData[i].refresh_token
    });
    

    const newAccessToken = await oauth2Client.getAccessToken();

    // console.log('newAccessToken')
    // console.log(newAccessToken.res.data.access_token)
    // console.log('newAccessToken')

    // updated access token with new one
    allData[i].access_token = newAccessToken.res.data.access_token;

}
// console.log('allData')
// console.log(allData)
// console.log('allData')
    // for each user get the selected site 
    allData.forEach(user => {
        
    });
    // based on the site, check pages data for that site

    // get the soonest date of data

    // call API to see the soonest available date

    // update db with those dates

  // var j = schedule.scheduleJob('*/5 * * * * *', function(){
  //         // const oneUser = apiGet({}, '/oneUser', {103456017882470757103});
  //         // console.log(oneUser)
          
  //         console.log('The answer to life, the universe, and everything is pizza!');
  //   });
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
      // res.send(result);
    } catch (error) {
      result.status = 404;
      console.log(error)
      // res.send(result)
  
    }
  }
}


// old stuff

// exports.addWebsite = async (req, res) => {
//   const result = {};
//   result.status = 200;
//   const UserObj = req.body.site;
//   const userWebsiteList = UserObj.data;

//   const dbUserWebsiteObj = await Website.find({ id: UserObj.id });

//   if (dbUserWebsiteObj.length > 0) {
//     console.log("existing user exists");

//     // if website list is the same as db then do nothing else update
//     for (let i = 0; i < userWebsiteList.length; i++) {
//         const dbUserWebsiteList = dbUserWebsiteObj[0].data;
//         for (let j = 0; j < dbUserWebsiteList.length; j++) {
//             if (
//                 userWebsiteList[i].siteUrl === dbUserWebsiteList[j].siteUrl
//             ) {
//                 console.log("same websites in list");
//                 return;
//             } else {
//                 console.log("new website in list");
//                 if (dbUserWebsiteObj) {
//                   await UserObj.save();
//                 } else {
//                   await new Website(UserObj).save();
//                 }
//             }
//         }
//     }
//   } else {
//     console.log("no user");
//     await new Website(UserObj).save();
//   }
//   res.send(result);
// };