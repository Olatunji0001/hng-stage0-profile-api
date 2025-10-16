import express from "express";

const app = express();
const PORT =  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});


const getFact = async function () {
  try {
    const getData = await fetch("https://catfact.ninja/fact");
    const data = await getData.json();
    return data.fact;
  } catch (error) {
    return{message: "failed to fetch data", error:error.message};
  }
};


app.get("/me", async (req, res) => {
  const timestamp = new Date().toISOString();
  const fact = await getFact()
  res.json({
    status: "success",
    user: {
      email: "musbautunji@gmail.com",
      name: "Musbau Olatunji A.K.A Tee jay",
      stack: "Nodejs (Express)",
    },
    timestamp: timestamp,
    fact : fact
  });
});

