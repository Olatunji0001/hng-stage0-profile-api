import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});

const getFact = async function () {
  try {
    const getData = await fetch("https://catfact.ninja/fact");
    const data = await getData.json();
    return data.fact;
  } catch (error) {
    return { message: "failed to fetch data", error: error.message};
  }
};

app.get("/", (req, res) => {
    res.json("welcome to Musbau Olatunji's profile, go to '/me' to see full profile details")
})

app.get("/me", async (req, res) => {
  const timestamp = new Date().toISOString();
  const fact = await getFact();
  if (fact.error) {
    return res.status(503).json({
      status: "error",
      user: {
        email: "musbautunji@gmail.com",
        name: "Musbau Olatunji A.K.A Tee jay",
        stack: "Nodejs (Express)",
      },
      timestamp: timestamp,
      fact: fact,
    });
  } else {
    return res.status(200).json({
      status: "success",
      user: {
        email: "musbautunji@gmail.com",
        name: "Musbau Olatunji A.K.A Tee jay",
        stack: "Nodejs (Express)",
      },
      timestamp: timestamp,
      fact: fact,
    });
  }
});
