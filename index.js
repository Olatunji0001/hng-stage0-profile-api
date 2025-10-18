import express from "express";

const app = express();
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`app is listening on port: ${PORT}`);
});

const getData = async () => {
  try {
    const data = await fetch("https://catfact.ninja/fact");
    const dataToJson = await data.json();
    return dataToJson.fact;
  } catch (error) {
   return { error: true, message: "Failed to fetch data"};
  }
};

app.get("/me", async (req, res) => {
  const timestamp = new Date().toISOString();
  const fact = await getData();

  if (fact.error) {
    return res.status(500).json({
      status: "error",
      user: {
        email: "musbautunji@gmail.com",
        name: "Musbau Olatunji",
        stack: "Nodejs(Express)",
      },
      timestamp: timestamp,
      fact: fact,
    });
  } else {
    return res.status(200).json({
      status: "success",
      user: {
        email: "musbautunji@gmail.com",
        name: "Musbau Olatunji",
        stack: "Nodejs(Express)",
      },
      timestamp: timestamp,
      fact: fact,
    });
  }
});
