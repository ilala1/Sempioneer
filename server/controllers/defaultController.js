const axios = require("axios");
const admin = require("firebase-admin");
const uniqid = require("uniqid");

const { google } = require("googleapis");
var serviceAccount = require("../lib/serviceAccountKey.json");


exports.addWebsitesToDB = async (req, res) => {
  const result = {};
  result.status = 200;
  let db = admin.firestore();

  const userObj = req.body.user;
  const sites = req.body.site.data;

  let websiteRef = db.collection("websites").doc(userObj.email);

  try {
    let setWebsites = websiteRef.set({
      id: userObj.uid,
      sites
    });
    res.send(result);
  } catch (error) {
    result.status = 404;
    console.log(error)
    res.send(result)

  }
}

exports.getPagesData = async (req, res) => {
  let db = admin.firestore();
  let allData = [];
  let data = [];
  const userID = req.query.userID;
  const unformattedSiteURL = req.query.siteURL;

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

  console.log(figureData)
    




  



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