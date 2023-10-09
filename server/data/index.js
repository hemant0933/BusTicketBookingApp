import mongoose from "mongoose";

const busIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

export const buses = [
  {
    source: "Delhi",
    destination: "Mumbai",
    date: "2023-10-15",
    arrivalTime: "08:00 AM",
    departureTime: "09:00 AM",
    busName: "Delhi Express",
    busId: busIds[0],
  },
  {
    source: "Mumbai",
    destination: "Bangalore",
    date: "2023-10-20",
    arrivalTime: "10:30 AM",
    departureTime: "11:30 AM",
    busName: "Mumbai Voyager",
    busId: busIds[1],
  },
  {
    source: "Bangalore",
    destination: "Chennai",
    date: "2023-10-25",
    arrivalTime: "01:45 PM",
    departureTime: "02:45 PM",
    busName: "South India Express",
    busId: busIds[2],
  },
  {
    source: "Chennai",
    destination: "Hyderabad",
    date: "2023-11-02",
    arrivalTime: "03:15 PM",
    departureTime: "04:15 PM",
    busName: "Coastal Cruiser",
    busId: busIds[3],
  },
  {
    source: "Hyderabad",
    destination: "Kolkata",
    date: "2023-11-08",
    arrivalTime: "06:30 AM",
    departureTime: "07:30 AM",
    busName: "Eastern Explorer",
    busId: busIds[4],
  },
  {
    source: "Kolkata",
    destination: "Jaipur",
    date: "2023-11-15",
    arrivalTime: "09:20 AM",
    departureTime: "10:20 AM",
    busName: "Pink City Express",
    busId: busIds[5],
  },
  {
    source: "Jaipur",
    destination: "Ahmedabad",
    date: "2023-11-22",
    arrivalTime: "12:10 PM",
    departureTime: "01:10 PM",
    busName: "Rajasthan Rambler",
    busId: busIds[6],
  }
];
