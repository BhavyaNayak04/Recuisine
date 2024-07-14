import express from "express";
const app = express();
const port = 3001;

import session from "express-session";
import bodyParser from "body-parser";
import cors from "cors";
import passport from "passport";
// import { Strategy as LocalStrategy } from 'passport-local';

import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//MIDDLEWARES
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  await prisma.user.findById(id, (err, user) => {
    done(err, user);
  });
});

function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, error: "Unauthorized: No token provided" });
  }

  jwt.verify(token, "secret_key", (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ success: false, error: "Unauthorized: Invalid token" });
    }
    req.user = decoded; // Store decoded user details in request object
    next(); // Proceed to next middleware or route handler
  });
}

const sessionOptions = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,

  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(cookieParser());

app.use((req, res, next) => {
  res.locals.curUser = req.user;
  res.locals.tokens = req.token;
  next();
});

app.listen(port, () => {
  console.log("server is running");
});

//GETTING DATA
app.get("/", async (req, res) => {
  return res.send("this is home page");
});

app.get("/users", async (req, res) => {
  let users = await prisma.user.findMany();
  console.log(users);
  return res.send(users);
});

app.get("/food", async (req, res) => {
  let food = await prisma.menu.findMany({
    include: {
      items: true,
      Order: {
        include: {
          user: true,
        },
      },
    },
  });

  if (food.length != 0) {
    return res.send(food);
  }
  return res.send("No food Yet :(");
});

app.get("/profile/:id", async (req, res) => {
  const { id } = req.params;
  const tuser = await prisma.user.findUnique({
    where: {
      id: id,
    },
    include: {
      menus: {
        include: { items: true, Order: true },
      },
      review: true,
      orders: {
        include: { order: true },
      },
    },
  });
  console.log("profile data accesed");
  return res.send(tuser);
});

//STORING DATA
//store available food
app.post("/upload/:userId", async (req, res) => {
  try {
    // Extract data from the request body
    const { description } = req.body;
    const userId = req.params.userId;
    console.log(req.body);

    // Create the menu and associate it with the user
    const newMenu = await prisma.menu.create({
      data: {
        description: description,
        userId,
      },
    });

    const result = {};
    const data = req.body;

    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        const keys = key.split(/\[|\]\[|\]/).filter(Boolean);
        let currentObj = result;
        for (let i = 0; i < keys.length; i++) {
          const k = keys[i];
          if (i === keys.length - 1) {
            if (k === "items") {
              currentObj[k] = currentObj[k] || [];
              currentObj[k].push({}); // Push a new object into the 'items' array
              currentObj = currentObj[k][currentObj[k].length - 1]; // Move to the newly pushed object
            } else {
              currentObj[k] = data[key];
            }
          } else {
            if (k === "items") {
              currentObj[k] = currentObj[k] || [];
              currentObj = currentObj[k];
            } else {
              currentObj[k] = currentObj[k] || {};
              currentObj = currentObj[k];
            }
          }
        }
      }
    }

    console.log(result);

    // Create the menu items and associate them with the newly created menu
    await Promise.all(
      result.items.map(async (item) => {
        const newItem = await prisma.menuItem.create({
          data: {
            name: item.name,
            quantity: item.quantity,
            Menu: { connect: { id: newMenu.id } }, // Associate with the newly created menu
          },
        });
        return newItem;
      })
    );

    // Respond with the newly created menu
    return res.status(201).json(newMenu);
  } catch (error) {
    console.error("Error uploading menu:", error);
    return res.status(500).send("Internal Server Error");
  }
});

app.post("/rating/:raterId/:donorId", (req, res) => {
  return res.send("put data into db of ratings");
});

app.post("/profile/new", async (req, res) => {
  try {
    const existingUser = await prisma.user.findFirst({
      where: { email: req.body.email },
    });

    if (existingUser) {
      console.log("User already exists!");
      return res.json({ success: false, errors: "User already exists!" });
    }

    const { email, name, password, latitude, longitude, image } = req.body;
    const hashedPassword = password; // You should hash the password before storing it

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        latitude,
        longitude,
        image,
        role: "user",
      },
    });

    // For now, we are using a simple token. In a real-world scenario, use JWT or similar.
    const token = 1; // This should be a JWT token or similar
    console.log("New user created!", newUser);

    return res.status(200).json({ success: true, token, userid: newUser.id });
  } catch (error) {
    console.error("Error creating user:", error);
    return res
      .status(500)
      .json({ success: false, errors: "Internal Server Error" });
  }
});


// app.post("/signup", async (req,  res) => {
//   try {
//     // Check if a user with the provided email already exists
//     const existingUser = await prisma.user.findFirst({
//       where: { email: req.body.email },
//     });

