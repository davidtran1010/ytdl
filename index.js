const { render } = require("ejs");
const express = require("express");
const app = express();
const ytdl = require("ytdl-core");

app.set("view engine", "ejs");

app.get("/", (req, res) => {
	return res.render("index");
});

app.get("/download", async(req, res) => {
	const v_id = req.query.url.split('v=')[1];
    try {
    const info = await ytdl.getInfo(req.query.url);
    console.log("-------------------------");
    console.log(info.formats[4]);
    console.log("===========================");
    console.log(info.formats[1]);
    console.log("-------------------------");


	return res.render("download", {
		url: "https://www.youtube.com/embed/" + v_id,
        info: info.formats.sort((a, b) => {
            return a.mimeType < b.mimeType;
        }),
	});
    } catch (error) {
        console.log(error)
        return res.render("Can not fetch video")
    }
    
});

app.get("/getlink", async(req, res) => {
    try {
	const v_id = req.query.url.split('v=')[1];
    const info = await ytdl.getInfo(req.query.url);
    console.log("-------------------------");
    console.log(info.formats[4]);
    console.log("===========================");
    console.log(info.formats[1]);
    console.log("-------------------------");
	    return res.json(info.formats)
    } catch (error) {
        console.log(error)
        return res.json([])
    }
});


// app.listen(80, () => {
// 	console.log("Server is running on http://localhost:80");
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
