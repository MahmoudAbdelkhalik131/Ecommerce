import mongoose from "mongoose";
const dbconnection = () => {
  mongoose
    .connect(process.env.DBLINK!)
    .then(() => {
      console.log("Connected to dataBase");
    })
    .catch((err) => {
      console.log(err);
    });
};
export default dbconnection;

//  mongodb+srv://mahmoudabdelkhalik131:I7bPEwSlNwZTY0Qs@nti-zagazig-ecommerce.rzknw.mongodb.net/?retryWrites=true&w=majority&appName=NTI-Zagazig-Ecommerce
