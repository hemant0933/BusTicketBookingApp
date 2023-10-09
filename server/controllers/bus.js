import Bus from "../models/Bus.js";

export const getAvailableBuses = async (req, res) => {
  try {
    const { source, destination } = req.query;

    // Use a MongoDB query with case-insensitive regular expressions
    const buses = await Bus.find({
      source: { $regex: new RegExp(source, "i") }, // 'i' flag makes it case-insensitive
      destination: { $regex: new RegExp(destination, "i") }, // 'i' flag makes it case-insensitive
    });

    res.status(200).json({ buses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to perform the search" });
  }
};

export const getBusDetails = async (req, res) =>{
  try {
    const { busId } = req.params;

    // Use Mongoose to find the bus by ID
    const bus = await Bus.find({busId});
    console.log(bus);
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }
    // Respond with the bus details
    res.status(200).json({message:'sucess',bus});
  } catch (error) {
    console.error("Error fetching bus details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const createNewTicket = async (req,res) => {
  try {
    // Extract the data for the new bus ticket from the request body
    const { source, destination, date } = req.body;

    // Create the new bus ticket in your database (you might need a Bus model)
    const newBusTicket = new Bus({
      source,
      destination,
      date,
    });

    // Save the new bus ticket to the database
    await newBusTicket.save();

    // Respond with a success message and the created ticket data
    res.status(201).json({ message: "Bus ticket created successfully", data: newBusTicket });
  } catch (error) {
    console.error("Error creating bus ticket:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}