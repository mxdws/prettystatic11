module.exports = function(eleventyConfig) {
    eleventyConfig.setTemplateFormats([
      "md",
      "css", // css is not yet a recognized template extension in Eleventy
      "png" //images are saved as PNGsa at the moment
    ]);
  };