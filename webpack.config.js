module.exports = {
    // Other Webpack configuration...
    resolve: {
      fallback: {
        global: require.resolve("global-browserify"),
      },
    },
  };