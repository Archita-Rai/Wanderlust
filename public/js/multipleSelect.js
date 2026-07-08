var tagSelector = new MultiSelectTag("category", {
  required: true, // default false.
//   placeholder: "select category", // default 'Search'.
  onChange: function (selected) {
    // Callback when selection changes.
    console.log("Selection changed:", selected);
  },
});
