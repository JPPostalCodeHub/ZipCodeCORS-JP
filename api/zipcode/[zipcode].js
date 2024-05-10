module.exports = async (req, res) => {
  const { zipcode } = req.query.zipcode;
  const targetUrl = `https://jppostalcodehub.github.io/ZipCodeJSON-JP/zip/${zipcode}.json`;

  try {
    const response = await fetch(targetUrl);
    const data = await response.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
};
