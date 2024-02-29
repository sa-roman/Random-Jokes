    import express from "express";
    import bodyParser from "body-parser";
    import axios from "axios";
    import {fileURLToPath} from "url";
    import { dirname } from "path";
    import ejs from "ejs";

    const app = express();
    const port = 3000;
    const __dirname = dirname(fileURLToPath(import.meta.url))

    app.set("view engine", "ejs");
    app.use(express.static("public"));
    app.use(bodyParser.urlencoded({ extended: false }));

    app.get("/", (req,res)=>{
        res.render("index.ejs", {joke: null});
    });

    app.get("/generateJoke", async(req,res)=>{
        const response = await axios.get("https://v2.jokeapi.dev/joke/Any?type=single");
        const post = response.data;
        const stringPost = JSON.stringify(post.joke);
        const fixedJoke = stringPost.replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\'/g, "'");
        res.render("index.ejs", {joke: fixedJoke});
    })

    

    app.listen(port, ()=>{
        console.log("Listenning to port " + port);
    })