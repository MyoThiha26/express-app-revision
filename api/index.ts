import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import formidable from "formidable";

const app = express();
const port = 3000;
dotenv.config();
app.use(express.static("public"));
const apiUrl = process.env.API_URL;
const apiHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>api</title>
</head>
<body>
    <script>
    localStorage.setItem('apiUrl', '${apiUrl}');
    window.location.href = '/' </script> 
</body>
</html>`;

app.get("/api", (req: Request, res: Response) => {
  res.send(apiHTML);
});

app.get("/api/users", (req: Request, res: Response) => {
  res.send({ name: "MTH", email: "mth@gmail.com", password: "123" });
});

app.post(
  "/api/fileUpload",
  (req: Request, res: Response, next: NextFunction) => {
    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {
      if (err) {
        next(err);
        return;
      }
      res.json({ fields, files });
    });
    // const fileType = req.headers["content-type"];
    // const fileExt = fileType?.split("/")[1];
    // const fileID = uuidv4();
    // const writeStream = fs.createWriteStream(`./${fileID}.${fileExt}`);
    // req.pipe(writeStream);
    // res.end();
  }
);

app.listen(port, () => {
  console.log("Server started listening on port", port);
});
