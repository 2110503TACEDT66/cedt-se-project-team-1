const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const auth = require("./routes/auth");
const massages = require("./routes/massages");
const reservations = require("./routes/reservations");
const slips = require("./routes/slips");
const ratings = require("./routes/rating.js");

const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const { xss } = require("express-xss-sanitizer");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

dotenv.config({ path: "./.env" });

connectDB();

const app = express();

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 5000
});

const PORT = process.env.PORT || 5000;
const server = app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on ${process.env
            .HOST}:${PORT}`
    )
);

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Library API",
            version: "1.0.0",
            description: "A simple Express VacQ API"
        },
        servers: [
            {
                url: process.env.HOST + ":" + PORT + "/api/v1"
            }
        ]
    },
    apis: ["./routes/*.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(express.json());
app.use(limiter);
app.use(xss());
app.use(helmet());
app.use(mongoSanitize());
app.use(cookieParser());
app.use(hpp());
app.use(cors());

app.use("/api/v1/massages", massages);
app.use("/api/v1/auth", auth);
app.use("/api/v1/reservations", reservations);
app.use("/ratings", ratings);

// process.on('unhandledRejection', (err, promise) => {
//     console.log(`Error: ${err.message}`);
//     server.close(() => process.exit(1));
// });
