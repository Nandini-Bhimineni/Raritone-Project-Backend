const errorMiddleware =
(err, req, res, next) => {

   // LOG ERROR
   console.error(err.stack);


   // MONGOOSE BAD OBJECT ID
   if (err.name === "CastError") {

      return res.status(400).json({

         success: false,

         message: "Invalid ID format"

      });

   }


   // DUPLICATE KEY ERROR
   if (err.code === 11000) {

      return res.status(400).json({

         success: false,

         message: "Duplicate field value entered"

      });

   }


   // VALIDATION ERROR
   if (err.name === "ValidationError") {

      const messages = Object.values(
         err.errors
      ).map(val => val.message);

      return res.status(400).json({

         success: false,

         message: messages.join(", ")

      });

   }


   // JWT INVALID
   if (err.name === "JsonWebTokenError") {

      return res.status(401).json({

         success: false,

         message: "Invalid token"

      });

   }


   // JWT EXPIRED
   if (err.name === "TokenExpiredError") {

      return res.status(401).json({

         success: false,

         message: "Token expired"

      });

   }


   // DEFAULT SERVER ERROR
   res.status(
      err.statusCode || 500
   ).json({

      success: false,

      message:
         err.message ||
         "Internal Server Error",

      stack:
         process.env.NODE_ENV ===
         "development"
            ? err.stack
            : undefined

   });

};

module.exports = errorMiddleware;