//     if (existingUser) {
//       return return res.status(400).json({
//         success: false,
//         errors: "Existing user found with the same email address",
//       });
//     }

//     // Create the new user
//     const newUser = await prisma.user.create({
//       data: {
//         name: req.body.username,
//         email: req.body.email,
//         password: req.body.password,
//       },
//     });

//     // Generate JWT token for the newly created user
//     const data = {
//       user: {
//         id: newUser.id,
//       },
//     };
//     const token = jwt.sign(data, "secret_ecom", { expiresIn: "1h" });

//     return res.json({ success: true, token });
//   } catch (error) {
//     console.error("Error during user signup:", error);
//     return res.status(500).json({ success: false, errors: "Internal Server Error" });
//   }
// });

//creating endpoint for users login
//creating endpoint for users login

app.post("/login", async (req, res) => {

  try {
    const user = await prisma.user.findUnique({
      where: { email: req.body.email },
    });

    if (user) {
      console.log("oyo",req.body.email);
      console.log(user.email);
      const passwordMatch = user.password == req.body.password ? 1 : 0;

      if (passwordMatch) {
        console.log("paswword matched!");

        const token = passwordMatch;
        return res.json({ success: true, token, userid: user.id });
      } else {
        return res.json({ success: false, errors: "Wrong Password" });
      }
    } else {
      return res.json({ success: false, errors: "Wrong Email Id" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res
      .status(500)
      .json({ success: false, errors: "Internal Server Error" });
  }
});

app.get("/protected", verifyToken, (req, res) => {
  // If token is valid, user is authenticated and authorized
  return res.json({
    success: true,
    message: "Protected route accessed successfully",
  });
});

app.post("/order/:userId/:menuId", async (req, res) => {
  try {
    const { userId, menuId } = req.params;
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const adress = `${user.latitude}+ ${user.longitude}`;
    // const { status, address = "", items } = req.body;
    console.log(req.body);
    // Extract items from the data object
    const data = req.body;
    const items = Object.keys(data).filter((key) =>
      key.startsWith("items[selectedItems]")
    );

    // Initialize an array to store the parsed items
    const parsedItems = [];

    // Iterate over the items and parse them into objects
    items.forEach((key) => {
      const [, index, property] = key.match(/\[(\d+)\]\[(\w+)\]/);
      const itemIndex = parseInt(index);
      const propertyName = property.toLowerCase();

      if (!parsedItems[itemIndex]) {
        parsedItems[itemIndex] = {};
      }

      parsedItems[itemIndex][propertyName] = data[key];
    });

    // Now, parsedItems will contain an array of objects with id, name, and quantity properties
    console.log(parsedItems);
    const { address = adress } = req.body;

    // Create the order
    const newOrder = await prisma.order.create({
      data: {
        
        address,
        userId,
        menuId,
      },
    });
    const orderId = newOrder.id;

    // Get the menuItem ids
    const menuItemIds = await Promise.all(
      parsedItems.map(async (item) => {
        const menuItem = await prisma.menuItem.findFirst({
          where: {
            name: item.name,
          },
        });
        if (!menuItem) {
          throw new Error(`MenuItem with name ${item.name} not found`);
        }
        return menuItem.id;
      })
    );

    const createdOrderItems = await prisma.orderItem.createMany({
      data: parsedItems.map((item, index) => ({
        orderId, // Associate order item with the newly created order
        name: item.name,
        quantity: item.quantity,
        menuItemId: menuItemIds[index], // Add the menuItem id
      })),
    });
    const findOrder = await prisma.order.findUnique({
      where: { id: orderId },
      include: { order: true },
    });

    res.status(201).json(findOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/order/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { order: true, user: true, menu: true },
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/menu/:id", async (req, res) => {
  try {
    const menuId = req.params.id;
    const order = await prisma.menu.findUnique({
      where: { id: menuId },
      include: {
        ratings: true,
        Order: { include: { order: true } },
        Review: true,
        items: true,
        foodBy: true,
      },
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).send("Internal Server Error");
  }
});

 const Status = {
   REQUESTED: "REQUESTED",
   APPROVED: "APPROVED",
   SORRY: "SORRY",
   RECIEVED: "RECIEVED",
 };

app.post("/order/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { order: true, user: true, menu: true },
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // res.json(order.order);

    await Promise.all(
      order.order.map(async (orderItem) => {
        const menuItem = await prisma.menuItem.update({
          where: {
            id:orderItem.menuItemId,
          },
          data: {
            quantity: "Empty",
          },
        });
      })
    );

    const updateOrder = await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: Status.APPROVED,
      },
    });
    res.send(updateOrder);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).send("Internal Server Error");
  }
});

