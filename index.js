import express from "express";
import cors from "cors";
import http from "http";
// import io from "./socketIOServer";
import menu from "./api/menu/menuRoute";
import category from "./api/category/categoryRoute";
import item from "./api/item/itemRoute";
import modifiers from "./api/modifiers/modifiersRoute";
import user from "./api/user/userRoute";
import location from "./api/location/locationRoute";
import order from "./api/order/orderRoute";
import mongoose from "mongoose";
import { url } from "./config/mongodb.config";
import bodyParser from "body-parser";
import signup from "./api/signup/signup";
import login from "./api/signup/signup";
import upload from "./api/uploadImages/uploadImageRoutes";
import indexPage from "./api/indexPage/index";

const app = express();
const server = http.createServer(app);
var io = require("socket.io")(server);
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

io.on("connection", (socket) => {
  socket.on("my message", (data) => {
    console.log("data", data);
  });
});
console.log({ url });

app.use(cors());
// app.use((req, res, next) => {
//   req.io = io;
//   next();
// });

// io.use((socket, next) => {
//   const handshake = socket.request;
//   console.log("io handshake", socket.id);
//   socket.on("middleware", function () {});
//   next();
// });

app.use("/", indexPage);
app.use("/signup", signup);
app.use("/login", login);
app.use("/menu", menu);
app.use("/category", category);
app.use("/item", item);
app.use("/modifiers", modifiers);
app.use("/user", user);
app.use("/location", location);
app.use("/order", order);
app.use("/upload", upload);

// mongoose.connect(url);

mongoose.connect(url);

server.listen(port, () =>
  console.log(`Digital intranet Menu App listening at http://localhost:${port}`)
);
