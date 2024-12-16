import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import configureDB from "./config/db.js";
import { checkSchema } from "express-validator";

import usersCltr from "./app/controllers/user-Cltr.js";
import categoriesCltr from "./app/controllers/categories-cltr.js";
import productsCltr from "./app/controllers/products-cltr.js";
import EnquiryCltr from "./app/controllers/Enquries-cltr.js";

import { userRegValidationSchema } from "./app/validators/user-reg-validation-schema.js";
import { userLoginSchema } from "./app/validators/user-reg-validation-schema.js";
import categoryValidationSchema from "./app/validators/category-validation-schema.js";
import idValidationSchema from "./app/validators/id-validationSchema.js";
import productValidationSchema from "./app/validators/id-validationSchema.js";
import enquiryValidationSchema from "./app/validators/enquiryValidationSchema.js";

import authenticateUser from "./app/middlewares/authenticate.js";
import authorizeUser from "./app/middlewares/authorize.js";
import checkAccountStatus from "./app/middlewares/checkStatus.js";

const app = express();

dotenv.config();
configureDB();
//applocation+inbuilt level middleware
app.use(express.json()); //express,json is a inbuilt middleware, app.use application level
//3rd party middleware
app.use(cors());
//checkschema is a routing level miidleware
app.post(
  "/api/users/register",
  checkSchema(userRegValidationSchema),
  usersCltr.register
);
app.post("/api/users/login", checkSchema(userLoginSchema), usersCltr.login);
app.get("/api/users/account", authenticateUser, usersCltr.account);
app.get(
  "/api/users",
  authenticateUser,
  authorizeUser(["admin"]),
  usersCltr.list
);
app.put(
  "/api/users/:id/status",
  authenticateUser,
  authorizeUser(["admin"]),
  usersCltr.userActivation
);

app.get("/api/categories", categoriesCltr.list);
app.get(
  "/api/categories/:id",
  checkSchema(idValidationSchema),
  categoriesCltr.show
);
app.post(
  "/api/categories",
  authenticateUser,
  authorizeUser(["admin"]),
  checkSchema(categoryValidationSchema),
  categoriesCltr.create
);
app.put(
  "/api/categories/:id",
  authenticateUser,
  authorizeUser(["admin"]),
  checkSchema(categoryValidationSchema),
  checkSchema(idValidationSchema),
  categoriesCltr.update
);
app.delete(
  "/api/categories/:id",
  authenticateUser,
  authorizeUser(["admin"]),
  checkSchema(idValidationSchema),
  categoriesCltr.remove
);

app.post(
  "/api/products",
  authenticateUser,
  authorizeUser(["seller"]),
  checkSchema(productValidationSchema),
  productsCltr.create
);
app.get("/api/products", productsCltr.list);
app.get(
  "/api/products/my",
  authenticateUser,
  authorizeUser(["seller"]),
  productsCltr.myProducts
);
app.get(
  "/api/products/:id",
  checkSchema(idValidationSchema),
  productsCltr.show
);
app.put(
  "/api/products/verify/:id",
  authenticateUser,
  authorizeUser(["admin"]),
  productsCltr.verify
);
app.put(
  "/api/products/:id",
  authenticateUser,
  authorizeUser(["admin", "seller"]),
  checkSchema(productValidationSchema),
  productsCltr.update
);
app.delete(
  "/api/products/:id",
  authenticateUser,
  authorizeUser(["admin", "seller"]),
  checkSchema(idValidationSchema),
  productsCltr.remove
);

//create a enquiry
app.post(
  "/api/enquries",
  authenticateUser,
  authorizeUser(["buyer"]),
  checkAccountStatus,
  checkSchema(enquiryValidationSchema),
  EnquiryCltr.create
);

//list all enquries
app.get(
  "/api/enquries/my",
  authenticateUser,
  authorizeUser(["buyer"]),
  EnquiryCltr.myEnquries
);

//track an enquiry-show
app.get(
  "/api/enquries/:id",
  authenticateUser,
  authorizeUser(["buyer"]),
  checkSchema(idValidationSchema),
  EnquiryCltr.show
);

//seller,get all enquiries for a product
app.get(
  "/api/products/:id/enquries",
  authenticateUser,
  authorizeUser(["admin", "seller"]),
  checkSchema(idValidationSchema),
  EnquiryCltr.productEnquries
);

app.listen(process.env.PORT, () => {
  console.log("server running succesfully on port", process.env.PORT);
});
