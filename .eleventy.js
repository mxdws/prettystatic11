const pluginRss = require("@11ty/eleventy-plugin-rss");



module.exports = function(eleventyConfig) {
  eleventyConfig.setTemplateFormats([
    "md",
    "css", // css is not yet a recognized template extension in Eleventy
    "png" //images are saved as PNGsa at the moment
  ]);
  eleventyConfig.addPassthroughCopy("robots.txt");


  const now = new Date();

  const livePosts = p => p.date <= now;
  
  eleventyConfig.addCollection('posts', collection => {
    return collection.getFilteredByGlob('./posts/*.md')
      .filter(livePosts).reverse();
  });

  eleventyConfig.addPlugin(pluginRss);


};