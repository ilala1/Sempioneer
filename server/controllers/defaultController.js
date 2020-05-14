const axios = require("axios");
const admin = require("firebase-admin");

const { google } = require("googleapis");
var serviceAccount = require("../lib/serviceAccountKey.json");


exports.addWebsitesToDB = async (req, res) => {
  const result = {};
  result.status = 200;
  let db = admin.firestore();

  console.log(req.body.site.data);

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

exports.addWebsite = async (req, res) => {
  const result = {};
  result.status = 200;
  const UserObj = req.body.site;
  const userWebsiteList = UserObj.data;

  const dbUserWebsiteObj = await Website.find({ id: UserObj.id });

  if (dbUserWebsiteObj.length > 0) {
    console.log("existing user exists");

    // if website list is the same as db then do nothing else update
    for (let i = 0; i < userWebsiteList.length; i++) {
        const dbUserWebsiteList = dbUserWebsiteObj[0].data;
        for (let j = 0; j < dbUserWebsiteList.length; j++) {
            if (
                userWebsiteList[i].siteUrl === dbUserWebsiteList[j].siteUrl
            ) {
                console.log("same websites in list");
                return;
            } else {
                console.log("new website in list");
                if (dbUserWebsiteObj) {
                  await UserObj.save();
                } else {
                  await new Website(UserObj).save();
                }
            }
        }
    }
  } else {
    console.log("no user");
    await new Website(UserObj).save();
  }
  res.send(result);
};

exports.getPagesData = async (req, res) => {
  console.log(req.query.siteURL);

  const siteURL = req.query.siteURL;
  try {
    const allPages = await Page.find({"data.data.site_url" : siteURL});
    res.send(allPages);
  } catch (error) {
      console.error(error)
      return
  }
}

exports.postPagesData = async (req, res) => {
  const {data, userID, domain} = req.body;
  console.log(data); 
  console.log(userID)
  // console.log(domain)

  const figureData = data.data;

      // await new Page(pageObj).save();

  for (let i = 0; i < figureData.length; i++) {
    const page = figureData[i];
    const pageObj = {
      userID,
      domain,
      data: page
    }
    await new Page(pageObj).save();
    
  }
}