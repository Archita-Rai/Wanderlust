const Listing = require("../models/listing.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

// for index route
module.exports.index = async (req, res) => {
  let allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

// for new route
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

// for show route
module.exports.showListings = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
   
  if (!listing) {
    req.flash("error", "Listing you requested for does not exists");
    res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing});
};

// for create route
module.exports.createListing = async (req, res, next) => {
  let response = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 2,
    })
    .send();

  let url = req.file.path;
  let filename = req.file.filename;

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  newListing.geometry = response.body.features[0].geometry;
  let savedListing = await newListing.save();
  // console.log(savedListing);
  req.flash("success", "New Listing Created");
  res.redirect("/listings");
};

// for edit route
module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exists");
    res.redirect("/listings");
  }
  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

// for update route
module.exports.updateListing = async (req, res) => {
  // if (!req.body.listing) {
  //   throw new CustomExpressError(404, "Send valid data for listing");
  // }
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if (typeof req.file != "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }
  req.flash("success", "Listing Updated");
  res.redirect(`/listings/${id}`);
};

// for delete Listing
module.exports.distroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted");
  res.redirect("/listings");
};

// to show listing based on their category
module.exports.showListingsCategory = async (req, res) => {
    const { categoryName } = req.params;
    // Match listings where category array contains the categoryName
    const allListings = await Listing.find({ category: categoryName });
    res.render("listings/index.ejs", { allListings }); // Use your view name
    // here
  };
